import getUsers from '@/app/services/getUsers'
import NewVerseHeader from './components/NewVerseHeader'
import UserList from './components/UserList'
import NewGroupLink from './components/NewGroupLink'

export default async function NewVerse() {

    const users = await getUsers()

	return (
		<>
			<NewVerseHeader userCount={users.length} />
			<main>
				<NewGroupLink />
				<UserList users={users} />	
			</main>
		</>
	)
}