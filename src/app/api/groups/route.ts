import { NextResponse } from 'next/server'
import createNewGroup from '@/app/services/createNewGroup'

export async function POST(request: Request) {

    const { name, userIds } = await request.json()

    if (!name || !userIds.length) {
        return new NextResponse('Failed to create new group', { status: 500 })
    }

    const newGroup = await createNewGroup(name, userIds)
    if (!newGroup) {
        return new NextResponse('Failed to create new group', { status: 500 })         
    }

    const newGroupId: string = newGroup._id.toString()

    return NextResponse.json(newGroupId)
}