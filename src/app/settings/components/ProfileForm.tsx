'use client'

import { useSession } from 'next-auth/react'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiUserCircle } from 'react-icons/hi2'
import { PulseLoader } from 'react-spinners'

const ProfileForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [profile, setProfile] = useState({
        _id: '',
        name: '',
        email: '',
        image: '',
    })
    const [profileImage, setProfileImage] = useState('')

    const { update } = useSession()

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            password: '',
        }
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile')
                const data = await res.json()
                if (data) {
                    setProfile({
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        image: data.image,
                    })
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        setValue('name', profile.name)
        setValue('email', profile.email)
        setProfileImage(profile.image)
    }, [profile])

    useEffect(() => {
        setValue('image', profileImage)
    }, [profileImage])

    const onUpload = (result: any) => {
        if (result?.info?.secure_url) {
            setProfileImage(result.info.secure_url)
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        try {
            setIsLoading(true)
            const updateProfile = await fetch('/api/profile', {
                method: 'POST',
                body: JSON.stringify({
                    id: profile._id,
                    ...data
                })
            })
            if (!updateProfile.ok) throw new Error('Failed to update profile...')
            await update({ ...data })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return profile?._id && (
        <form
            className=""
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="mb-4">
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
                        {...register("name", { required: true })}
                        className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="sr-only"
                    htmlFor="email"
                >
                    Email:
                </label>
                <div className="">
                    <input
                        id="email"
                        type="text"
                        disabled={isLoading}
                        {...register("email", { required: true })}
                        className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="sr-only"
                    htmlFor="password"
                >
                    Password:
                </label>
                <div className="">
                    <input
                        id="password"
                        type="text"
                        disabled={isLoading}
                        placeholder="Change Password"
                        {...register("password")}
                        className="text-white bg-transparent border-b-2 border-gray-900 w-full p-2"
                    />
                </div>
            </div>

            <div className="mb-4">
                <div className="sr-only">
                    Image:
                </div>
                <CldUploadButton
                    className=""
                    options={{ maxFiles: 1 }}
                    onUpload={onUpload}
                    uploadPreset="djxbt22a"
                >
                    {profileImage ? (
                        <Image
                            src={profileImage}
                            alt={profile.name ?? 'Default'}
                            width={150}
                            height={150}
                            className="rounded-full cursor-pointer shadow"                 
                        />
                    ) : (
                        <HiUserCircle size={150} />
                    )}
                    <span className="sr-only">Upload an image</span>
                </CldUploadButton>
                <input type="hidden" id="image" {...register("image")} />
            </div>            

            <button
                type="submit"
                disabled={isLoading}
                className="bg-cyan-800 text-white p-2 rounded float-right w-20 h-10"
            >
                {isLoading ? (
                    <>
                        <PulseLoader loading={isLoading} color="#FFFFFF" size={6} />
                        <span className="sr-only">Updating</span>
                    </>
                ) : 'Update' }
            </button>

        </form>
    )

}

export default ProfileForm