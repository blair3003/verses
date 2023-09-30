import Link from 'next/link'
import { Oleo_Script_Swash_Caps } from 'next/font/google'

const oleo = Oleo_Script_Swash_Caps({ weight: "400", subsets: ['latin'] })

export default async function Home() {

	return (
		<main>
			<div className="flex flex-col items-center justify-center gap-4 h-screen">
				<h1 className={`${oleo.className} text-white text-3xl`}>Verses</h1>
				<Link
					href="/v"
					className="bg-cyan-800 text-white p-2 rounded text-center w-20 h-10"
				>Sign in</Link>
				<Link
					href="/register"
					className="bg-cyan-800 text-white p-2 rounded text-center w-20 h-10"
				>Register</Link>
			</div>
		</main>
	)
}
