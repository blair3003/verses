import { NextResponse } from 'next/server'
import getVerse from '@/app/services/getVerse'

export async function GET(
    request: Request,
    { params }: { params: { verseId: string } }
) {

    const verseId = params.verseId

    const verse = await getVerse(verseId)
    if (!verse) {
        return new NextResponse('Failed to get verse', { status: 500 })            
    }

    return NextResponse.json(verse)
}