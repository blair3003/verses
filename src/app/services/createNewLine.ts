import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import LineModel from '@/app/models/Line'

const createNewLine = async (verseId: string, body: string): Promise<Line | null> => {

    const session = await getSession()
	if (!session) return null
    if (!session.user.verseIds?.includes(verseId)) return null    

    await dbConnect()

    try {
        const newLine: Line = await LineModel.create(
            { userId: session.user.id, verseId, body, readIds: [session.user.id] }
        )
        if (!newLine._id) throw new Error('Failed to create verse')

        return newLine

    } catch (err) {
        return null
    }
}

export default createNewLine