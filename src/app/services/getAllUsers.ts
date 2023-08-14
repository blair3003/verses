import UserModel, { User } from '@/app/models/User'
import dbConnect from '@/lib/dbConnect'

const getAllUsers = async (): Promise<User[]> => {

    await dbConnect()

    const users = await UserModel.find<User>().select('-password').lean()

    return users as User[]
}

export default getAllUsers