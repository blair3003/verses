import Header from '@/app/components/Header'
import ProfilePic from '@/app/components/ProfilePic'
import getPartner from '@/app/services/getPartner'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi2'

interface Props {
    verse: VerseExpanded
}

const VerseHeader = async ({ verse }: Props) => {

    const options = [
        {
            url: '/user',
            title: 'View contact'
        }
    ]

    const groupOptions = [
        {
            url: '/group',
            title: 'View group details'
        }
    ]

    const partner = await getPartner(verse)

    return (
        <Header options={verse.group ? groupOptions : options}>
            <div className="flex items-center justify-start gap-4 max-w-xs">
                <Link href="/v" className="shrink-0">
                    <HiArrowLeft size={24} />
                    <span className="sr-only">Back to verse list</span>
                </Link>
                <ProfilePic name={verse.group ? verse.subject : partner?.name} image={verse.group ? '' : partner?.image} />
                <div className="grow overflow-hidden whitespace-nowrap">
                    <h2 className="text-lg leading-6 overflow-hidden whitespace-nowrap text-ellipsis">
                        {verse.group ? verse.subject : partner?.name}
                    </h2>
                    <p className="text-xs leading-3">
                        {verse.group ? 'Group' : 'Online'}
                    </p>
                </div>
            </div>
        </Header>
    )
}

export default VerseHeader