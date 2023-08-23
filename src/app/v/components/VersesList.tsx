import VersesItem from './VersesItem'

interface VerseListProps {
    verses: VerseExpanded[]
}

const VersesList = ({ verses }: VerseListProps) => {



    return (
        <div>
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