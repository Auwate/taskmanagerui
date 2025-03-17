"use client";

import "../styles/navigation.css"

import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    function onClick (): void {
        setIsOpen(() => !isOpen)
        document.getElementById("main")?.classList.toggle("blur")
    }

    return (
    <>
        <div className="w-full h-px bg-[#214dff]"></div>
        <nav id="top" className="flex flex-row item-center justify-between p-4 bg-white mx-8 text-lg mb-[14%]">
            <ul className="hidden md:flex space-x-16 items-center">
                <li><Link className="link" href="/">Task Manager</Link></li>
                <li><Link className="link" href="/faq">FAQ</Link></li>
                <li><Link className="link" href="/contact">Contact</Link></li>
            </ul>
            <ul className="hidden md:flex space-x-16">
                <li><Link className="btn-secondary w-[13vw]" href="/tasks">Tasks</Link></li>
                <li><Link className="btn-primary w-[13vw]" href="/auth/login">Log in</Link></li>
            </ul>

            <div className="flex items-center space-x-4 md:hidden">
                {isOpen ?
                    <RxCross1 size={32} className="z-1" onClick={onClick}></RxCross1> :
                    <RxHamburgerMenu size={32} className="z-1" onClick={onClick}></RxHamburgerMenu>
                }
                <Link href="/">Task Manager</Link>
            </div>
            <div className={
                `flex
                md:hidden
                absolute
                h-[200px]
                w-[200px]
                top-17
                left-0`
            }>
                <ul className={
                    `flex
                    flex-col
                    justify-evenly
                    items-center
                    bg-white
                    h-full
                    w-full
                    transition-all ease-in-out duration-300
                    shadow-2xl
                    ${isOpen ? `mobile-menu-open` : `mobile-menu`}`
                }>
                    <li><Link className="block link text-xl" href="/">Home</Link></li>
                    <li><Link className="block link text-xl" href="/faq">FAQ</Link></li>
                    <li><Link className="block link text-xl" href="/tasks">Tasks</Link></li>
                    <li><Link className="block link text-xl" href="/auth/login">Log in</Link></li>
                </ul>
            </div>
        </nav>
    </>
    );
}
