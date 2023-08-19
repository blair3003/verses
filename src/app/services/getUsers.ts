import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/models/User'
import getSession from './getSession'

const getUsers = async (): Promise<User[]> => {

    const session = await getSession()
    if (!session) return []

    await dbConnect()

    const users = await UserModel.find<User>({
        _id: { $ne: session.user.id }
    }).select('-password').lean()

    return users as User[]
}

export default getUsers