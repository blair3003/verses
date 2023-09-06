import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/app/models/User'

export async function POST(request: Request) {

    try {
        const { email, name, password } = await request.json()
    
        if (!email || !name || !password) return new NextResponse('Missing required fields', { status: 400 })
    
        const hash = await bcrypt.hash(password, 12)
    
        const newUser = await User.create({            
            name,
            email,
            password: hash
        })

        return NextResponse.json(newUser)

    } catch (err) {
        return new NextResponse('Registration error', { status: 500 })
    }
}