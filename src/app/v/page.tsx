import getVerses from '../services/getVerses'
import VersesList from './components/VersesList'
import VersesHeader from './components/VersesHeader'
import NewVerseLink from './components/NewVerseLink'

export default async function Verses() {

    const verses = await getVerses()

	return (
		<>
			<VersesHeader />
			<main>
				<VersesList initialVerses={verses} />
				<NewVerseLink />				
			</main>
		</>
	)
}