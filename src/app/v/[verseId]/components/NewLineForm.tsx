'use client'

import { useEffect, useRef, useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi2'

interface Props {
    verseId: string
}

const NewLineForm = ({ verseId }: Props) => {

    const inputRef = useRef<HTMLTextAreaElement | null>(null)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (inputRef?.current) inputRef.current.focus()
    }, [])

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.style.height = 'auto'
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
        }
    }, [inputValue])

    return (
        <div className="shrink-0">
            <form className="p-6">
                <div className="bg-gray-300 rounded-[32px] flex items-center justify-between p-2 gap-4">
                    <label
                        htmlFor="input"
                        className="sr-only"
                    >Enter a new line:</label>
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        id="input"
                        placeholder="Message"
                        rows={1}
                        className="bg-transparent text-gray-700 grow p-2 text-lg rounded-[22px]"
                    />
                    <button
                        className="rounded-full bg-cyan-500 text-white w-12 h-12 flex items-center justify-center self-end"
                    >
                        <HiPaperAirplane size={28} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewLineForm