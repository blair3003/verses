import getVerse from '@/app/services/getVerse'
import VerseHeader from './components/VerseHeader'
import { notFound } from 'next/navigation'

interface VerseProps {
    params: {
        verseId: string
    }
}

export default async function Verse({ params: { verseId } }: VerseProps) {

    const verse = await getVerse(verseId)
    if (!verse) notFound()

	return (
		<>
			<VerseHeader group={verse.group} subject={verse.subject} users={verse.users} />
			<main>
				Lines and form	
			</main>
		</>
	)

}