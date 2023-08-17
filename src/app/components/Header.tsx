'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import Link from 'next/link'

interface Props {
    children: React.ReactNode
    options?: {
        url: string
        title: string
    }[]
}

const Header = ({ children, options }: Props) => {

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
            {children}

            {options?.length &&
                <>
                    <button
                        ref={toggleRef}
                        onClick={() => setToggled(toggled => !toggled)}
                        className="text-white"
                    >
                        <HiEllipsisVertical size={32} />
                        <span className="sr-only">Options</span>
                    </button>
                    
                    <nav
                        ref={optionsRef}
                        className={`absolute top-3/4 right-6 bg-gray-900 text-white overflow-hidden rounded-md transition-max-height duration-500 ${toggled ? 'max-h-screen' : 'max-h-0'}`}
                    >
                        <ul className="flex flex-col gap-4 p-4">
                            {options.map(option => (
                                <li>
                                    <Link key={option.title} href={option.url}>{option.title}</Link>
                                </li>
                            ))}         
                        </ul>
                    </nav>
                </>
            }

        </header>
    )
}

export default Header