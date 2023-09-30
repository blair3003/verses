import { redirect } from 'next/navigation'
import VersesList from './components/VersesList'
import VersesHeader from './components/VersesHeader'
import NewVerseLink from './components/NewVerseLink'
import getSession from '../services/getSession'

export default async function Verses() {

	const session = await getSession()
	if (!session?.user.id) redirect('/')

	return (
		<>
			<VersesHeader />
			<main>
				<VersesList userId={session.user.id}/>
				<NewVerseLink />				
			</main>
		</>
	)
}