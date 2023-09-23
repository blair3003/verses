'use client'

import { useEffect, useRef, useState } from 'react'
import LineSingle from './LineSingle'
import { useSession } from 'next-auth/react'
import ImageDialog from './ImageDialog'
import { pusherClient } from '@/lib/pusher'

interface Props {
    verseId: string
    lines: Line[]
    users: User[]
    isGroup?: boolean
}

const Lines = ({ verseId, lines, users, isGroup }: Props) => {

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

    useEffect(() => {
        pusherClient.subscribe(verseId)
        pusherClient.bind('lines:new', newLinePusher)

        return () => {
            pusherClient.unsubscribe(verseId)
            pusherClient.unbind('lines:new', newLinePusher)
        }
    }, [verseId])

    useEffect(() => {
        if (linesRef.current) {
            linesRef.current.scrollTop = linesRef.current.scrollHeight
        }
    }, [linesRef.current, latestLines.length])

    useEffect(() => {
        if (!latestLines?.length) return

        const readLines = async () => {
            await fetch('/api/read/', {
                method: 'POST',
                body: JSON.stringify({
                    verseId
                })
            })
        }        
        readLines()

    }, [latestLines, verseId])

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
                        user={users.find(user => user._id === line.userId)}
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