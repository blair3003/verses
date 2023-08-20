import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import LineModel from '@/app/models/Line'
import UserModel from '@/app/models/User'

const createNewLine = async (verseId: string, newLine: string): Promise<Line | null> => {

    const session = await getSession()
	if (!session) return null

    // Check user has verse id
    return null

    await dbConnect()

    try {

    

    } catch (err) {
        return null
    }
}

export default createNewLine