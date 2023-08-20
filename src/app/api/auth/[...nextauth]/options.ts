import type { AuthOptions } from 'next-auth'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/clientPromise'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.verseIds = user?.verseIds?.map(verseId => verseId.toString())
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string
                session.user.verseIds = token.verseIds
            }
            return session
        }
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}