import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
 
declare module "next-auth" {
    interface Session {
        user: {
            id?: string
            name?: string
            email?: string
            image?: string
            verseIds?: string[]
        } & DefaultSession
    }

    interface User extends DefaultUser {
        name?: string
        email?: string
        image?: string
        verseIds?: string[]
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        verseIds?: string[]
    }
}