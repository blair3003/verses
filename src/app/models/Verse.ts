import mongoose from 'mongoose'

const verseSchema = new mongoose.Schema(
    {
        userIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        latestLineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Line'
        },
        group: Boolean,
        subject: String
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Verse || mongoose.model('Verse', verseSchema, 'verses')