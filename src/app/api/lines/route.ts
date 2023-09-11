import { NextResponse } from 'next/server'
import createNewLine from '@/app/services/createNewLine'

export async function POST(request: Request) {

    const { verseId, newLine, media } = await request.json()

    const line = await createNewLine(verseId, newLine, media)

    if (!line) {
        return new NextResponse('Failed to create new line', { status: 500 })
    }

    return NextResponse.json(line)
}