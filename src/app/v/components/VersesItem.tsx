import Link from 'next/link'

interface Props {
    verse: VerseExpanded
}

const VersesItem = ({ verse }: Props) => {

    return (
        <div>
            <Link href={`/v/${verse._id}`}>
                {verse.users[0].name}
                {verse.latestLine?.body}
            </Link>
            
        </div>
    )
}

export default VersesItem