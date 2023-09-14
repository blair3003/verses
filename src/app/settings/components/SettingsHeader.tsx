import Header from '@/app/components/Header'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi2'

const SettingsHeader = () => {

    return (
        <Header>
            <div className="flex items-center justify-start gap-6">
                <Link href="/v">
                    <HiArrowLeft size={24} />
                    <span className="sr-only">Back to verse list</span>
                </Link>
                <h2 className="text-lg leading-6">Settings</h2>
            </div>
        </Header>
    )
}

export default SettingsHeader