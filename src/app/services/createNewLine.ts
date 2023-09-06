import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import LineModel from '@/app/models/Line'
import VerseModel from '@/app/models/Verse'

const createNewLine = async (verseId: string, body: string): Promise<Line | null> => {

    const session = await getSession()
	if (!session) return null

    // Below only works if token is refreshed after creating new verse
    // if (!session.user.verseIds?.includes(verseId)) return null    

    await dbConnect()

    try {
        const newLine: Line = await LineModel.create(
            { userId: session.user.id, verseId, body, readIds: [session.user.id] }
        )
        if (!newLine._id) throw new Error('Failed to create line')

        const verseUpdateResult = await VerseModel.updateOne(
            { _id: verseId },
            { latestLineId: newLine._id }
        )
        if (!verseUpdateResult.modifiedCount) throw new Error('Failed to update verse latest line')

        return newLine

    } catch (err) {
        return null
    }
}

export default createNewLine