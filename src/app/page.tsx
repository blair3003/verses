import { redirect } from 'next/navigation'
import getSession from './services/getSession'

import Account from './models/Account'
import User from './models/User'
import dbConnect from '@/lib/dbConnect'

export default async function Home() {

	await dbConnect()

	const accountsWithUser = await Account.find().populate('userId').exec()
	



	const session = await getSession()
	if (!session) redirect('/api/auth/signin')

	return (
		<main>
			Accounts:
			<ul>
				{accountsWithUser.map(account => (
					<li key={account._id}>{JSON.stringify(account.userId)}</li>
				))}
			</ul>

		</main>
	)
}
