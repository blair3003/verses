import LineSingle from './LineSingle'

interface Props {
    lines: Line[]
}

const Lines = ({ lines }: Props) => {

    return (
        <div className="grow flex flex-col p-6 overflow-y-auto basis-0">
            {lines.map(line => (
                <LineSingle key={line._id} line={line} />
            ))}
        </div>
    )
}

export default Lines