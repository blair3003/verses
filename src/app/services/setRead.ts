import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import LineModel from '@/app/models/Line'

const setRead = async (verseId: string): Promise<boolean> => {

    const session = await getSession()
	if (!session) return false

    await dbConnect()

    try {        
        const lines = await LineModel.updateMany<Line>(
            { verseId: verseId, userId: { $ne: session.user.id } },
            { $addToSet: { readIds: session.user.id } }
        )
        if (!lines.modifiedCount) return false
        
        return true

    } catch (err) {
        return false
    }

}

export default setRead