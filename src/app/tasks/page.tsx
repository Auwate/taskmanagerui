"use client";

import "../../styles/login.css"
import "../../styles/global.css"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


interface Color {
    red: Number,
    green: Number,
    blue: Number
}

interface Tag {
    name: String,
    color: Color
}

interface Task {
    id: Number,
    name: String,
    description: String,
    priority: Number,
    tag: Tag,
}

export default function Home() {

    const BACKEND = process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER : "http://localhost:9090";
    const router = useRouter();

    const [tasks, setTasks] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {

        async function fetchTasks () {

            try {

                const response = await fetch(`${BACKEND}/api/tasks`, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
    
                });
    
                const data = await response.json();

                if (response.ok) {
                    console.log(data)
                    setTasks((tasks) => tasks = data.data)
                } else {
                    router.push("/auth/login")
                }

            } catch (error) {

                console.log(error)
                router.push("/auth/login")

            }

        };

        fetchTasks();

    }, []);

    const handleDecrement = () => {
        if (index > 0) {
            setIndex((index) => index-1)
        }
    }
    const handleIncrement = () => {
        if (index < tasks.length-1) {
            setIndex((index) => index+1)
        }
    }

    return (
    <>
    <main className="flex-grow flex flex-row mx-12 mb-4 justify-evenly items-center">
        <div className="md:flex hidden w-1/2 justify-center items-center space-x-8">
            <FaArrowAltCircleLeft className="icon" onClick={handleDecrement} />
            <div className="max-w-[328px] min-w-[328px] min-h-[450px] my-4 h-full flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-white">
                <div className="w-[90%] h-3/4 flex flex-col space-y-8 p-4">
                    <div className="flex flex-col min-w-[100%]">
                        <p className="text-[#b3b3b3] pointer-events-none mb-4">Title</p>
                        <p>{tasks[index] ?? "Tasks are empty..."}</p>
                    </div>
                    <div className="w-[100%] my-6 border border-px border-[#b3b3b3]"></div>
                    <div className="flex flex-col min-w-[100%]">
                        <p className="text-[#b3b3b3] pointer-events-none mb-4">Description</p>
                        <p>{tasks[index] ?? "Begin writing your first task by clicking the Create button on the right."}</p>
                    </div>
                </div>
            </div>
            <FaArrowAltCircleRight className="icon" onClick={handleIncrement} />
        </div>
        <div className="hidden md:flex w-1/3 flex-col justify-center items-center space-y-4">
            <button className="btn-secondary w-[13vw] cursor-pointer">Create</button>
            <button className="btn-secondary w-[13vw] cursor-pointer">Delete</button>
            <button className="btn-secondary w-[13vw] cursor-pointer">Modify</button>
        </div>
    </main>
    </>
    )
}