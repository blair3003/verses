import { NextResponse } from 'next/server'
import getAllUsers from '@/app/services/getAllUsers'

export async function GET(request: Request) {

    const users = await getAllUsers()

    return NextResponse.json(users)
}