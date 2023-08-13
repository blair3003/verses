import mongoose, { Schema, Types } from 'mongoose'

export type Account = {
    userId: Types.ObjectId
    type: string
    provider: string
    providerAccountId: string
    id_token: string
    access_token: string
    refresh_token: string
    token_type: string
    scope: string
    session_state: string
    expires_at: number
}

const accountSchema = new Schema<Account>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        type: {
            type: String,
            required: true
        },
        provider: {
            type: String,
            required: true
        },
        providerAccountId: {
            type: String,
            required: true
        },
        id_token: String,
        access_token: String,
        refresh_token: String,
        token_type: String,
        scope: String,
        session_state: String,
        expires_at: Number,
    }
)

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true })

export default mongoose.models.account || mongoose.model('account', accountSchema, 'accounts')