import "../styles/home.css"
import "../styles/global.css"
import Image from "next/image"

export default function Home() {
  return (
    <main className="mx-32 mt-32">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-8 fadeIn">Cloud-native task management. 100% free.</h1>
        <p className="text-xl mb-16 mx-32 fadeIn">Coordinate and manage your necessities with a cloud hosted task manager. Built with security and scalability in mind, it leverages microservice architecture with development, testing, and deployment built in.</p>
        <div className="flex space-x-16">
          <a href="/tasks" className="block btn-primary w-[8vw]">Get started.</a>
          <a href="#description" className="block btn-secondary w-[12vw]">How does this work?</a>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mt-48" id="description">
        <p className="text-2xl text-[#b3b3b3]">Discover the</p>
        <h1 className="text-5xl">Tech stack</h1>
        <div className="flex flex-row w-full justify-evenly items-center mt-16">
          <div className="flex flex-col space-y-8">
            <Image
              src={"/spring-boot.svg"}
              alt="Logo of Spring Boot"
              height={64}
              width={64}
            />
            <Image
              src={"/spring-security.svg"}
              alt="Logo of Spring Security"
              height={64}
              width={64}
            />
            <Image
              src={"/oracle.svg"}
              alt="Logo of Oracle"
              height={64}
              width={64}
            />
          </div>
          <div className="flex flex-col space-y-8">
            <Image
              src={"/spring-boot.svg"}
              alt="Logo of Spring Boot"
              height={64}
              width={64}
            />
            <Image
              src={"/spring-data.svg"}
              alt="Logo of Spring Data"
              height={64}
              width={64}
            />
            <Image
              src={"/oracle.svg"}
              alt="Logo of Oracle"
              height={64}
              width={64}
            />
          </div>
          <div className="flex flex-col space-y-8">
            <Image
              src={"/typescript.svg"}
              alt="Logo of TypeScript"
              height={64}
              width={64}
            />
            <Image
              src={"/next.svg"}
              alt="Logo of Next"
              height={64}
              width={64}
            />
            <Image
              src={"/vercel.svg"}
              alt="Logo of Vercel"
              height={64}
              width={64}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
