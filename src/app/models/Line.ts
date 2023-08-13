import mongoose, { Schema, Types } from 'mongoose'

export type Line = {
    userId: Types.ObjectId
    verseId: Types.ObjectId
    body: string
    media: string
    readIds: Types.ObjectId[]
}

const lineSchema = new mongoose.Schema<Line>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        verseId: {
            type: Schema.Types.ObjectId,
            ref: 'Verse'
        },
        body: String,
        media: String,
        readIds: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Line || mongoose.model('Line', lineSchema, 'lines')