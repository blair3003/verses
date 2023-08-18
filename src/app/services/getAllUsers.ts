import dbConnect from '@/lib/dbConnect'
import UserModel from '@/app/models/User'

const getAllUsers = async (): Promise<User[]> => {

    await dbConnect()

    const users = await UserModel.find<User>().select('-password').lean()

    return users as User[]
}

export default getAllUsers