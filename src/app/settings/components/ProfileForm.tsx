'use client'

import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiUserCircle } from 'react-icons/hi2'

interface Props {
    profile: User
}

const ProfileForm = ({ profile }: Props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(profile.image)

    useEffect(() => {
        setValue('image', profileImage)
    }, [profileImage])

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            name: profile?.name,
            email: profile?.email,
            image: profile?.image,
            password: '',
        }
    })

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
            if (!updateProfile.ok) throw new Error('Failed to register...')
            
            //update token

        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            className=""
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="">
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
                        {...register("name")}
                        className="bg-transparent text-white"
                    />
                </div>
            </div>

            <div className="">
                <label
                    className=""
                    htmlFor="email"
                >
                    Email:
                </label>
                <div className="">
                    <input
                        id="email"
                        type="text"
                        disabled={isLoading}
                        {...register("email")}
                        className="bg-transparent text-white"
                    />
                </div>
            </div>

            <div className="">
                <label
                    className=""
                    htmlFor="password"
                >
                    Password:
                </label>
                <div className="">
                    <input
                        id="password"
                        type="text"
                        disabled={isLoading}
                        {...register("password")}
                        className="bg-transparent text-white"
                    />
                </div>
            </div>

            <div className="">
                <div className="">
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
                            className="rounded-full"                 
                        />
                    ) : (
                        <HiUserCircle size={28} />
                    )}
                    <span className="sr-only">Upload an image</span>
                </CldUploadButton>
                <input type="hidden" id="image" {...register("image")} />
            </div>            

            <button
                type="submit"
                disabled={isLoading}
                className="bg-cyan-800 text-white p-2 rounded"
            >
                Update
            </button>

        </form>
    )
}

export default ProfileForm