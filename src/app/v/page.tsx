import VerseList from './components/VerseList'
import getVerses from '../services/getVerses'

export default async function Verses() {

    const verses = await getVerses()

	return (
		<>
			<header>Verses list page</header>
			<main>
				<VerseList initialVerses={verses} />
			</main>
		</>
	)
}