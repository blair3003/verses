import verse, { Verse } from '@/app/models/Verse'
import dbConnect from '@/lib/dbConnect'

const getAllVerses = async (): Promise<Verse[]> => {

    await dbConnect()

    const verses: Verse[] = await verse.find()

    return verses
}

export default getAllVerses