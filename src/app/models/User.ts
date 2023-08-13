import mongoose, { Schema, Types } from 'mongoose'

export type User = {
    name: string
    email: string
    emailVerified: string
    password: string
    image: string
    verseIds: Types.ObjectId[]
}

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

export default mongoose.models.user || mongoose.model('user', userSchema, 'users')