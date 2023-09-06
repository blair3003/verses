'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const RegistrationForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {

        try {
            setIsLoading(true)

            const newUser = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            if (!newUser.ok) throw new Error('Failed to register...')

            signIn('credentials', data)
        } catch (err) {
            console.error('Failed to register...')
        } finally {
            setIsLoading(false)
        }

    } 

    return (
        <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label
                    className=""
                    htmlFor="name"
                >
                    Name:
                </label>
                <div className="">
                    <input
                        id="name"
                        type="text"
                        disabled={isLoading}
                        {...register("name", { required: true })}
                        className=""
                    />
                </div>
            </div>
            <div>
                <label
                    className=""
                    htmlFor="email"
                >
                    Email:
                </label>
                <div className="">
                    <input
                        id="email"
                        type="email"
                        disabled={isLoading}
                        {...register("email", { required: true })}
                        className=""
                    />
                </div>
            </div>
            <div>
                <label
                    className=""
                    htmlFor="password"
                >
                    Password:
                </label>
                <div className="">
                    <input
                        id="password"
                        type="password"
                        disabled={isLoading}
                        {...register("password", { required: true })}
                        className=""
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className=""
            >
                Register
            </button>
        </form>
    )
}

export default RegistrationForm