'use client'

import { Dispatch, SetStateAction } from 'react'
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'

interface Props {
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchUser = ({ searchTerm, setSearchTerm }: Props) => {

    return (
        <div className="mb-4 border-b-2 border-gray-900 flex items-center gap-2">

            <label
                htmlFor="searchUser"
            >
                <HiMagnifyingGlass size={16} />
                <span className="sr-only">Search for user:</span>
            </label>
            <input
                id="searchUser"
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="text-white bg-transparent w-full p-2"
            />
            {searchTerm && (
                <button
                    className="text-red-500"
                    onClick={() => setSearchTerm('')}
                >
                    <HiXMark size={16} />
                </button>
            )}
        </div>
    )
}

export default SearchUser