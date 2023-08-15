import getVerse from '@/app/services/getVerse'

interface VerseProps {
    params: {
        verseId: string
    }
}

export default async function Verse({ params: { verseId } }: VerseProps) {

    const verse = await getVerse(verseId)

    return (
		<>
			<header>Verse page</header>
			<main>
				Lines go here
                Send line form...
			</main>
		</>
    )

}