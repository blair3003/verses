import Image from 'next/image'

interface Props {
    name?: string
    image?: string
    size?: 'sm' | 'md'
}

const ProfilePic = ({ name = '', image, size = 'md' }: Props) => {

    return (
        <div className={`relative rounded-full overflow-hidden shrink-0 ${size === 'md' ? 'h-10 w-10' : 'h-6 w-6'}`}>
            {image ? 
                <Image
                    alt={name}
                    src={image}
                    fill
                />
              : <div className="h-full flex items-center justify-center bg-cyan-800">{name[0].toUpperCase()}</div>
            }
        </div>
    )
}

export default ProfilePic