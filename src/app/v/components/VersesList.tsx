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
    const { data: session, update } = useSession()    
    
    useEffect(() => {
        
        const refreshToken = async (verseIds: string[]) => {
            await update({ verseIds })
        }
        const verseIds = existingVerses.map(verse => verse._id.toString()).filter(verseId => !session?.user?.verseIds?.includes(verseId))
        if (verseIds.length) {
            refreshToken(verseIds)
        }        
    }, [existingVerses, session, update])
    
    useEffect(() => {  

        const newVersePusher = async (newVerse: VerseExpanded) => {
            setExistingVerses(existingVerses => {
                if (existingVerses.find(verse => verse._id === newVerse._id)) {
                    return existingVerses
                }            
                return [newVerse, ...existingVerses]
            })
        }

        const updatedVersePusher = (updatedVerse: VerseExpanded) => {
            setExistingVerses(existingVerses =>            
                existingVerses.map(existingVerse => {
                    if ((existingVerse._id === updatedVerse._id)) {
                        existingVerse.latestLine = updatedVerse.latestLine
                        return existingVerse
                    }
                    return existingVerse
                })
            )                
        }

        pusherClient.subscribe(userId)
        pusherClient.bind('verses:new', newVersePusher)
        pusherClient.bind('verses:update', updatedVersePusher)

        return () => {
            pusherClient.unsubscribe(userId)
            pusherClient.unbind('verses:new', newVersePusher)
            pusherClient.unbind('verses:update', updatedVersePusher)
        }
        
    }, [userId])


    return (
        <div className="p-6">
            {existingVerses.map(verse => (
                <VersesItem
                    key={verse._id}
                    verse={verse}
                    userId={userId}                
                />
            ))}
        </div>
    )
}

export default VersesList