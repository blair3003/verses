'use client'

import { useEffect, useRef } from 'react'
import LineSingle from './LineSingle'
import { useSession } from 'next-auth/react'

interface Props {
    lines?: Line[]
    users: User[]
    isGroup?: boolean
}

const Lines = ({ lines, users, isGroup }: Props) => {

    const session = useSession()
    const linesRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (linesRef.current) {
            linesRef.current.scrollTop = linesRef.current.scrollHeight
        }
    }, [lines])

    return (
        <div
            ref={linesRef}
            className="grow flex flex-col p-6 overflow-y-auto basis-0"
        >
            {session.data?.user && lines?.map(line => (
                <LineSingle
                    key={line._id}
                    line={line}
                    user={users.find(user => user._id === line.userId)}
                    isOwner={line.userId === session.data?.user.id}
                    isGroup={isGroup}
                />
            ))}
        </div>
    )
}

export default Lines