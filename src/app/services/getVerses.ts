import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import VerseModel, { Verse, VerseExpanded } from '@/app/models/Verse'
import LineModel, { Line } from '../models/Line'
import UserModel, { User } from '../models/User'


const getVerses = async (): Promise<VerseExpanded[]> => {

    const session = await getSession()
    if (!session) return []

    await dbConnect()

    try {        
        const verses = await VerseModel
            .find<Verse>({
                userIds: session.userId
            })
            .sort('createdAt')
            .lean()
        if (!verses.length) return []
    
        const expandedVerses = await Promise.all(
            verses.map(async v => {
                const [users, latestLine] = await Promise.all([
                    UserModel.find<User>({ _id: v.userIds }).select('-password').lean(),
                    LineModel.findById<Line>(v.latestLineId).lean()
                ])
                if (!users || !latestLine) return null
                return { ...v, users, latestLine }
            })
        )    
        return expandedVerses.filter(Boolean) as VerseExpanded[]

    } catch (err) {
        return []
    }
}

export default getVerses