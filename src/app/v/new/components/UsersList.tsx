import { User } from '@/app/models/User'

interface Props {
    users: User[]
}

const UsersList = ({ users }: Props) => {

    return (
        <div>Users List</div>
    )
}

export default UsersList