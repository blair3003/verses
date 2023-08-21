import getVerse from '@/app/services/getVerse'
import VerseHeader from './components/VerseHeader'
import { notFound } from 'next/navigation'
import Lines from './components/Lines'
import NewLineForm from './components/NewLineForm'
import getSession from '@/app/services/getSession'

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
			<main className="grow flex flex-col">
				<Lines lines={verse.lines} />
				<NewLineForm verseId={verseId} />
			</main>
		</>
	)

}