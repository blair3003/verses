'use client'

import { useState } from 'react'
import { VerseExpanded } from '../../models/Verse'

interface VerseListProps {
    initialVerses: VerseExpanded[]
}

const VersesList = ({ initialVerses }: VerseListProps) => {
    const [verses, setVerses] = useState(initialVerses)


    // type VerseExpanded = Document<any, any, any> & {
    //     userIds: Types.ObjectId[];
    //     latestLineId: Types.ObjectId;
    //     group: boolean;
    //     subject: string;
    // } & {
    //     users: User[];
    //     latestLine: Line;
    // }

    return (
        <div>VersesList</div>
    )
}

export default VersesList