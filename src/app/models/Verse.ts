import { model, models, Schema } from 'mongoose'

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

export default models.Verse || model<Verse>('Verse', verseSchema, 'verses')