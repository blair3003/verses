import { NextResponse } from 'next/server'
import getVerseId from '@/app/services/getVerseId'
import createNewVerse from '@/app/services/createNewVerse'

export async function POST(request: Request) {

    const userId: string = await request.json()

    let verseId = await getVerseId(userId)

    if (!verseId) {

        const newVerse = await createNewVerse(userId)
        if (!newVerse) {
            return new NextResponse('Failed to create new verse', { status: 500 })            
        }
    
        verseId = newVerse._id.toString()    
    }

    return NextResponse.json(verseId)
}