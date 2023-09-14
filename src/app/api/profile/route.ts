import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    const { id, name, email, password, image } = await request.json()

    console.log(`Request to update profile`)
    console.log(id, name, email, password, image)

    return NextResponse.json({ 'Request': 'received' })
}