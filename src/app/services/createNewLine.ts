import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import LineModel from '@/app/models/Line'
import VerseModel from '@/app/models/Verse'
import { pusherServer } from '@/lib/pusher'

const createNewLine = async (verseId: string, body: string, media: string): Promise<Line | null> => {

    const session = await getSession()
	if (!session) return null
    if (!session.user.verseIds?.includes(verseId)) return null    

    await dbConnect()

    try {
        const newLine: Line = await LineModel.create(
            { userId: session.user.id, verseId, body, media }
        )
        if (!newLine._id) throw new Error('Failed to create line')

        await pusherServer.trigger(verseId, 'lines:new', newLine)

        const verse: Verse | null = await VerseModel.findByIdAndUpdate(
            verseId,
            { latestLineId: newLine._id }
        )
        if (!verse?._id) throw new Error('Failed to update verse latest line')

        if (!verse.latestLineId) {
            verse.userIds?.forEach(userId => {
                pusherServer.trigger(userId.toString(), 'verses:new', {
                    _id: verseId,
                    latestLine: newLine,
                    users: [session.user]
                })
            })
        }

        // pusher update to verses list
        if (verse.userIds?.length) {
            verse.userIds.map(userId => {
                pusherServer.trigger(userId.toString()!, 'verses:update', {
                    _id: verseId,
                    latestLine: newLine
                })
            })
        }

        return newLine        


    } catch (err) {
        return null
    }
}

export default createNewLine