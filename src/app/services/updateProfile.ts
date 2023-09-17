import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/models/User'
import getSession from './getSession'
import bcrypt from 'bcrypt'

const updateProfile = async (id: string, name: string, email: string, password: string, image: string): Promise<boolean | null> => {

    const session = await getSession()
    if (!session || session.user.id !== id) return null

    await dbConnect()

    const emailExists = await UserModel.findOne<User>({ email }).select('_id')
    if (emailExists && emailExists._id.toString() !== id) return null

    const hash = password ? await bcrypt.hash(password, 12) : undefined

    const profile = await UserModel.findByIdAndUpdate<User>(id, {
        name, email, password: hash, image
    })
    if (!profile) return null

    return true
}

export default updateProfile