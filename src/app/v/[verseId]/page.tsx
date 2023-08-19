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
			<VerseHeader verse={verse} />
			<main>
				Lines and form	
			</main>
		</>
	)

}