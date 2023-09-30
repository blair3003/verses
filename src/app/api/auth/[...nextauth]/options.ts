import type { AuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/clientPromise'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/app/models/User'

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                },
                password: {
                    label: "Password:",
                    type: "password",
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error('Missing Credentials')

                const user = await User.findOne({ email: credentials.email }).exec()
                if (!user || !user?.password) throw new Error('Invalid Credentials')

                const passwordValid = await bcrypt.compare(credentials.password, user.password)
                if (!passwordValid) throw new Error('Invalid Credentials')

                return user
            }
        }),
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
        async jwt({ token, user, session, trigger }) { 
            if (user) {
                token.id = user.id
                token.name = user.name
                token.verseIds = user.verseIds?.map(verseId => verseId.toString())
            }
            if (trigger === 'update') {
                if (session?.verseIds?.length) {
                    session.verseIds.forEach((verseId: string) => {
                        if (!token.verseIds?.includes(verseId)) token.verseIds?.push(verseId)
                    })
                }
                if (session?.name) token.name = session.name
                if (session?.email) token.email = session.email
                if (session?.image) token.picture = session.image
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string
                session.user.name = token.name as string
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