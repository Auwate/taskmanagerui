"use client";

import "@/styles/login.css"
import "@/styles/global.css"

import Image from "next/image";

export default function Home() {
    return (
    <>
    <main className="flex-grow">
        <div className="md:mt-30 mt-20 flex flex-col justify-center items-center relative overflow-hidden">
            <h1 className="md:text-4xl text-3xl mb-8 fadeIn text-center">Contact Me</h1>
            <p className="md:text-xl md:mx-16 text-md fadeIn">Feel free to send me a message or connect through social media!</p>
            <div className="w-[400px] mt-16 md:mb-0 mb-8 border border-px border-[#b3b3b3]"></div>
            <div className="flex space-y-4 md:space-x-8 md:flex-row flex-col mb-20 items-center justify-center">
                <div className="w-[300px] h-[200px] flex flex-col justify-start items-center pt-6">
                    <h2 className="text-xl mb-6 text-gray-700">Contact Details</h2>
                    <p onClick={() => (window.open('mailto:austin.w.uwate@gmail.com'))} className="text-lg text-gray-800 link cursor-pointer">austin.w.uwate@gmail.com</p>
                    <p onClick={() => (window.open('mailto:auwate@fiu.edu'))} className="text-lg text-gray-800 link cursor-pointer md:mb-12">auwate@fiu.edu</p>
                </div>
                <div className="md:block hidden h-[150px] my-16 border border-px border-[#b3b3b3]"></div>
                <div className="w-[300px] h-[200px] flex flex-col justify-start items-center pt-6">
                    <h2 className="text-xl mb-6 text-gray-700">Socials</h2>
                    <div className="flex justify-center items-center space-x-6">
                        <Image
                            src="/LinkedIn_icon.svg"
                            alt="Logo of LinkedIn"
                            height={0}
                            width={0}
                            className="h-[48px] w-[48px]  xl:h-[72px] xl:w-[72px] cursor-pointer"
                            onClick={() => (window.open("https://www.linkedin.com/in/austin-uwate/"))}
                        />
                        <Image
                            src="/github-mark-white.svg"
                            alt="Logo of GitHub"
                            height={0}
                            width={0}
                            className="h-[48px] w-[48px] icon_invert xl:h-[72px] xl:w-[72px] cursor-pointer"
                            onClick={() => (window.open("https://github.com/Auwate"))}
                        />
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
    )
}