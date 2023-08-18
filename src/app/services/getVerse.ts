import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'

import LineModel from '@/app/models/Line'
import UserModel from '@/app/models/User'
import VerseModel from '@/app/models/Verse'


const getVerse = async (verseId: string): Promise<VerseExpandedWithLines | null> => {

    const session = await getSession()
    if (!session) return null

    await dbConnect()

    try {        
        const verse = await VerseModel.findById<Verse>(verseId).lean()
        if (!verse) return null

        const [users, lines] = await Promise.all([
            UserModel.find<User>({ _id: { $in: verse.userIds } }).select('-password').lean(),
            LineModel.find<Line>({ verseId: verse._id }).sort('createdAt').lean()
        ])

        return { ...verse, users, latestLine: lines[0], lines } as VerseExpandedWithLines

    } catch (err) {
        return null
    }

}

export default getVerse