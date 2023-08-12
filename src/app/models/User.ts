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
        verseIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Verse'
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.models.User || mongoose.model('User', userSchema, 'users')