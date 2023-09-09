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
        const verse = await VerseModel.findById<Verse>(verseId)
        if (!verse) return null

        const [users, lines] = await Promise.all([
            UserModel.find<User>({ _id: { $in: verse.userIds } }).select('-password'),
            LineModel.find<Line>({ verseId: verse._id }).select('userId body readIds createdAt').sort('createdAt')
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
            lines: lines.map(line => ({
                _id: line._id.toString(),
                verseId: verse._id.toString(),
                userId: line.userId.toString(),
                readIds: line?.readIds?.map(readId => readId.toString()),
                body: line.body,
                createdAt: line.createdAt
            }))
        }

    } catch (err) {
        return null
    }

}

export default getVerse