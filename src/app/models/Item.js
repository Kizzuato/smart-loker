// models/Item.js
import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema(
    {
        name: String
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);