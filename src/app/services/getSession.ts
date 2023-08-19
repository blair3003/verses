import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'

const getSession = async (): Promise<Session | null> => {
    return await getServerSession(authOptions)
}

export default getSession