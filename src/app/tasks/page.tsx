import "../../styles/login.css"
import "../../styles/global.css"

import { useEffect } from "react"

export default function Home() {

    const BACKEND = process.env.NEXT_PUBLIC_BACKEND_SERVER;

    useEffect(() => {

        async function fetchTasks () {

            try {

                const response = fetch(`${BACKEND}/api/tasks`)

            }

        }

    }, [])

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