'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'
import { PulseLoader } from 'react-spinners'

interface Props {
    verseId: string
}

const NewLineForm = ({ verseId }: Props) => {

    const { register, handleSubmit, setFocus, setValue, watch, formState } = useForm<FieldValues>()
    const { ref, ...rest } = register('newLine', { required: true })
    const newLineRef = useRef<HTMLTextAreaElement | null>(null)
    const newLineValue: string = watch('newLine')
    const { isSubmitting } = formState
    // const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setFocus('newLine')
    }, [setFocus])

    useEffect(() => {
        if (newLineRef?.current) {
            newLineRef.current.style.height = 'auto'
            newLineRef.current.style.height = `${newLineRef.current.scrollHeight}px`
        }
    }, [newLineValue])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(onSubmit)()
            
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            console.log('now loading...')

            const newLineResponse = await fetch('/api/lines', {
                method: 'POST',
                body: JSON.stringify({
                    verseId,
                    ...data
                })
            })
            if (!newLineResponse.ok) throw new Error('Failed to send new line') 

            setValue('newLine', '')


        } catch (err) {
            console.error(err)
        } finally {
            console.log('finished loading')
        }
    }

    return (
        <div className="shrink-0">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6"
            >
                <div className="bg-gray-300 rounded-[32px] flex items-center justify-between p-2 gap-4">
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
                        className="bg-transparent text-gray-700 grow p-2 text-lg rounded-[22px]"
                    />
                    <button
                        type="submit"
                        disabled={!newLineValue || isSubmitting}
                        className="rounded-full bg-cyan-500 text-white w-12 h-12 flex items-center justify-center self-end"
                    >
                        {!isSubmitting && <HiPaperAirplane size={28} />}
                        <PulseLoader loading={isSubmitting} color="#FFFFFF" size={6} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewLineForm