import mongoose, { mongo } from 'mongoose';
import { number } from 'yup';

const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,

    },
    user:{
        type: Number,
        required: true,
    },
    read:{
        type: Boolean,
        required: true,
        default: false,
    }
    
}, {
    timestamps: true,
})

export default mongoose.model('Notification', NotificationSchema)