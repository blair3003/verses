'use client'

import { pusherClient } from '@/lib/pusher'
import VersesItem from './VersesItem'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface VerseListProps {
    verses: VerseExpanded[]
    userId: string
}

const VersesList = ({ verses, userId }: VerseListProps) => {    

    const [existingVerses, setExistingVerses] = useState(verses)
    const { update } = useSession()

    const refreshToken = async (newVerse: VerseExpanded) => {
        await update({ verseId: newVerse._id.toString() })
    }

    const newVersePusher = async (newVerse: VerseExpanded) => {
        setExistingVerses(existingVerses => {
            if (existingVerses.find(verse => verse._id === newVerse._id)) {
                return existingVerses
            }            
            return [newVerse, ...existingVerses]
        })
    }

    const readVersePusher = (readId: string) => {
        // setExistingVerses(existingLines =>            
        //     existingLines.map(existingLine => {
        //         if ((existingLine.userId === userId) && (userId !== readId)) {
        //             if (!existingLine.readIds?.includes(readId)) existingLine.readIds?.push(readId)
        //         }
        //         return existingLine
        //     })
        // )                
    }

    useEffect(() => {
        if (existingVerses.length) {
            console.log(`Preparing to refresh token`)
            console.log(`Verse: ${existingVerses[0]}`)
            refreshToken(existingVerses[0])
        }
    }, [existingVerses.length])

    useEffect(() => {

        pusherClient.subscribe(userId)
        pusherClient.bind('verses:new', newVersePusher)
        // pusherClient.bind('verses:read', readVersePusher)

        return () => {
            pusherClient.unsubscribe(userId)
            pusherClient.unbind('verses:new', newVersePusher)
            // pusherClient.unbind('verses:read', readVersePusher)
        }
        
    }, [userId])


    return (
        <div className="p-6">
            {existingVerses.map(verse => (
                <VersesItem
                    key={verse._id}
                    verse={verse}                
                />
            ))}
        </div>
    )
}

export default VersesList