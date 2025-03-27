"use client";

import "../../styles/login.css"
import "../../styles/global.css"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


interface Color {
    red: number,
    green: number,
    blue: number
}

interface Tag {
    name: string | undefined,
    color: Color
}

interface Task {
    id: number,
    name: string,
    description: string,
    priority: number,
    tag: Tag
}

export default function Home() {

    const BACKEND = process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER : "http://localhost:9090";
    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [index, setIndex] = useState(0);

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState<Color>({red: 0, green: 0, blue: 0});
    const [priority, setPriority] = useState(1);

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
                    setTasks(data.data)
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
        setIndex((index) => index-1 < 0 ? tasks.length-1 : index-1);
        setIsCreating(false);
    }

    const handleIncrement = () => {
        setIndex((index) => index+1 > tasks.length-1 ? 0 : index+1);
        setIsCreating(false);
    }

    const handleCreate = (task: Task) => {
        setTasks((tasks) => tasks.concat(task));
    }

    const handleSubmit = (form: FormEvent<HTMLFormElement>) => {

        form.preventDefault();

        if (title === undefined || description === undefined) {
            return;
        }

        handleCreate({id: 0, name: title, description: description, priority: priority, tag: {
            name: undefined,
            color: color
        }})

        setIsCreating(false);

    }

    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {

        const val: string = event.target.value;

        const parseHex = (hex: string) => {
            return parseInt(hex, 16)
        }

        setColor((prevColor) => (
            prevColor = {
                red: parseHex(val.slice(1,3)),
                green: parseHex(val.slice(3,5)),
                blue: parseHex(val.slice(5,7))
            }
        ));

    }

    const handlePriorityChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseInt(event.target.value))) {
            setPriority(parseInt(event.target.value))
        }
    }

    return (
    <>
    <main className="flex-grow flex flex-row mx-12 mb-4 justify-evenly items-center">
        <div className="md:flex hidden w-1/2 justify-center items-center space-x-8">
            <FaArrowAltCircleLeft className="icon" onClick={handleDecrement} />
            <form method="POST" onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <div
                    className={`max-w-[328px] min-w-[328px] min-h-[450px] my-4 h-full flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-white`}
                    style={{boxShadow: `1px 2px 10px ${isCreating ? 
                        "rgb(" + color.red + "," + color.green + "," + color.blue + ")" :
                            tasks.length > 0 ?
                                "rgb(" + tasks[index].tag.color.red + "," + tasks[index].tag.color.green + "," + tasks[index].tag.color.blue + ")" :
                                "black"}`}}
                >
                    <div className="w-[90%] h-3/4 flex flex-col space-y-8 p-4">
                        <div className="flex flex-col min-w-[100%]">
                            <p className="text-[#b3b3b3] pointer-events-none mb-4">{isCreating ? "What is the title of your task?" : "Title"}</p>
                            <p className={`${isCreating ? "hidden" : "block"}`}>{tasks.length > 0 ? tasks[index].name : "Tasks are empty..."}</p>
                            <textarea
                                id="title"
                                name="title"
                                className={`${isCreating ? "block" : "hidden"} resize-none border border-px rounded-xl py-4 px-3 h-[60px]`}
                                placeholder=" "
                                aria-label="title field"
                                onChange={(event) => setTitle(event.target.value)}
                            ></textarea>
                        </div>
                        <div className={`${isCreating ? "hidden" : "block"} w-[100%] my-6 border border-px border-[#b3b3b3]`}></div>
                        <div className="flex flex-col min-w-[100%]">
                            <p className="text-[#b3b3b3] pointer-events-none mb-4">{isCreating ? "What is the description of your task?" : "Description"}</p>
                            <p className={`${isCreating ? "hidden" : "block"}`}>{tasks.length > 0 ? tasks[index].description : "Begin writing your first task by clicking the Create button on the right."}</p>
                            <textarea
                                id="description"
                                name="description"
                                className={`${isCreating ? "block" : "hidden"} resize-none border border-px rounded-xl py-4 px-3 h-[60px]`}
                                placeholder=" "
                                aria-label="description field"
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>
                        <div className={`${isCreating ? "block" : "hidden"} w-[100%] my-1 border border-px border-[#b3b3b3]`}></div>
                        <div className={`${isCreating ? "block" : "hidden"} flex justify-around items-center`}>
                            <div className="flex flex-col">
                                <p className="text-[#b3b3b3] pointer-events-none mb-4">Color?</p>
                                <input
                                    type="color"
                                    className="rounded-xl w-[50px] h-[50px]"
                                    onChange={handleColorChange}
                                ></input>
                            </div>
                            <div className={`${isCreating ? "block" : "hidden"} h-[80px] my-6 border border-px border-[#b3b3b3]`}></div>
                            <div className="flex flex-col">
                                <p className="text-[#b3b3b3] pointer-events-none mb-4">Priority?</p>
                                <input
                                    type="number"
                                    className="rounded-xl w-[70px] h-[50px] px-4 border border-px"
                                    min={1}
                                    onChange={handlePriorityChange}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${isCreating ? "block" : "hidden"} mt-4`}>
                    <button type="submit" className="btn-secondary w-[13vw] cursor-pointer">Submit</button>
                </div>
            </form>
            <FaArrowAltCircleRight className="icon" onClick={handleIncrement} />
        </div>
        <div className="hidden md:flex w-1/3 flex-col justify-center items-center space-y-4">
            <button onClick={() => (setIsCreating(() => !isCreating))} className="btn-secondary w-[13vw] cursor-pointer">Create</button>
            <button className="btn-secondary w-[13vw] cursor-pointer">Delete</button>
            <button className="btn-secondary w-[13vw] cursor-pointer">Modify</button>
        </div>
    </main>
    </>
    )
}