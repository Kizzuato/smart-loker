import mongoose, { Document, Schema } from 'mongoose';

export interface IDevice extends Document {
  device_id: string;
  location?: string;
  status: 'kosong' | 'terisi' | 'nonaktif' | 'aktif';
  mode: 'access' | 'register';
  last_seen?: Date;
}

const deviceSchema = new Schema<IDevice>({
  device_id: { type: String, required: true, unique: true },
  location: { type: String },
  status: { type: String, enum: ['kosong', 'terisi', 'nonaktif', 'aktif'], default: 'nonaktif' },
  mode: { type: String, enum: ['access', 'register'], default: 'access' },
  last_seen: { type: Date }
});

export const DeviceModel = mongoose.models?.Device || mongoose.model<IDevice>('Device', deviceSchema);
