import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/models/User'
import getSession from './getSession'

const getProfile = async (): Promise<User | null> => {

    const session = await getSession()
    if (!session) return null

    await dbConnect()

    const profile = await UserModel.findById<User>(session.user.id).select('-password')
    if (!profile) return null

    return ({
        _id: profile._id.toString(),
        name: profile.name,
        email: profile.email,
        image: profile.image
    })
}

export default getProfile