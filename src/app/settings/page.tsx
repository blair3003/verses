import ProfileForm from './components/ProfileForm'
import SettingsHeader from './components/SettingsHeader'

export default async function Settings() {

	return (
		<>
			<SettingsHeader />
			<main>
                <div className="p-6">
                    <div className="text-base text-gray-300 mb-4">
                        Profile
                    </div>
                    <ProfileForm />
                </div>
			</main>
		</>
	)
}