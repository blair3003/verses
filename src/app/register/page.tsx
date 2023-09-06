import { redirect } from 'next/navigation';
import getSession from '../services/getSession';
import RegistrationForm from './components/RegistrationForm';

export default async function Register() {

    const session = await getSession()
	if (session) redirect('/v')

	return (
		<>
			<main>
				<RegistrationForm />			
			</main>
		</>
	)
}