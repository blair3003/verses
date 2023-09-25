import { redirect } from 'next/navigation'
import getVerses from '../services/getVerses'
import VersesList from './components/VersesList'
import VersesHeader from './components/VersesHeader'
import NewVerseLink from './components/NewVerseLink'
import getSession from '../services/getSession'

export const dynamic = 'force-dynamic'

export default async function Verses() {

	const session = await getSession()
	if (!session?.user.id) redirect('/login')

    const verses = await getVerses()

	return (
		<>
			<VersesHeader />
			<main>
				<VersesList verses={verses} userId={session.user.id}/>
				<NewVerseLink />				
			</main>
		</>
	)
}