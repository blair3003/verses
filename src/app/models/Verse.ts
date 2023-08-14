import { model, models, Document, Schema, Types } from 'mongoose'
import { Line } from './Line'
import { User } from './User'

export type Verse = Document & {
    userIds: Types.ObjectId[]
    latestLineId: Types.ObjectId
    group: boolean
    subject: string
}

export type VerseExpanded = Verse & {
    users: User[]
    latestLine: Line
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

export default models.Verse || model<Verse>('Verse', verseSchema, 'verses')