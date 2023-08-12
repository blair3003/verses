import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        sessionToken: String,
        expires: Date,
    }
)

export default mongoose.model('Session', sessionSchema, 'sessions')