interface Props {
    users: User[]
}

const UsersList = ({ users }: Props) => {

    return (
        <div>
            Users List

            <div>
                {users.map(user => (
                    <div key={user._id}>{user.name}</div>
                ))}
            </div>



        </div>
    )
}

export default UsersList