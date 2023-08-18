import { model, models, Schema } from 'mongoose'

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        emailVerified: Date,
        password: String,
        image: String,
        verseIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Verse'
        }]
    },
    {
        timestamps: true
    }
)

export default models.User || model<User>('User', userSchema, 'users')