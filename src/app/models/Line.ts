import { model, models, Document, Schema, Types } from 'mongoose'

export type Line = Document & {
    userId: Types.ObjectId
    verseId: Types.ObjectId
    body: string
    media: string
    readIds: Types.ObjectId[]
}

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