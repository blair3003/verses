import getVerse from '@/app/services/getVerse'
import VerseHeader from './components/VerseHeader'
import { notFound, redirect } from 'next/navigation'
import Lines from './components/Lines'
import NewLineForm from './components/NewLineForm'
import getSession from '@/app/services/getSession'

interface VerseProps {
    params: {
        verseId: string
    }
}

export default async function Verse({ params: { verseId } }: VerseProps) {

	// Below only works if token is refreshed after creating new verse
	const session = await getSession()
    if (!session?.user.verseIds?.includes(verseId)) redirect('/v')

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