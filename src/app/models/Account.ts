import { model, models, Schema } from 'mongoose'

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

export default models.Account || model<Account>('Account', accountSchema, 'accounts')