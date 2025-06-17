import mongoose, { Schema, model } from "mongoose";
import { UserRole } from '../types/role.enum.ts';


export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  image: string;
  phone_number: number;
  fingerprint_id: number;
  role: string;
  is_active: boolean;
  device_id: mongoose.Types.ObjectId;
  registered_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone_number: {
      type: Number,
    },
    fingerprint_id: {
      type: Number,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    device_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    is_active: { type: Boolean, default: true },
    registered_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model<UserDocument>('User', UserSchema);
// export default User;
