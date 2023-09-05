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
        const verses = await VerseModel.find<Verse>({ _id: { $in: session.user.verseIds } })
        if (!verses.length) return []
    
        const expandedVerses = await Promise.all(
            verses.map(async verse => {
                const [users, latestLine] = await Promise.all([
                    UserModel.find<User>({ _id: { $in: verse.userIds, $ne: session.user.id } }).select('-password'),
                    LineModel.findById<Line>(verse.latestLineId)
                ])
                return {            
                    _id: verse._id.toString(),
                    group: verse.group,
                    subject: verse.subject,
                    users: users.map(user => ({
                        _id: user._id.toString(),
                        name: user.name,
                        image: user.image
                    })),
                    latestLine: {
                        _id: latestLine?._id.toString(),
                        userId: latestLine?.userId.toString(),
                        readIds: latestLine?.readIds?.map(readId => readId.toString()),
                        body: latestLine?.body,
                        media: latestLine?.media,
                        createdAt: latestLine?.createdAt
                    }                        
                }
            })
        )    
        return expandedVerses.filter(verse => verse.latestLine?._id).sort((a, b) => {
                if (!b.latestLine.createdAt || !a.latestLine.createdAt) return 0
                return b.latestLine.createdAt.getTime() - a.latestLine.createdAt.getTime()
        })

    } catch (err) {
        return []
    }
}

export default getVerses