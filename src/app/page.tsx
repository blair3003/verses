import { redirect } from 'next/navigation'
import getSession from './services/getSession'

export default async function Home() {

	const session = await getSession()
	if (!session) redirect('/api/auth/signin')

	return (
		<main>
			main

		</main>
	)
}
