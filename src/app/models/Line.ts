import mongoose from 'mongoose'

const lineSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        verseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Verse'
        },
        body: String,
        media: String,
        readIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Line', lineSchema, 'lines')