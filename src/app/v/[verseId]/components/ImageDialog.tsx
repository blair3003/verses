'use client'

import Image from 'next/image'
import { useEffect, useRef, Dispatch, SetStateAction, useCallback } from 'react'
import { HiXMark } from 'react-icons/hi2'

interface Props {
    image?: string
    setImage: Dispatch<SetStateAction<string>>
}

const ImageDialog = ({ image, setImage }: Props) => {

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (image) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [image])

    return (
        <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-lg backdrop:bg-gray-950/50 shadow-xl">
            {image && (
                <Image
                    alt='Image'
                    src={image}
                    height={500}
                    width={500}
                    className="cursor-pointer"
                />
            )}
            <button
                type="button"
                onClick={() => setImage('')}
                className="absolute rounded-full text-gray-950 bg-white/50 top-4 right-4 shadow"
            >
                <HiXMark size={24} />                                
            </button>
        </dialog>
    )
}

export default ImageDialog