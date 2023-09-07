import Link from 'next/link'
import { HiUsers } from 'react-icons/hi2'

const NewGroupLink = () => {

    return (
        <Link
            href="/v/new/group"
            className="p-6 flex items-center gap-4"
        >
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-cyan-500 text-white">
                <HiUsers size={24} />
            </div>
            <div className="text-lg">
                New group
            </div>
        </Link>
    )
}

export default NewGroupLink