import { Oleo_Script_Swash_Caps } from 'next/font/google'
import Header from '@/app/components/Header'

const oleo = Oleo_Script_Swash_Caps({ weight: "400", subsets: ['latin'] })

const VersesHeader = () => {

    const options = [
        {
            url: '/v/new',
            title: 'New verse'
        }, {
            url: '/v/group',
            title: 'New group'
        }, {
            url: '/settings',
            title: 'Settings'
        }
    ]

    return (
        <Header options={options}>
            <h1 className={`${oleo.className} text-white text-3xl`}>Verses</h1>
        </Header>
    )
}

export default VersesHeader