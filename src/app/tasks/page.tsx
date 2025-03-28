"use client";

import "@/styles/login.css"
import "@/styles/global.css"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


interface Color {
    red: number,
    green: number,
    blue: number
}

interface Tag {
    name: string,
    color: Color
}

interface Task {
    id: number | null,
    name: string,
    description: string,
    priority: number,
    tag: Tag
}

interface API {
    data: string
}

export default function Home() {

    const BACKEND = process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER : "http://localhost:9090";
    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [index, setIndex] = useState<number>(0);

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isModifying, setIsModifying] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState<Color>({red: 0, green: 0, blue: 0});
    const [priority, setPriority] = useState<number>(1);

    // Requests

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
                    setTasks(data.data.sort((a: Task, b: Task) => a.priority - b.priority))
                } else {
                    resetChecks();
                    setIsAuthenticated(false);
                }

            } catch (error) {
                console.log(error);
                resetChecks();
                setIsAuthenticated(false);
            }

        };

        fetchTasks();

    }, []);

    // Utilities

    const resetChecks = () => {
        setIsCreating(false);
        setIsDeleting(false);
        setIsModifying(false);
    }

    const getPriority = () => {
        return priority;
    }

    const rgbToHex = () => {

        return '#' + [color.red, color.green, color.blue].map(
            (color) => {
                const hex = color.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }
        ).join('');

    }

    // onClick handlers

    const handleDecrementClicked = () => {
        setIndex((index) => index-1 < 0 ? tasks.length-1 : index-1);
        resetChecks();
    }

    const handleIncrementClicked = () => {
        setIndex((index) => index+1 > tasks.length-1 ? 0 : index+1);
        resetChecks();
    }

    const handleCreateClicked = () => {
        setIsModifying(false);
        setIsDeleting(false);
        setIsCreating(true);
    }

    const handleModifyClicked = () => {

        if (tasks.length === 0) {
            return;
        }

        setIsCreating(false);
        setIsDeleting(false);
        setIsModifying(true);

        setTitle(tasks[index].name);
        setDescription(tasks[index].description);
        setPriority(tasks[index].priority);
        setColor(tasks[index].tag.color);
    }

    const handleDeleteClicked = () => {

        if (tasks.length === 0) {
            return;
        }

        setIsModifying(false);
        setIsCreating(false);
        setIsDeleting(true);
    }

    // State change functions

    const handleCreate = (newTask: Task) => {

        setTasks((prevTasks) => (prevTasks.concat(
            [newTask]
        )));

        return newTask;

    }

    const handleDelete = async () => {

        resetChecks();

        const newLength = tasks.length-1;
        const toDelete = tasks[index];

        setTasks((prevTasks) => prevTasks.filter((_, taskIndex) => taskIndex != index));

        if (index >= newLength) {
            handleDecrementClicked();
        }

        await handleDataTransfer(`/api/tasks/${toDelete.id}`, "DELETE", null);

    }

    const handleUpdate = () => {

        const newTask: Task = {
            id: tasks[index].id,
            name: title === "" ? " " : title,
            description: description,
            priority: priority,
            tag: {
                name: "N/A",
                color: color
            }
        };

        setTasks((prevTasks) => (prevTasks.map((task, taskIndex) => (taskIndex === index ? newTask : task))));
        resetChecks();

        return newTask;

    }

    // Form submit

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (isCreating) {

            const task: Task = {
                id: null,
                name: title,
                description: description,
                priority: priority,
                tag: {
                    name: "N/A",
                    color: color
                }
            }

            const data = await handleDataTransfer("/api/tasks", "POST", task);
            task.id = data !== undefined ? parseInt(data.data.slice(data.data.lastIndexOf("/")+1)) : null;

            handleCreate(task);

        } else if (isModifying) {
            const newTask = handleUpdate();
            await handleDataTransfer(`/api/tasks/${newTask.id}`, "PUT", newTask);
        } else {
            return;
        }

        setTitle("");
        setDescription("");
        setPriority(1);
        setColor({red: 0, green: 0, blue: 0});
        resetChecks();

    }

    // Data handlers

    const handleDataTransfer = async (url: string, method: string, body: Task | null): Promise<API | undefined> => {

        try {
            const response = await fetch(`${BACKEND}${url}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
                credentials: "include"
            });

            if (!response.ok) {
                setIsAuthenticated(false);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        }

        return undefined;

    }

    // onChange handlers

    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {

        const val: string = event.target.value;

        const parseHex = (hex: string) => {
            return parseInt(hex, 16);
        }

        setColor(
            {
                red: parseHex(val.slice(1,3)),
                green: parseHex(val.slice(3,5)),
                blue: parseHex(val.slice(5,7))
            }
        );

    }

    const handlePriorityChange = (event: ChangeEvent<HTMLInputElement>) => {

        const priorityVal = parseInt(event.target.value)

        if (!isNaN(priorityVal) || priority >= 1 && priority <= 99) {
            setPriority(parseInt(event.target.value))
        } else {
            setPriority(1);
        }

    }

    return (
    <>
    <main className="flex-grow flex md:flex-row flex-col md:mx-12 md:mb-4 justify-evenly items-center">
        <div className={`${isAuthenticated ? "hidden" : "flex"} w-30% min-w-[200px] h-30% bg-white flex flex-col justify-center items-center space-y-8`}>
            <p className="text-center">Your session has timed out or we could not authenticate you. Please login again.</p>
            <button className="btn-primary p-4 min-w-[100px] w-[8vw] cursor-pointer" onClick={() => (router.push("/auth/login"))}>Login</button>
        </div>
        <div className={`${isAuthenticated ? "flex" : "hidden"} ${isDeleting ? "blur" : ""} transition filter 300ms ease-in-out w-1/2 justify-center items-center space-x-8`}>
            <FaArrowAltCircleLeft className="icon" onClick={handleDecrementClicked} />
            <form method="POST" onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <div
                    className={`max-w-[300px] min-w-[300px] min-h-[400px] max-h-[400px] my-4 h-full flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-white border border-px`}
                    style={{boxShadow: `1px 2px 10px ${isCreating || isModifying ? 
                        "rgb(" + color.red + "," + color.green + "," + color.blue + ")" :
                            tasks.length > 0 ?
                                "rgb(" + tasks[index].tag.color.red + "," + tasks[index].tag.color.green + "," + tasks[index].tag.color.blue + ")" :
                                "black"}`}}
                >
                    <div className="w-[90%] h-3/4 flex flex-col space-y-8 p-4">
                        <div className="flex flex-col min-w-[100%]">
                            <p className="text-[#b3b3b3] pointer-events-none mb-4">{isCreating || isModifying ? "What is the title of your task?" : "Title"}</p>
                            <p className={`${isCreating || isModifying ? "hidden" : "block"} text-ellipsis break-words text-balance whitespace-pre-wrap`}>{tasks.length > 0 ? tasks[index].name : "Tasks are empty..."}</p>
                            <textarea
                                id="title"
                                name="title"
                                value={title}
                                maxLength={100}
                                className={`${isCreating || isModifying ? "block" : "hidden"} break-words text-balance whitespace-pre-wrap resize-none border border-px rounded-xl py-4 px-3 h-[60px]`}
                                placeholder=" "
                                aria-label="title field"
                                onChange={(event) => setTitle(event.target.value.slice(0, Math.min(100, event.target.value.length)))}
                            ></textarea>
                        </div>
                        <div className={`${isCreating || isModifying ? "hidden" : "block"} w-[100%] my-6 border border-px border-[#b3b3b3]`}></div>
                        <div className="flex flex-col min-w-[100%]">
                            <p className="text-[#b3b3b3] pointer-events-none mb-4">{isCreating || isModifying ? "What is the description of your task?" : "Description"}</p>
                            <p className={`${isCreating || isModifying ? "hidden" : "block"} text-ellipsis break-words text-balance whitespace-pre-wrap`}>{tasks.length > 0 ? tasks[index].description : "Begin writing your first task by clicking the Create button on the right."}</p>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                maxLength={250}
                                className={`${isCreating || isModifying ? "block" : "hidden"} break-words text-balance whitespace-pre-wrap resize-none border border-px rounded-xl py-4 px-3 h-[60px]`}
                                placeholder=" "
                                aria-label="description field"
                                onChange={(event) => setDescription(event.target.value.slice(0, Math.min(250, event.target.value.length)))}
                            ></textarea>
                        </div>
                        <div className={`${isCreating || isModifying ? "block" : "hidden"} w-[100%] my-1 border border-px border-[#b3b3b3]`}></div>
                        <div className={`${isCreating || isModifying ? "block" : "hidden"} flex justify-around items-center`}>
                            <div className="flex flex-col">
                                <p className="text-[#b3b3b3] pointer-events-none mb-4">Color?</p>
                                <input
                                    type="color"
                                    value={rgbToHex()}
                                    className="rounded-xl w-[50px] h-[50px]"
                                    onChange={handleColorChange}
                                ></input>
                            </div>
                            <div className={`${isCreating || isModifying ? "block" : "hidden"} h-[80px] my-6 border border-px border-[#b3b3b3]`}></div>
                            <div className="flex flex-col">
                                <p className="text-[#b3b3b3] pointer-events-none mb-4">Priority?</p>
                                <input
                                    type="number"
                                    className="rounded-xl w-[70px] h-[50px] px-4 border border-px"
                                    value={getPriority()}
                                    min={1}
                                    max={99}
                                    onChange={handlePriorityChange}
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${isCreating || isModifying ? "block" : "hidden"} mt-4`}>
                    <button type="submit" className="btn-secondary w-[13vw] min-w-[80px] cursor-pointer">{isCreating ? "Submit" : "Update"}</button>
                </div>
            </form>
            <FaArrowAltCircleRight className="icon" onClick={handleIncrementClicked} />
        </div>
        <div className={`${isAuthenticated ? "flex md:flex-col flex-row my-8 md:my-0 md:space-y-4 space-x-8 md:space-x-0" : "hidden"} ${isDeleting ? "blur" : ""} transition filter 300ms ease-in-out w-1/3 flex-col justify-center items-center`}>
            <button onClick={handleCreateClicked} className="btn-secondary w-[13vw] min-w-[80px] cursor-pointer">Create</button>
            <button onClick={handleDeleteClicked} className="btn-secondary w-[13vw] min-w-[80px] cursor-pointer">Delete</button>
            <button onClick={handleModifyClicked} className="btn-secondary w-[13vw] min-w-[80px] cursor-pointer">Modify</button>
        </div>
        <div className={`${isAuthenticated && isDeleting ? "flex" : "hidden"} justify-center items-center absolute top-0 left-0 w-[100vw] h-[100vh]`}>
            <div className="flex flex-col justify-center items-center w-[30%] min-w-[250px] h-[30%] space-y-8 bg-white border border-px p-4">
                <p className="text-center">Are you sure you want to delete?</p>
                <div className="flex flex-row space-x-4">
                    <button className="btn-primary-red p-4 min-w-[100px] w-[8vw] cursor-pointer" onClick={handleDelete}>Delete</button>
                    <button className="btn-secondary p-4 min-w-[100px] w-[8vw] cursor-pointer" onClick={resetChecks}>Cancel</button>
                </div>
            </div>
        </div>
    </main>
    </>
    )
}