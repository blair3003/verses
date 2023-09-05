import VersesItem from './VersesItem'

interface VerseListProps {
    verses: VerseExpanded[]
}

const VersesList = ({ verses }: VerseListProps) => {

    return (
        <div className="p-6">
            {verses.map(verse => (
                <VersesItem
                    key={verse._id}
                    verse={verse}                
                />
            ))}
        </div>
    )
}

export default VersesList