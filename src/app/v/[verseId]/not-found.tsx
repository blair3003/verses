import Link from 'next/link'
import { Oleo_Script_Swash_Caps } from 'next/font/google'

const oleo = Oleo_Script_Swash_Caps({ weight: "400", subsets: ['latin'] })

export default function NotFound() {

	return (
		<>
			<main className="p-6">
                <h2 className={`${oleo.className} text-white text-3xl pb-4`}>Not Found</h2>
                <p className="pb-4">Could not find this verse!</p>
                <Link href="/v">⬅ Back to verses list</Link>
			</main>
		</>
	)
}