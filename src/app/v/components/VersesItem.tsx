import Link from 'next/link'
import { format, isToday, isYesterday } from 'date-fns'
import ProfilePic from '@/app/components/ProfilePic'

interface Props {
    verse: VerseExpanded
}

const VersesItem = ({ verse }: Props) => {

    return (
        <Link
            className="flex items-center justify-between gap-4 mb-4"
            href={`/v/${verse._id}`}
        >                
            <ProfilePic name={verse.group ? verse.subject : verse.users[0].name} image={verse.group ? '' : verse.users[0]?.image} />
            <div className="grow overflow-hidden">
                <div className="flex align-start justify-between">
                    <div className="">
                        {verse.group ? verse.subject : verse.users[0].name}
                    </div>
                    <div className="text-sm text-gray-300">
                        {verse.latestLine?.createdAt && (
                            isToday(verse.latestLine.createdAt) ? format(verse.latestLine.createdAt, 'HH:mm') :
                            isYesterday(verse.latestLine.createdAt) ? 'Yesterday' :
                            format(new Date(verse.latestLine.createdAt), 'dd/MM/yyyy')
                        )}
                    </div>
                </div>
                <div className="text-sm text-gray-300 overflow-hidden whitespace-nowrap text-ellipsis">
                    {verse.latestLine?.body}
                </div>
            </div>
        </Link>
    )
}

export default VersesItem