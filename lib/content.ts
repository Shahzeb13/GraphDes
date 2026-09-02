import { cache } from "react";
import { dbConnect } from "./db";
import SiteContent from "../models/SiteContent";
import { DEFAULT_CONTENT } from "./defaultContent";
import type { SiteContent as SiteContentType } from "./types";

/**
 * Load the portfolio's site content from MongoDB.
 * Falls back to DEFAULT_CONTENT if the database is unreachable or
 * the seed hasn't run yet, so the public site always renders.
 */
async function loadContent(): Promise<SiteContentType> {
  try {
    await dbConnect();
    const doc = await SiteContent.findById("main").lean().exec();
    if (!doc) return DEFAULT_CONTENT;
    return normalizeContent(doc);
  } catch (error) {
    console.error("Failed to load site content from MongoDB:", error);
    return DEFAULT_CONTENT;
  }
}

/** Memoized per-request read (dedupes DB calls across layout + page). */
export const getContent = cache(loadContent);

export async function saveContent(content: SiteContentType): Promise<SiteContentType> {
  await dbConnect();
  const doc = await SiteContent.findByIdAndUpdate(
    "main",
    { $set: content },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  ).lean();
  return normalizeContent(doc);
}

/** Flatten Mongoose Maps to plain objects and merge in defaults. */
function normalizeContent(doc: unknown): SiteContentType {
  const raw = (doc ?? {}) as Record<string, unknown>;
  const theme = raw.theme;
  if (theme && typeof theme === "object" && !Array.isArray(theme)) {
    const themeObj = theme as Record<string, unknown>;
    if (themeObj.cssVars instanceof Map) {
      themeObj.cssVars = Object.fromEntries(themeObj.cssVars.entries());
    }
  }
  // Merge against defaults so newly added fields never render as undefined.
  return deepMerge(DEFAULT_CONTENT, raw as unknown as SiteContentType) as SiteContentType;
}

function deepMerge(defaults: unknown, incoming: unknown): unknown {
  if (
    typeof defaults === "object" &&
    defaults !== null &&
    !Array.isArray(defaults) &&
    typeof incoming === "object" &&
    incoming !== null &&
    !Array.isArray(incoming)
  ) {
    const output: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
    const incomingObj = incoming as Record<string, unknown>;
    for (const key of Object.keys(output)) {
      if (key in incomingObj) {
        output[key] = deepMerge(output[key], incomingObj[key]);
      }
    }
    return output;
  }
  return incoming === undefined || incoming === null ? defaults : incoming;
}