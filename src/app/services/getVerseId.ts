import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'

import UserModel from '@/app/models/User'
import VerseModel from '@/app/models/Verse'

const getVerseId = async (user: User): Promise<string | null> => {

    const session = await getSession()
	if (!session) return null

    await dbConnect()

    try {
        
        const verseIds = session.user.verseIds.filter(verseId => user.verseIds.includes(verseId))
        
        const matchedVerse = await VerseModel.findOne<Verse>({
            _id: { $in: verseIds },
            group: { $ne: true }
        })

        let verseId: string

        if (!matchedVerse) {

            const newVerse: Verse = await VerseModel.create({
                userIds: [session.user._id, user._id]
            })

            await UserModel.updateMany({
                _id: { $in: [session.user._id, user._id] }
            }, {
                $addToSet: { verseIds: newVerse._id }
            })

            verseId = newVerse._id.toString()

        } else {
            verseId = matchedVerse._id.toString()    
        }

   	    return verseId

    } catch (err) {
        return null
    }

}

export default getVerseId