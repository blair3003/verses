import { format } from 'date-fns'

interface Props {
    line: Line,
    isOwner?: boolean
}

const LineSingle = ({ line, isOwner }: Props) => {

    const { body, createdAt } = line

    return (
        <>
            <div className={`flex mb-2 ${isOwner ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg ${isOwner ? 'bg-cyan-800' : 'bg-gray-800'}`}>
                    <div className="text-white text-base inline">
                        {body}
                    </div>
                    <div className="text-gray-300 text-xs float-right mt-2 ml-1">
                        {format(createdAt, 'HH:mm')}
                    </div>
                </div>
            </div>
        </>
    )
} 

export default LineSingle