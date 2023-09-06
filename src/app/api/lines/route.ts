import { NextResponse } from 'next/server'
import createNewLine from '@/app/services/createNewLine'

export async function POST(request: Request) {

    const { verseId, newLine } = await request.json()

    const line = await createNewLine(verseId, newLine)

    if (!line) {
        return new NextResponse('Failed to create new line', { status: 500 })
    }

    return NextResponse.json(line)
}