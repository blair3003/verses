import VerseList from './components/VerseList'
import getAllVerses from '../services/getAllVerses'

export default async function Verses() {

    const verses = await getAllVerses()

	return (
		<main>
			Verse list page

            <VerseList initialVerses={verses} />
		</main>
	)
}