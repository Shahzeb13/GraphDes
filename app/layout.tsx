import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const FONT_CSS: Record<string, string> = {
  Syne: "Syne:wght@400;500;600;700;800",
  "Cormorant Garamond":
    "Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600;1,700",
  "DM Sans": "DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300",
  Inter: "Inter:wght@300;400;500;600;700;800",
  "Playfair Display": "Playfair+Display:ital,wght@0,400;0,600;0,700;1,400",
  Poppins: "Poppins:wght@300;400;500;600;700;800",
  "Space Grotesk": "Space+Grotesk:wght@300;400;500;600;700",
  "Source Sans 3": "Source+Sans+3:wght@300;400;500;600;700",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    keywords: content.meta.keywords,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

function buildFontsUrl(fonts: { heading: string; display: string; body: string }): string {
  const families = [fonts.heading, fonts.display, fonts.body]
    .filter(Boolean)
    .map((name) => FONT_CSS[name] ?? name.replace(/ /g, "+"));
  return `https://fonts.googleapis.com/css2?family=${families.join("&family=")}&display=swap`;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const theme = content.theme;

  // Inject the admin-customized theme as CSS variables + raw custom CSS.
  const cssVars = Object.entries(theme.cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
  const fontVars = `--font-heading: '${theme.fonts.heading}', sans-serif;\n--font-display: '${theme.fonts.display}', serif;\n--font-body: '${theme.fonts.body}', sans-serif;`;
  const themeCss = `:root {\n${cssVars}\n${fontVars}\n}\n${theme.customCss || ""}`;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={buildFontsUrl(theme.fonts)} rel="stylesheet" />
        {/* Material Symbols icon font — used by the admin shell nav icons.
            Loaded via <link> because CSS @import is not reliably handled
            by the Tailwind v4 PostCSS pipeline. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        {children}
      </body>
    </html>
  );
}
