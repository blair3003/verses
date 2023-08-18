import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'

import LineModel from '@/app/models/Line'
import UserModel from '@/app/models/User'
import VerseModel from '@/app/models/Verse'

const getVerses = async (): Promise<VerseExpanded[]> => {

    const session = await getSession()
    if (!session) return []

    await dbConnect()

    try {        
        const verses = await VerseModel
            .find<Verse>({ _id: { $in: session.user.verseIds } })
            .sort('createdAt')
            .lean()
        if (!verses.length) return []
    
        const expandedVerses = await Promise.all(
            verses.map(async verse => {
                const [users, latestLine] = await Promise.all([
                    UserModel.find<User>({ _id: { $in: verse.userIds } }).select('-password').lean(),
                    LineModel.findById<Line>(verse.latestLineId).lean()
                ])
                if (!users || !latestLine) return null
                return { ...verse, users, latestLine }
            })
        )    
        return expandedVerses.filter(Boolean) as VerseExpanded[]

    } catch (err) {
        return []
    }
}

export default getVerses