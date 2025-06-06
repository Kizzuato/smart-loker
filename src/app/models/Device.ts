import mongoose, { Document, Schema } from 'mongoose';

export interface IDevice extends Document {
  device_id: string;
  location?: string;
  status: 'idle' | 'registering' | 'accessing';
  mode: 'access' | 'register';
  last_seen?: Date;
}

const deviceSchema = new Schema<IDevice>({
  device_id: { type: String, required: true, unique: true },
  location: { type: String },
  status: { type: String, enum: ['idle', 'registering', 'accessing'], default: 'idle' },
  mode: { type: String, enum: ['access', 'register'], default: 'access' },
  last_seen: { type: Date }
});

export const DeviceModel = mongoose.models?.Device || mongoose.model<IDevice>('Device', deviceSchema);
