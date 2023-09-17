import getSession from './getSession'

const getProfile = async () => {

    const session = await getSession()
    if (!session) return null

    return ({
        _id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
    })
}

export default getProfile