import UserItem from './UserItem'

interface Props {
    users: User[]
}

const UserList = ({ users }: Props) => {

    return (
        <div className="px-6">
            <div className="text-base text-gray-300 mb-4">
                Contacts
            </div>
            <ul>
                {users.map(user => (
                    <UserItem key={user._id} user={user} />
                ))}
            </ul>
        </div>
    )
}

export default UserList