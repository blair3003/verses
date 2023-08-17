import getAllUsers from '@/app/services/getAllUsers'
import NewVerseHeader from './components/NewVerseHeader'
import UsersList from './components/UsersList'

export default async function NewVerse() {

    const users = await getAllUsers()

	return (
		<>
			<NewVerseHeader userCount={users.length - 1} />
			<main>
				<UsersList users={users} />	
			</main>
		</>
	)
}