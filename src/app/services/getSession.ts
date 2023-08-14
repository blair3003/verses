import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Session } from '../models/Session'

const getSession = async (): Promise<Session | null> => {
    return await getServerSession(authOptions)
}

export default getSession