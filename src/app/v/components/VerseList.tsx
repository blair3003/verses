'use client'

import { useState } from 'react'
import { VerseExpanded } from '../../models/Verse'

interface VerseListProps {
    initialVerses: VerseExpanded[]
}

const VerseList = ({ initialVerses }: VerseListProps) => {
    const [verses, setVerses] = useState(initialVerses)

    return (
        <div>VerseList</div>
    )
}

export default VerseList