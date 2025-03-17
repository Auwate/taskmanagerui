import "../styles/global.css"

import Link from "next/link";
import Image from "next/image";

interface CardProps {
    title: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    link: string;
}

export default function Card({title, description, image1, image2, image3, link}: CardProps) {

    return (
    <Link target="_blank" href={link} className="md:h-[380px] min-w-[210px] h-[320px] hover:shadow-md cursor-pointer transition all 300ms ease-in flex flex-col items-center space-y-8 border border-solid p-8 rounded-2xl">
        <div className="flex lg:space-x-8 space-x-4 md:w-[200px] mb-4 p-4 items-center justify-center">
            <Image
            src={image1}
            alt="Logo of a project dependency"
            height={0}
            width={0}
            className="h-[32px] w-[32px] lg:h-[48px] lg:w-[48px]  xl:h-[72px] xl:w-[72px]"
            />
            <Image
            src={image2}
            alt="Logo of a project dependency"
            height={0}
            width={0}
            className="h-[32px] w-[32px] lg:h-[48px] lg:w-[48px] xl:h-[72px] xl:w-[72px]"
            />
            <Image
            src={image3}
            alt="Logo of a project dependency"
            height={0}
            width={0}
            className="h-[32px] w-[32px] lg:h-[48px] lg:w-[48px] xl:h-[72px] xl:w-[72px]"
            />
        </div>
        <div className="w-1/2 border border-px border-[#b3b3b3]"></div>
        <div className="flex flex-col items-center justify-center space-y-4">
            <p className="lg:text-2xl font-bold text-xl text-center">{title}</p>
            <p className="lg:text-md text-sm text-center">{description}</p>
        </div>
    </Link>
    )

}