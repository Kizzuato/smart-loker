import { AccessLog } from './../../lib/data';
import mongoose, { Document, Schema } from 'mongoose';

export interface IAccessLog extends Document {
  user_id?: mongoose.Types.ObjectId;
  fingerprint_id: number;
  device_id: string;
  access_time: Date;
  status: 'success' | 'failed';
  remarks?: string;
}

const accessLogSchema = new Schema<IAccessLog>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  fingerprint_id: { type: Number },
  device_id: { type: String, required: true },
  access_time: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failed'], required: true },
  remarks: { type: String }
});

export const AccessLogModel = mongoose.models?.AccessLog || mongoose.model<IAccessLog>('AccessLog', accessLogSchema);
