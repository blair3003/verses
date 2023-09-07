import getUsers from '@/app/services/getUsers'
import NewGroupHeader from './components/NewGroupHeader'
import NewGroupForm from './components/NewGroupForm'

export default async function NewGroup() {

    const users = await getUsers()

	return (
		<>
			<NewGroupHeader />
			<main>
				<NewGroupForm users={users} />
			</main>
		</>
	)
}