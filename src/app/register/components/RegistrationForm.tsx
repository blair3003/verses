'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Oleo_Script_Swash_Caps } from 'next/font/google'

const oleo = Oleo_Script_Swash_Caps({ weight: "400", subsets: ['latin'] })

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
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
            <h1 className={`${oleo.className} text-white text-3xl`}>Register</h1>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label
                        className="sr-only"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <div className="">
                        <input
                            id="name"
                            type="text"
                            disabled={isLoading}
                            placeholder="Username"
                            {...register("name", { required: true })}
                            className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                        />
                    </div>
                </div>
                <div>
                    <label
                        className="sr-only"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <div className="">
                        <input
                            id="email"
                            type="email"
                            disabled={isLoading}
                            placeholder="Email"
                            {...register("email", { required: true })}
                            className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                        />
                    </div>
                </div>
                <div>
                    <label
                        className="sr-only"
                        htmlFor="password"
                    >
                        Password:
                    </label>
                    <div className="">
                        <input
                            id="password"
                            type="password"
                            disabled={isLoading}
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-cyan-800 text-white p-2 rounded text-center float-right w-20 h-10"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegistrationForm