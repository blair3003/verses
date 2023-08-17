import Header from '@/app/components/Header'
import { User } from '@/app/models/User'

interface Props {
    group: boolean
    subject: string
    users: User[]
}

const VerseHeader = ({ group, subject, users }: Props) => {

    const options = [
        {
            url: '/user',
            title: 'View contact'
        }
    ]

    return (
        <Header options={options}>
            <div className="flex items-center justify-start">
                <div>
                    Display pic
                </div>
                <div>
                    <div>User name or subject</div>
                    <div>Status</div>                    
                </div>
            </div>
        </Header>
    )
}

export default VerseHeader