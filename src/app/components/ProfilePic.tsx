import Image from 'next/image'

interface Props {
    name: string
    image?: string
}

const ProfilePic = ({ name, image }: Props) => {

    return (
        <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0">
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