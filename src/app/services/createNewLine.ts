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

        const verseUpdateResult = await VerseModel.updateOne(
            { _id: verseId },
            { latestLineId: newLine._id }
        )
        if (!verseUpdateResult.modifiedCount) throw new Error('Failed to update verse latest line')

        // pusher update to verses list

        return newLine        


    } catch (err) {
        return null
    }
}

export default createNewLine