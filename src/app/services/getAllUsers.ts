import user, { User } from '@/app/models/user'
import dbConnect from '@/lib/dbConnect'

const getAllUsers = async (): Promise<User[]> => {

    await dbConnect()

    const users: User[] = await user.find().select('-password').lean()

    return users
}

export default getAllUsers