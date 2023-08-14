import { model, models, Document, Schema, Types } from 'mongoose'

export type Session = Document & {
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

export default models.Session || model<Session>('session', sessionSchema, 'sessions')