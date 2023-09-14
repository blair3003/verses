import ProfileForm from './components/ProfileForm'
import SettingsHeader from './components/SettingsHeader'
import getProfile from '../services/getProfile'

export default async function Settings() {

    const profile = await getProfile()

    console.log(profile)

	return (
		<>
			<SettingsHeader />
			<main>
                {profile && (
                    <div className="p-6">
                        <div className="text-base text-gray-300 mb-4">
                            Profile
                        </div>
                        <ProfileForm profile={profile} />
                    </div>
                )}
			</main>
		</>
	)
}