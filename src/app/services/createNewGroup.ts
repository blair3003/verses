import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import VerseModel from '@/app/models/Verse'
import UserModel from '@/app/models/User'

const createNewGroup = async (name: string, userIds: string[]): Promise<Verse | null> => {

    const session = await getSession()
	if (!session) return null

    await dbConnect()

    try {
        const newVerse: Verse = await VerseModel.create(
            { userIds: [...userIds, session.user.id], group: true, subject: name }
        )
        if (!newVerse._id) throw new Error('Failed to create verse')

        const userUpdateResult = await UserModel.updateMany(
            { _id: { $in: [...userIds, session.user.id] } },
            { $addToSet: { verseIds: newVerse._id } }
        )
        if (!userUpdateResult.modifiedCount) throw new Error('Failed to update users')

   	    return newVerse

    } catch (err) {
        return null
    }
}

export default createNewGroup