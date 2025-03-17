import "../styles/global.css"

interface TitleProps {
    title: string;
    description: string;
}

export default function Title({title, description}: TitleProps) {

    return (
    <div className="flex flex-col justify-center items-center">
        <p className="md:text-2xl text-lg text-[#b3b3b3] mb-4">{title}</p>
        <h1 className="md:text-5xl text-2xl md:mb-16 mb-8 text-center">{description}</h1>
    </div>
    )

}