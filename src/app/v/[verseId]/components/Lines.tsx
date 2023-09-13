'use client'

import { useEffect, useRef, useState } from 'react'
import LineSingle from './LineSingle'
import { useSession } from 'next-auth/react'
import ImageDialog from './ImageDialog'

interface Props {
    lines?: Line[]
    users: User[]
    isGroup?: boolean
}

const Lines = ({ lines, users, isGroup }: Props) => {

    const session = useSession()
    const linesRef = useRef<HTMLDivElement | null>(null)
    const [image, setImage] = useState('')

    useEffect(() => {
        if (linesRef.current) {
            linesRef.current.scrollTop = linesRef.current.scrollHeight
        }
    }, [linesRef.current])

    useEffect(() => {
        if (!lines?.length) return

        const readLines = async () => {
            await fetch('/api/read/', {
                method: 'POST',
                body: JSON.stringify({
                    verseId: lines[0].verseId
                })
            })
        }        
        readLines()

    }, [lines])

    return (
        <div
            ref={linesRef}
            className="grow flex flex-col p-6 overflow-y-auto basis-0"
        >
            {image && <ImageDialog image={image} setImage={setImage} />}
            
            {session.data?.user && lines?.map(line => {
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