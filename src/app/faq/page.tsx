"use client";

import "../../styles/login.css"
import "../../styles/global.css"
import { useState } from "react";

interface Question {
    title: string
    expanded: boolean
    description: string
}

export default function Home() {

    const [questions, setQuestions] = useState<Question[]>(
        [
            {
                title: "What is this project",
                expanded: false,
                description: "This project is a cloud-hosted, DevOps-enabled task management application built with a microservices architecture. It consists of three core microservices—authentication/authorization, backend, and frontend—as well as a reverse proxy that manages domain name resolution, SSL/TLS handshake, and termination.\n\nThe application is designed to be scalable, secure, and efficient, leveraging Spring Boot, Docker, Oracle Cloud\'s free tier, and Vercel. Continuous integration and deployment are automated through GitHub Actions, ensuring smooth and reliable updates.\n\nBeyond its core functionality, the project is actively evolving. Upcoming features include two-factor authentication with Google Auth and backend optimizations to support at least 100 concurrent connections efficiently.\n\nThis project is both a technical showcase and a problem-solving exercise, demonstrating expertise in backend development, cloud-native applications, and full-stack engineering."
            },
            {
                title: "Why a simple \"task manager\"?",
                expanded: false,
                description: "While a task manager seems simple, the challenge lies in how it\'s built, optimized, and scaled. This project goes beyond CRUD functionality, leveraging a microservices architecture with authentication, backend, and frontend services, plus a reverse proxy for SSL/TLS and domain resolution.\n\nIt allows me to tackle real-world engineering challenges, including secure authentication, cloud hosting (Oracle Cloud and Vercel), CI/CD pipelines (GitHub Actions), and performance optimizations to support 100+ concurrent connections. By choosing a familiar problem space, I can focus on building a scalable, production-ready system while demonstrating expertise in backend, cloud, and DevOps.\n\nBy working within a familiar problem space, this project allows me to explore real-world software engineering challenges such as scalable system design, database performance tuning, security best practices, and cloud-native development, making it far more than a simple CRUD application."
            },
            {
                title: "What does each microservice do?",
                expanded: false,
                description: "This project consists of four microservices: authentication/authorization, backend, frontend, and a reverse proxy, each serving a distinct and important role.\n\n- Authentication/Authorization Service – Written with Maven, Spring Boot, Spring Security, Spring Data, and Spring Web, this service is the central point of authority. It provides access tokens that all microservices use for secure communication. It is hosted on Oracle OCI's free-tier instances, uses Docker for containerization, and GitHub Actions for CI/CD. The service connects to an OCI free-tier Oracle database for persistence, ensuring user data is securely managed.\n\n- Backend Service – Built with the same dependencies as the auth service, the backend is responsible for securely manipulating data in the database. It handles GET, POST, PUT, and DELETE requests, and ensures that data is user-specific, so each user can only access their own data. The backend also uses the Oracle SQL database for persistence, ensuring data security and integrity.\n\n- Frontend Service – Developed in TypeScript and React, leveraging Next.js, the frontend is hosted on Vercel. It is the most actively updated service, providing the user interface and directly interacting with the ecosystem. The frontend saves secure, samesite cookies as access tokens that are used to authenticate requests. It also uses GitHub Actions for CI/CD, ensuring continuous integration and deployment.\n\n- Reverse Proxy Service – Utilizing Docker and NGINX, the reverse proxy is deployed on Oracle OCI as well. It serves as the gateway for SSL/TLS handshake and termination, making all microservices appear to be hosted on a single domain. This enables samesite cookies to be saved across microservices for seamless user experience. The domain is set up for free using DuckDNS, and the SSL certificate is generated via LetsEncrypt.\n\nTogether, these microservices create a secure, scalable, and modular ecosystem that can handle user data efficiently while maintaining a seamless user experience."
            },
            {
                title: "Are there plans in the future for this project?",
                expanded: false,
                description: "Yes, there are several exciting features planned for the future. I plan on adding two-factor authentication (2FA) with Google Auth to provide an extra layer of security for user sign-ins. Additionally, I will implement a password reset feature, allowing users to recover their accounts securely. To improve task management, I will introduce tags for tasks, enabling users to easily filter through their tasks. Another planned enhancement is the addition of refresh tokens, so users won’t have to sign in every time they use the application. These features, along with other improvements, will continue to enhance both the security and user experience of the project."
            },
            {
                title: "What does \"completely free\" mean for this application?",
                expanded: false,
                description: "\"Completely free\" means that this system leverages open-source software and free-tier cloud services, which allow both users and developers to use the system without any cost. By utilizing technologies such as NGINX, Spring Boot and its dependencies, GitHub Actions, Maven, free cloud offerings from Oracle and Vercel for hosting and databases, and Docker, I was able to build and deploy the application without incurring any costs. This approach ensures that the application remains entirely free for both users and myself while still providing high-quality functionality.\n\nIn essence, this was the accumulation of everything I\'ve learned over the years for system development and architecture, leveraging cloud, open source, and best practices adopted by professionals during my internship."
            }
        ]
    )

    const expandQuestion = (question_index: number) => {
        console.log(questions)
        setQuestions((prevQuestion) => (
            prevQuestion.map((question, current_index) => (
                current_index === question_index ? {...question, expanded: !question.expanded} : question
            ))
        ))
    }

    return (
    <>
    <main className="flex-grow w-[100%]">
        <div className="md:my-30 my-20 flex flex-col justify-center items-center relative overflow-hidden w-[100%]">
            <h1 className="md:text-4xl text-3xl mb-8 fadeIn text-center">Frequently Accessed Questions</h1>
            <div className="flex flex-col justify-center items-center my-12 w-3/5">
                {
                    questions.map(
                        (question, question_index) => (
                            <div key={question_index} className="border-t border-px border-gray-300 w-[100%] py-3">
                                <button onClick={() => (expandQuestion(question_index))} className="flex justify-between w-[100%] p-3 cursor-pointer">
                                    <span className="text-xl">{question.title}</span>
                                    <span className="text-xl">{question.expanded ? "-" : "+"}</span>
                                </button>
                                <div className={`${question.expanded ? "block" : "hidden"} w-[100%] p-3 mb-3`}>
                                    <p className="w-[100%] text-gray-600 text-ellipsis break-words text-pretty whitespace-pre-wrap">{question.description}</p>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    </main>
    </>
    )
}