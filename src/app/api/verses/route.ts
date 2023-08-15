import { NextResponse } from 'next/server'
import getAllVerses from '@/app/services/getVerses'

export async function GET(request: Request) {

    const verses = await getAllVerses()

    return NextResponse.json(verses)
}