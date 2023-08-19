import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import VerseModel from '@/app/models/Verse'

const getVerseId = async (userId: string): Promise<string | null> => {

    const session = await getSession()
	if (!session) return null
    if (session.user.id === userId) return null

    await dbConnect()

    try {
        const verse = await VerseModel.findOne<Verse>({
            userIds: { $all: [session.user.id, userId] },
            group: { $ne: true }
        })
        return verse?._id.toString()

    } catch (err) {
        return null
    }

}

export default getVerseId