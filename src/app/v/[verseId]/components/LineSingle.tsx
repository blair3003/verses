import ProfilePic from '@/app/components/ProfilePic'
import { format } from 'date-fns'
import { HiCheck } from 'react-icons/hi2'

interface Props {
    line: Line
    user?: User
    isOwner?: boolean
    isGroup?: boolean
}

const LineSingle = ({ line, user, isOwner, isGroup }: Props) => {

    const { body, createdAt } = line

    return (
        <>
            <div className={`flex mb-2 gap-2 ${isOwner ? 'justify-end' : 'justify-start'}`}>
                {isGroup && !isOwner && (
                    <ProfilePic name={user?.name} image={user?.image} size="sm"/>
                )}
                <div className={`p-2 rounded-lg ${isOwner ? 'bg-cyan-800' : 'bg-gray-800'}`}>
                    {isGroup && !isOwner && (
                        <div className="text-cyan-500 text-base">
                            {user?.name}
                        </div>
                    )}
                    <div>
                        <div className="text-white text-base inline">
                            {body}
                        </div>
                        <div className="float-right mt-2 ml-1 flex items-center gap-1">
                            <div className="text-gray-300 text-xs">
                                {createdAt && format(createdAt, 'HH:mm')}
                            </div>
                            {isOwner && (
                                <div className={`${line.readIds?.length ? 'text-cyan-500' : 'text-gray-300'}`}>
                                    <HiCheck size={12} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default LineSingle