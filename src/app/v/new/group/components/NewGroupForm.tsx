'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiArrowRight } from 'react-icons/hi2'
import { useSession } from 'next-auth/react'
import ProfilePic from '@/app/components/ProfilePic'
import { PulseLoader } from 'react-spinners'
import SearchUser from '../../components/SearchUser'

interface Props {
    users: User[]
}

const NewGroupForm = ({ users }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    const { update } = useSession()
    const { register, handleSubmit, reset } = useForm<FieldValues>()

    const filteredUsers = searchTerm ? users.filter(user => user.name?.toLowerCase().includes(searchTerm.toLowerCase())) : users

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        
        try {
            setIsLoading(true)

            const userIds = []
            for (const key in data) {
                if (data.hasOwnProperty(key) && data[key] === true) {
                    userIds.push(key)
                }
            }

            if (userIds.length) {
                const group = await fetch('/api/groups', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: data.name,
                        userIds
                    })
                })

                const verseId = await group.json()
                if (verseId) {
                    await update({ verseIds: [verseId] })
                    router.push(`/v/${verseId}`)
                }
            }

        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="sr-only"
                    >
                        Group name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Group name"
                        {...register('name', { required: true })}
                        className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                    />
                </div>

                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-base text-gray-300">
                            Participants
                        </div>
                        {/* <button
                            onClick={() => reset()}
                            className="text-gray-950 text-sm bg-gray-300 rounded-full px-2"
                        >
                            clear                            
                        </button> */}
                    </div>
                    <SearchUser searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    {filteredUsers?.map(user => (
                        <div
                            key={user._id}
                            className="flex items-center justify-between mb-6"
                        >
                            <label
                                htmlFor={user._id}
                                className="flex items-center justify-start gap-4"
                            >
                                <ProfilePic name={user.name} image={user.image} />
                                <div className="text-lg grow overflow-hidden whitespace-nowrap">
                                    {user.name}
                                </div>                            
                            </label>     
                            <input
                                id={user._id}
                                type="checkbox"
                                {...register(user._id)}
                                className="accent-cyan-500"
                            />               
                        </div>
                    ))}
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="fixed bottom-6 right-6 rounded-full bg-cyan-500 text-gray-950 w-12 h-12 flex items-center justify-center"
                >
                    {!isLoading && <HiArrowRight size={28} />}
                    <PulseLoader loading={isLoading} color="#FFFFFF" size={6} />                
                    
                    <span className="sr-only">New group</span>
                </button>
            </form>        
        </>
    )
}

export default NewGroupForm