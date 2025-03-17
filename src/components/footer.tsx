"use client";

import "../styles/global.css"

import Link from "next/link";

export default function Footer() {

    return (
    <footer className="p-8 flex justify-evenly text-white items-center w-full bg-[#214dff]">
        <ul className="sm:flex-row md:space-x-16 flex justify-center space-x-8 items-center">
            <li><Link className="link sm:text-xl text-[8px]" href="#top">Home</Link></li>
            <li><Link className="link sm:text-xl text-[8px]" href="/faq">FAQ</Link></li>
            <li><Link className="link sm:text-xl text-[8px]" href="/contact">Contact</Link></li>
            <li><Link target="_blank" className="link sm:text-xl text-[8px]" href="https://auwate.github.io/portfolio_website/">My Portfolio</Link></li>
        </ul>
    </footer>
    )

}