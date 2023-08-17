import Header from '@/app/components/Header'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi2'

interface Props {
    userCount: number
}

const NewVerseHeader = ({ userCount }: Props) => {

    const options = [
        {
            url: '/v/group',
            title: 'New group'
        }
    ]

    return (
        <Header options={options}>
            <div className="flex items-center justify-start gap-6">
                <Link href="/v">
                    <HiArrowLeft size={24} />
                    <span className="sr-only">Back to verse list</span>
                </Link>
                <div className="">
                    <h2 className="text-lg leading-6">Select user</h2>
                    <p className="text-xs leading-3">{userCount} user{userCount !== 1 ? 's' : ''}</p>
                </div>
            </div>
        </Header>
    )
}

export default NewVerseHeader