import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

const getSession = async () => await getServerSession(authOptions)

export default getSession