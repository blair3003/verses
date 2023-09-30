import { NextResponse } from 'next/server'
import getVerseId from '@/app/services/getVerseId'
import createNewVerse from '@/app/services/createNewVerse'
import getVerses from '@/app/services/getVerses'

export async function GET(request: Request) {

    const verses = await getVerses()
    if (!verses) {
        return new NextResponse('Failed to get verses', { status: 500 })            
    }

    return NextResponse.json(verses)
}


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