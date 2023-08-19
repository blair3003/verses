import getAllUsers from '@/app/services/getAllUsers'
import NewVerseHeader from './components/NewVerseHeader'
import UserList from './components/UserList'

export default async function NewVerse() {

    const users = await getAllUsers()

	return (
		<>
			<NewVerseHeader userCount={users.length - 1} />
			<main>
				<UserList users={users} />	
			</main>
		</>
	)
}