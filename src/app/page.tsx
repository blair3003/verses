import Link from 'next/link'

export default async function Home() {

	return (
		<main>
			<div className="flex flex-col items-center justify-center gap-4 h-screen">
				<Link
					href="/v"
				>Verses</Link>
			</div>
		</main>
	)
}
