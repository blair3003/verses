import ProfileForm from './components/ProfileForm'
import SettingsHeader from './components/SettingsHeader'

export default async function Settings() {

	return (
		<>
			<SettingsHeader />
			<main>
                <ProfileForm />
			</main>
		</>
	)
}