import getSession from './getSession'

const getPartner = async (verse: VerseExpanded): Promise<User | null> => {

    const session = await getSession()
    if (!session) return null

    const userId = session.user.id    
    const partners = verse.users.filter(user => user._id.toString() !== userId )

    return partners[0]
}

export default getPartner