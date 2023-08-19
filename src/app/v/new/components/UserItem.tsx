'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfilePic from '@/app/components/ProfilePic'
import { PulseLoader } from 'react-spinners'

interface Props {
    id: string
    name: string
    image: string
}

const UserItem = ({ id, name, image }: Props) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleClick = useCallback(async () => {

        setLoading(true)

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
        <li
            className="flex items-center justify-start gap-6 mb-6"
            onClick={handleClick}
        >
            <ProfilePic name={name} image={image} />
            <div className="text-lg grow overflow-hidden whitespace-nowrap">
                {name}
            </div>
            <PulseLoader loading={loading} color="#06B6D4" size={12} />

        </li>
    )
}

export default UserItem