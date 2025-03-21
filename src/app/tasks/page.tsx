"use client";

import "../../styles/login.css"
import "../../styles/global.css"

import { useEffect } from "react"
import { useRouter } from "next/navigation";

export default function Home() {

    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_SERVER;
    const router = useRouter();

    useEffect(() => {

        async function fetchTasks () {

            try {

                const response = fetch(`${BACKEND}/api/tasks`)
                console.log(response)

            } catch (error) {

                console.log(error)
                router.push("/auth/login")

            }

        };

        fetchTasks();

    }, []);

    return (
    <>
    <main className="flex-grow">
        <div className="md:mt-40 mt-30 flex flex-row justify-center relative overflow-hidden">
            <div className="flex flex-col w-1/2">
            </div>
            <div className="flex flex-col w-1/2 overflow-hidden">
            </div>
        </div>
    </main>
    </>
    )
}