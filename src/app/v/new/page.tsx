import getUsers from '@/app/services/getUsers'
import NewVerseHeader from './components/NewVerseHeader'
import UserList from './components/UserList'

export default async function NewVerse() {

    const users = await getUsers()

	return (
		<>
			<NewVerseHeader userCount={users.length} />
			<main>
				<UserList users={users} />	
			</main>
		</>
	)
}