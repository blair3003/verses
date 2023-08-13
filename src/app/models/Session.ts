import mongoose, { Schema, Types } from 'mongoose'

export type Session = {
    userId: Types.ObjectId
    sessionToken: string
    expires: string
}

const sessionSchema = new Schema<Session>(
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

export default mongoose.models.session || mongoose.model('session', sessionSchema, 'sessions')