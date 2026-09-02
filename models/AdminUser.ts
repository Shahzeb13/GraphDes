import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface AdminUserDocument {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword: (candidate: string) => Promise<boolean>;
}

const adminUserSchema = new Schema<AdminUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
);

adminUserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const AdminUser =
  (mongoose.models.AdminUser as mongoose.Model<AdminUserDocument>) ??
  mongoose.model<AdminUserDocument>("AdminUser", adminUserSchema);

export default AdminUser;

/** bcryptjs hash helper so callers never store plaintext passwords. */
export const hashPassword = (password: string) => bcrypt.hash(password, 10);