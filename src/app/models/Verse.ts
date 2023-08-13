import mongoose, { Schema, Types } from 'mongoose'

export type Verse = {
    userIds: Types.ObjectId[]
    latestLineId: Types.ObjectId
    group: boolean
    subject: string
}

const verseSchema = new Schema<Verse>(
    {
        userIds: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        latestLineId: {
            type: Schema.Types.ObjectId,
            ref: 'Line'
        },
        group: Boolean,
        subject: String
    },
    {
        timestamps: true
    }
)

export default mongoose.models.verse || mongoose.model('verse', verseSchema, 'verses')