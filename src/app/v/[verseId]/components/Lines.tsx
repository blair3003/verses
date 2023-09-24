'use client'

import { useEffect, useRef, useState } from 'react'
import LineSingle from './LineSingle'
import { useSession } from 'next-auth/react'
import ImageDialog from './ImageDialog'
import { pusherClient } from '@/lib/pusher'

interface Props {
    userId?: string
    verseId: string
    lines: Line[]
    users: User[]
    isGroup?: boolean
}

const Lines = ({ userId, verseId, lines, users, isGroup }: Props) => {

    const session = useSession()
    const linesRef = useRef<HTMLDivElement | null>(null)
    const [image, setImage] = useState('')
    const [latestLines, setLatestLines] = useState(lines)

    const newLinePusher = (newLine: Line) => {
        setLatestLines(existingLines => {
            if (existingLines.find(line => line._id === newLine._id)) return existingLines
            return [...existingLines, newLine]
        })
    }

    const readLinePusher = (readId: string) => {
        setLatestLines(existingLines =>            
            existingLines.map(existingLine => {
                if ((existingLine.userId === userId) && (userId !== readId)) {
                    if (!existingLine.readIds?.includes(readId)) existingLine.readIds?.push(readId)
                }
                return existingLine
            })
        )                
    }

    useEffect(() => {
        pusherClient.subscribe(verseId)
        pusherClient.bind('lines:new', newLinePusher)
        pusherClient.bind('lines:read', readLinePusher)

        return () => {
            pusherClient.unsubscribe(verseId)
            pusherClient.unbind('lines:new', newLinePusher)
            pusherClient.unbind('lines:read', readLinePusher)
        }
    }, [verseId])

    useEffect(() => {
        if (linesRef.current) {
            linesRef.current.scrollTop = linesRef.current.scrollHeight
        }
    }, [linesRef.current, latestLines.length])

    useEffect(() => {
        if (!latestLines?.length) return
        if ((latestLines[latestLines.length - 1].userId === userId) || (latestLines[latestLines.length - 1].readIds?.includes(userId))) return
        
        const readLines = async () => {
            await fetch('/api/read/', {
                method: 'POST',
                body: JSON.stringify({
                    verseId
                })
            })
        }        
        readLines()

    }, [latestLines.length, verseId])

    return (
        <div
            ref={linesRef}
            className="grow flex flex-col p-6 overflow-y-auto basis-0"
        >
            {image && <ImageDialog image={image} setImage={setImage} />}
            
            {session.data?.user && latestLines?.map(line => {
                return (
                    <LineSingle
                        key={line._id}
                        line={line}
                        owner={users.find(user => user._id === line.userId)}
                        isOwner={line.userId === session.data?.user.id}
                        isGroup={isGroup}
                        setImage={setImage}
                    />
                )
            })}
        </div>
    )
}

export default Lines