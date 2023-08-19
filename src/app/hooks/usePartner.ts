import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

const usePartner = (verse: VerseExpanded) => {

    const session = useSession()

    const partner = useMemo(() => {
        const userId = session.data?.user.id
        const partners = verse.users.filter(user => user._id !== userId)
        return partners[0]
    }, [session, verse])

    return partner
}

export default usePartner