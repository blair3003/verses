'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Oleo_Script_Swash_Caps } from 'next/font/google'
import { HiEllipsisVertical } from 'react-icons/hi2'
import VersesOptions from './VersesOptions'

const oleo = Oleo_Script_Swash_Caps({ weight: "400", subsets: ['latin'] })

const VersesHeader = () => {

    const toggleRef = useRef<null | HTMLButtonElement>(null)
    const optionsRef = useRef<null | HTMLElement>(null)
    const [toggled, setToggled] = useState(false)

    const listener = useCallback((e: MouseEvent | TouchEvent) => {
        if(
            !toggleRef.current
         || !optionsRef.current
         || toggleRef.current.contains(e.target as Node)
         || optionsRef.current.contains(e.target as Node)
        ) return   
        setToggled(false)
    }, [toggleRef, optionsRef])

    useEffect(() => {
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [])

    return (
        <header className="relative flex items-center justify-between p-6 border-b-2 border-cyan-500">
            <h1 className={`${oleo.className} text-white text-3xl`}>Verses</h1>

            <button
                ref={toggleRef}
                onClick={() => setToggled(toggled => !toggled)}
                className="text-white"
            >
                <HiEllipsisVertical size={32} />
            </button>

            <VersesOptions refProp={optionsRef} toggled={toggled} />

        </header>
    )
}

export default VersesHeader