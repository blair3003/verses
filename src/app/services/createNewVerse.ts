import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import VerseModel from '@/app/models/Verse'
import UserModel from '@/app/models/User'

const createNewVerse = async (userId: string): Promise<Verse | null> => {

    const session = await getSession()
	if (!session) return null
    if (session.user.id === userId) return null

    await dbConnect()

    try {
        const newVerse: Verse = await VerseModel.create(
            { userIds: [session.user.id, userId] }
        )
        if (!newVerse._id) throw new Error('Failed to create verse')

        const userUpdateResult = await UserModel.updateMany(
            { _id: { $in: [session.user.id, userId] } },
            { $addToSet: { verseIds: newVerse._id } }
        )
        if (!userUpdateResult.modifiedCount) throw new Error('Failed to update users')

   	    return newVerse

    } catch (err) {
        return null
    }
}

export default createNewVerse