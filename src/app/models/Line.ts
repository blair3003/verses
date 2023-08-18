import { model, models, Schema } from 'mongoose'

const lineSchema = new Schema<Line>(
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

export default models.Line || model<Line>('Line', lineSchema, 'lines')