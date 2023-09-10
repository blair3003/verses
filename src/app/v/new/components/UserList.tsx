'use client'

import { useState } from 'react'
import UserItem from './UserItem'
import SearchUser from './SearchUser'

interface Props {
    users: User[]
}

const UserList = ({ users }: Props) => {

    const [searchTerm, setSearchTerm] = useState('')
    const filteredUsers = searchTerm ? users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users

    return (
        <div className="px-6">
            <div className="text-base text-gray-300 mb-4">
                Contacts
            </div>
            <SearchUser searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <ul>
                {filteredUsers.map(user => (
                    <UserItem key={user._id} user={user} />
                ))}
            </ul>
        </div>
    )
}

export default UserList