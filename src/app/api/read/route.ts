import setRead from '@/app/services/setRead'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {

    try {
        const { verseId } = await request.json()   
        if (!verseId) return new NextResponse('Missing verse ID', { status: 400 })
    
        const read = await setRead(verseId)
        if (!read) return new NextResponse('Nothing updated', { status: 200 })
        
        return new NextResponse('Read updated', { status: 200 })

    } catch (err) {
        return new NextResponse('Read update error', { status: 500 })
    }
}