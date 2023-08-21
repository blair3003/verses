'use client'

import { useEffect, useRef } from 'react'
import LineSingle from './LineSingle'
import { useSession } from 'next-auth/react'

interface Props {
    lines?: Line[]
}

const Lines = ({ lines }: Props) => {

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
                    isOwner={line.userId === session.data?.user.id}
                />
            ))}
        </div>
    )
}

export default Lines