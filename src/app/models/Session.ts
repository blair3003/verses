import mongoose, { Schema, Types } from 'mongoose'

export type Session = {
    userId: Types.ObjectId
    sessionToken: string
    expires: string
}

const sessionSchema = new mongoose.Schema<Session>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        sessionToken: String,
        expires: Date,
    }
)

export default mongoose.models.Session || mongoose.model('Session', sessionSchema, 'sessions')