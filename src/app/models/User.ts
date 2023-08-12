import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema, 'users')