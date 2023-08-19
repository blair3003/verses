'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
    id: string
    name: string
    image: string
}

const UserItem = ({ id, name, image }: Props) => {

    const router = useRouter()

    const handleClick = useCallback(async () => {

        const verse = await fetch('/api/verses', {
            method: 'POST',
            body: JSON.stringify(id)
        })

        const verseId = await verse.json()

        if (verseId) {
            router.push(`/v/${verseId}`)
        }

    }, [id, router])

    return (
        <li>
            <div
                className="flex items-center justify-start gap-6"
                onClick={handleClick}
            >
                <div>
                    {image ?? 'alt-image'}
                </div>
                <div>
                    {name}
                </div>

            </div>
        </li>
    )
}

export default UserItem