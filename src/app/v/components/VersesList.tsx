'use client'

import { pusherClient } from '@/lib/pusher'
import VersesItem from './VersesItem'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PulseLoader } from 'react-spinners'
import Link from 'next/link'

interface VerseListProps {
    userId: string
}

const VersesList = ({ userId }: VerseListProps) => {    

    const [existingVerses, setExistingVerses] = useState<VerseExpanded[]>([])
    const { data: session, update } = useSession()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {

        const controller = new AbortController()

        try {
            setLoading(true)
            const getVerses = async () => {
                const res = await fetch('/api/verses', { signal: controller.signal })
                const verses: VerseExpanded[] = await res.json()
                if (verses) setExistingVerses(verses)
            }
            getVerses()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        
        return () => controller.abort()

    }, [])
    
    useEffect(() => {
        
        const refreshToken = async (verseIds: string[]) => {
            await update({ verseIds })
        }
        const verseIds = existingVerses?.map(verse => verse._id.toString()).filter(verseId => !session?.user?.verseIds?.includes(verseId))
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
            {!loading && existingVerses.map(verse => (
                <VersesItem
                    key={verse._id}
                    verse={verse}
                    userId={userId}                
                />
            ))}
            {!loading && !existingVerses.length && (
				<p className="text-white p-2 text-center">Start your first verse!</p>
            )}
            {loading && (
                <div className="flex items-center justify-center m-10">
                    <PulseLoader color="#FFFFFF" size={6} />
                </div>
            )}
        </div>
    )
}

export default VersesList