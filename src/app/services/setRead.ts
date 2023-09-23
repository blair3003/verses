import dbConnect from '@/lib/dbConnect'
import getSession from './getSession'
import LineModel from '@/app/models/Line'
import { pusherServer } from '@/lib/pusher'

const setRead = async (verseId: string): Promise<boolean> => {

    const session = await getSession()
	if (!session) return false

    await dbConnect()

    try {        
        const lines = await LineModel.updateMany<Line>(
            { verseId: verseId, userId: { $ne: session.user.id } },
            { $addToSet: { readIds: session.user.id } }
        )
        if (!lines.modifiedCount) return false

        await pusherServer.trigger(verseId!, 'lines:read', session.user.id)

        // await pusherServer.trigger(currentUser.email, 'verse:update', {
        //     id: conversationId,
        //     messages: [updatedMessage]
        //   })
        
        return true

    } catch (err) {
        return false
    }

}

export default setRead