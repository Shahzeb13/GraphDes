/**
 * Seed script — run once with `npm run seed`.
 *
 * 1. Creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD (bcryptjs-hashed).
 * 2. Seeds the default portfolio content into the `sitecontent` collection.
 *
 * Safe to run multiple times: it skips anything that already exists.
 */
import "dotenv/config";
import { dbConnect } from "../lib/db";
import AdminUser, { hashPassword } from "../models/AdminUser";
import SiteContent from "../models/SiteContent";
import { DEFAULT_CONTENT } from "../lib/defaultContent";

async function run() {
  console.log("Connecting to MongoDB…");
  await dbConnect();

  const email = (process.env.ADMIN_EMAIL || "admin@rashid.dev").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin12345";

  if (!password || password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters.");
  }

  const existingAdmin = await AdminUser.findOne({ email });
  if (existingAdmin) {
    console.log(`✔ Admin account already exists: ${email}`);
  } else {
    await AdminUser.create({ email, password: await hashPassword(password) });
    console.log(`✔ Admin account created: ${email}`);
  }

  const existingContent = await SiteContent.findById("main");
  if (existingContent) {
    console.log("✔ Site content already seeded — leaving it untouched.");
  } else {
    await SiteContent.create({ _id: "main", ...DEFAULT_CONTENT });
    console.log("✔ Default site content seeded.");
  }

  console.log("Seed complete. Run `npm run dev` and open http://localhost:3000/admin/login");
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });