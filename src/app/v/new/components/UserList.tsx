import UserItem from './UserItem'

interface Props {
    users: User[]
}

const UserList = ({ users }: Props) => {

    return (
        <div>
            <ul>
                {users.map(user => (
                    <UserItem key={user._id.toString()} id={user._id.toString()} name={user.name} image={user.image} />
                ))}
            </ul>
        </div>
    )
}

export default UserList