import { useState } from 'react'
import { Verse } from '../models/verse'
import { Line } from '../models/line'
import { User } from '../models/user'

interface VerseListProps {
    initialVerses: (Verse & {
        otherUser: User
        latestLine: Line
    })[]
}

const VerseList = ({ initialVerses }: VerseListProps) => {
    const [verses, setVerses] = useState(initialVerses)
}

export default VerseList