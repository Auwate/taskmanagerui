"use client";

import "@/styles/login.css"
import "@/styles/global.css"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [totp, setTotp] = useState("");
    const [requireTotp, setRequiresTotp] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const AUTH = process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER : "http://localhost:9095";

    useEffect(() => {

        async function quicklyValidate() {

            try {

                const response = await fetch(`${AUTH}/api/auth/validate`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (response.ok) {
                    router.push("/tasks")
                }

            } catch (error) {
                console.log(error);
            }

        }

        quicklyValidate();

    }, [])

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            const response = await fetch(`${AUTH}/api/auth/login`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username, 
                    "password": password,
                    "totp": totp
                }),
                credentials: "include"

            });

            const data = await response.json();

            if (response.ok) {
                if (data.status === 362) {
                    router.push("/auth/2fa/setup")
                } else if (data.status === 462) {
                    setRequiresTotp(true);
                } else if (data.status === 200) {
                    router.push("/tasks")
                } else {
                    setErrorMessage(data.message);
                }
            } else {
                setErrorMessage(data.message);
            }

        } catch (error) {
            console.error("Error during authentication:", error);
            setErrorMessage("An error occurred while authenticating.");
        }

    }

    return (
    <>
    <main id="main" className="flex flex-grow flex-col justify-center items-center relative bg-[#f2f1ed] overflow-hidden">
        <div className="max-w-[352px] min-w-[352px] min-h-[487px] my-20 py-16 h-full flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-white">
            <div className="h-1/3">
                <h1 className="text-3xl">Log in</h1>
            </div>
            <div className="w-1/2 my-12 border border-px border-[#b3b3b3]"></div>
            <form method="POST" className="h-2/3 flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        id="username"
                        name="username"
                        className="block border border-px rounded-xl px-3 pt-3 pb-0 h-[60px]"
                        placeholder=" "
                        aria-label="username"
                        onChange={(event) => setUsername(event.target.value)}
                    ></input>
                    <label htmlFor="username" className="absolute top-1 left-3 text-[#b3b3b3] pointer-events-none">Username</label>
                </div>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="border border-px rounded-xl px-3 pt-3 pb-0 h-[60px]"
                        placeholder=" "
                        aria-label="username"
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <label htmlFor="password" className="absolute top-1 left-3 text-[#b3b3b3] pointer-events-none">Password</label>
                </div>
                <div className={`${requireTotp ? "block" : "hidden"} relative`}>
                    <input
                        id="totp"
                        name="totp"
                        type="username"
                        className="border border-px rounded-xl px-3 pt-3 pb-0 h-[60px]"
                        placeholder=" "
                        aria-label="totp"
                        onChange={(event) => setTotp(event.target.value)}
                    ></input>
                    <label htmlFor="totp" className="absolute top-1 left-3 text-[#b3b3b3] pointer-events-none">Enter your 2FA code</label>
                </div>
                <button type="submit" className="btn-primary cursor-pointer">Sign in</button>
                <p className="text-center link mt-4"><Link href={"/auth/register"}>Create an account</Link></p>
            </form>
            <div className={`${errorMessage !== "" ? "block" : "hidden"} flex mx-4 pt-8 px-8`}>
                <p className="text-red md:text-md text-sm text-center">{errorMessage}</p>
            </div>
        </div>
    </main>
    </>
    )
}
