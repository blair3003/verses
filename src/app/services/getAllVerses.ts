import VerseModel, { Verse, VerseExpanded } from '@/app/models/Verse'
import dbConnect from '@/lib/dbConnect'
import LineModel, { Line } from '../models/Line'
import getSession from './getSession'
import UserModel, { User } from '../models/User'


const getAllVerses = async (): Promise<VerseExpanded[]> => {

    const session = await getSession()
    if (!session) return []

    await dbConnect()

    try {        
        const verses = await VerseModel.find<Verse>({
            userIds: session.userId
        }).lean()
        if (!verses.length) return []
    
        const expandedVerses = await Promise.all(
            verses.map(async v => {
                const [users, latestLine] = await Promise.all([
                    UserModel.find<User>({ userIds: v.userIds }).select('-password').lean(),
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

export default getAllVerses