import Link from 'next/link'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

const NewVerseLink = () => {

    return (
        <Link
            href="/new"
            className="fixed bottom-6 right-6 text-gray-950 bg-cyan-500 rounded-full p-2"
        >
            <HiChatBubbleLeftRight size={32} />
            <span className="sr-only">New Verse</span>
        </Link>
    )
}

export default NewVerseLink