import UserItem from './UserItem'

interface Props {
    users: User[]
}

const UserList = ({ users }: Props) => {

    return (
        <div className="p-6">
            <ul>
                {users.map(user => (
                    <UserItem key={user._id} user={user} />
                ))}
            </ul>
        </div>
    )
}

export default UserList