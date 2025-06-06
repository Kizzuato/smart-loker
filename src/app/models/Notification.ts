import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  user_id?: mongoose.Types.ObjectId;
  message: string;
  type: 'info' | 'warning' | 'error';
  sent_at: Date;
  read: boolean;
}

const notificationSchema = new Schema<INotification>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'error'], default: 'info' },
  sent_at: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export const NotificationModel = mongoose.models?.Notification || mongoose.model<INotification>('Notification', notificationSchema);
