import { format } from 'date-fns'

interface Props {
    line: Line
}

const LineSingle = ({ line }: Props) => {

    const { userId, verseId, body, media, readIds, createdAt } = line

    return (
        <>
            <div className="flex justify-end mb-2">
                <div className="bg-cyan-800 p-2 rounded-lg">
                    <div className="text-white text-base inline">
                        {body}
                    </div>
                    <div className="text-gray-300 text-xs float-right mt-2 ml-1">
                        {format(createdAt, 'HH:mm')}
                    </div>
                </div>
            </div>
            <div className="flex justify-start mb-2">
                <div className="bg-gray-800 p-2 rounded-lg">
                    <div className="text-white text-base inline">
                        {body}
                    </div>
                    <div className="text-gray-300 text-xs float-right mt-2 ml-1">
                        {format(createdAt, 'HH:mm')}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mb-2">
                <div className="bg-cyan-800 p-2 rounded-lg">
                    <div className="text-white text-base inline">
                        {body}
                    </div>
                    <div className="text-gray-300 text-xs float-right mt-2 ml-1">
                        {format(createdAt, 'HH:mm')}
                    </div>
                </div>
            </div>
            <div className="flex justify-start mb-2">
                <div className="bg-gray-800 p-2 rounded-lg">
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