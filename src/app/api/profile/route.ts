import { NextResponse } from 'next/server'
import updateProfile from '@/app/services/updateProfile'
import getProfile from '@/app/services/getProfile'

export async function GET(request: Request) {

    const profile = await getProfile()
    if (!profile) return new NextResponse('Profile not found', { status: 400 })

    return NextResponse.json(profile)
}

export async function POST(request: Request) {

    const { id, name, email, password, image } = await request.json()
    
    const updated = await updateProfile(id, name, email, password, image)
    if (!updated) return new NextResponse('Nothing updated', { status: 400 })

    return new NextResponse('Profile updated', { status: 200 })
}