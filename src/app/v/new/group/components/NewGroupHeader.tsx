import Header from '@/app/components/Header'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi2'

const NewGroupHeader = () => {

    return (
        <Header>
            <div className="flex items-center justify-start gap-6">
                <Link href="/v">
                    <HiArrowLeft size={24} />
                    <span className="sr-only">Back to verse list</span>
                </Link>
                <div className="">
                    <h2 className="text-lg leading-6">New group</h2>
                    <p className="text-xs leading-3">Add participants</p>
                </div>
            </div>
        </Header>
    )
}

export default NewGroupHeader