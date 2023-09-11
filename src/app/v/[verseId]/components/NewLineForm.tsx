'use client'

import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPaperClip, HiXMark } from 'react-icons/hi2'
import { PulseLoader } from 'react-spinners'

interface Props {
    verseId: string
}

const NewLineForm = ({ verseId }: Props) => {

    const [media, setMedia] = useState('')
    const { register, handleSubmit, setFocus, setValue, watch, formState } = useForm<FieldValues>()
    const { ref, ...rest } = register('newLine', { required: false })
    const newLineRef = useRef<HTMLTextAreaElement | null>(null)
    const newLineValue: string = watch('newLine')
    const { isSubmitting } = formState

    useEffect(() => {
        setFocus('newLine')
    }, [setFocus])

    useEffect(() => {
        if (newLineRef?.current) {
            newLineRef.current.style.height = 'auto'
            newLineRef.current.style.height = `${newLineRef.current.scrollHeight}px`
        }
    }, [newLineValue])

    useEffect(() => {
        setValue('media', media)
    }, [media])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(onSubmit)()            
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!newLineValue && !media) return
        try {        
            const newLine = await fetch('/api/lines', {
                method: 'POST',
                body: JSON.stringify({
                    verseId,
                    ...data
                })
            })
            if (!newLine.ok) throw new Error('Failed to send new line')
            setValue('newLine', '')
            setMedia('')
        } catch (err) {
            console.error(err)
        }
    }

    const onUpload = (result: any) => {
        if (result?.info?.secure_url) {
            setMedia(result.info.secure_url)
        }
    }

    return (
        <div className="p-6 shrink-0">
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="bg-gray-300 rounded-[32px]">
                    {media && (
                        <div className="p-4 relative">
                            <Image
                                alt='File upload'
                                src={media}
                                height={500}
                                width={500}
                                className="rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setMedia('')}
                                className="absolute rounded-full text-gray-950 bg-white/50 bottom-6 right-6"
                            >
                                <HiXMark size={24} />                                
                            </button>
                        </div>
                    )}
                    <div className="flex items-center justify-between p-2 gap-1">
                        <div className="grow flex">
                            <label
                                htmlFor="newLine"
                                className="sr-only"
                            >Enter a new line:</label>
                            <textarea
                                {...rest}
                                ref={e => {
                                    ref(e)
                                    newLineRef.current = e
                                }}
                                onKeyDown={handleKeyDown}
                                readOnly={isSubmitting}
                                id="newLine"
                                placeholder="Message"
                                rows={1}
                                className="bg-transparent text-gray-700 text-lg rounded-[22px] w-full p-2"
                            />
                        </div>
                        <input type="hidden" {...register('media')}/>
                        <CldUploadButton
                            className="text-gray-700 w-12 h-12 flex items-center justify-center self-end shrink-0"
                            options={{ maxFiles: 1 }}
                            onUpload={onUpload}
                            uploadPreset="djxbt22a"
                        >
                            <HiPaperClip size={28} />
                            <span className="sr-only">Upload file</span>
                        </CldUploadButton>
                        <button
                            type="submit"
                            disabled={(!newLineValue && !media) || isSubmitting}
                            className="rounded-full bg-cyan-500 text-white w-12 h-12 flex items-center justify-center self-end shrink-0"
                        >
                            <span className="sr-only">Submit line</span>
                            {!isSubmitting && <HiPaperAirplane size={28} />}
                            <PulseLoader loading={isSubmitting} color="#FFFFFF" size={6} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewLineForm