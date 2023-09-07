'use client'

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiArrowRight } from 'react-icons/hi2'

interface Props {
    users: User[]
}

const NewGroupForm = ({ users }: Props) => {

    const { register, handleSubmit } = useForm<FieldValues>()
    const [isLoading, setIsLoading] = useState(false)

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
                console.log(`creating a group with name: ${data.name}`)
                console.log(`creating a group with userIds: ${userIds}`)
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
                <div>
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
                    />

                </div>

                <div>
                    <div className="text-base text-gray-300">
                        Participants
                    </div>
                    {users?.map(user => (
                        <div key={user._id}>
                            <label
                                htmlFor={user._id}
                            >
                                {user.name}
                            </label>
                            <input
                                id={user._id}
                                type="checkbox"
                                {...register(user._id)}
                            />                    
                        </div>
                    ))}
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="fixed bottom-6 right-6 text-gray-950 bg-cyan-500 rounded-full p-2"
                >                
                    <HiArrowRight size={24} />
                    <span className="sr-only">New group</span>
                </button>
            </form>        
        </>
    )
}

export default NewGroupForm