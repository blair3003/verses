'use client'

import Link from 'next/link'
import { MutableRefObject } from 'react'

interface Props {
    refProp: MutableRefObject<HTMLElement | null>
    toggled: boolean
}

const VersesOptions = ({ refProp, toggled }: Props) => {

    return (
        <nav
            ref={refProp}
            className={`absolute top-3/4 bg-gray-900 text-white p-4 rounded-md ${toggled ? 'right-6' : 'left-[-9999px]'}`}
        >
            <ul className="flex flex-col gap-4">
                <li>
                    <Link href="/new">New verse</Link>
                </li>
                <li>
                    <Link href="/group">New group</Link>
                </li>
                <li>
                    <Link href="/settings">Settings</Link>
                </li>            
            </ul>
        </nav>
    )

}

export default VersesOptions