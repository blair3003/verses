import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import VerseModel from '@/app/models/Verse'
import UserModel from '@/app/models/User'

const createNewVerse = async (userId: string): Promise<Verse | null> => {

    const session = await getSession()
	if (!session) return null

    await dbConnect()

    try {

        console.log(`Creating new verse for users:`)
        console.log(session.user.id)
        console.log(userId)

        const newVerse: Verse = await VerseModel.create(
            { userIds: [session.user.id, userId] }
        )
        if (!newVerse) throw new Error('Failed to create verse')

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