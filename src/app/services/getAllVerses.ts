import verse, { Verse } from '@/app/models/verse'
import dbConnect from '@/lib/dbConnect'
import line, { Line } from '../models/line'
import getSession from './getSession'
import user, { User } from '../models/user'


const getAllVerses = async (): Promise<Verse[]> => {

    const session = await getSession()
    if (!session) return []

    await dbConnect()

    try {        
        const verses: Verse[] = await verse.find({
            userIds: session.userId
        })
        if (!verses.length) return []
    
        const expandedVerses = await Promise.all(
            verses.map(async v => {
                const [otherUser, latestLine] = await Promise.all([
                    user.findById<User>(v.userIds.filter(userId => userId !== session.userId)[0]).select('-password').exec(),
                    line.findById<Line>(v.latestLineId).exec()
                ])
                return { ...v, otherUser: { name: otherUser?.name, image: otherUser?.image }, latestLine }
            })
        )
    
        return expandedVerses

    } catch (err) {
        return []
    }
}

export default getAllVerses