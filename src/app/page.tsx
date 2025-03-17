import "../styles/home.css"
import "../styles/global.css"
import Link from "next/link";
import Card from "@/components/card";
import Title from "@/components/title";

export default function Home() {
  return (
    <main id="main" className="md:mt-32 mt-24 mb-48 transition filter 200ms ease-in-out">
      <section className="mx-24 xl:mx-32 flex flex-col justify-center items-center">
        <h1 className="md:text-4xl text-3xl mb-8 fadeIn text-center">Cloud-native task management. 100% free.</h1>
        <p className="md:text-xl md:mx-16 text-md mb-16 mx-4 fadeIn">Coordinate and manage your necessities with a cloud hosted task manager. Built with security and scalability in mind, it leverages microservice architecture with development, testing, and deployment built in.</p>
        <div className="flex space-x-16">
          <Link href="/tasks" className="block btn-primary md:w-[200px] w-[100px]">Get started.</Link>
          <Link href="#about" className="block btn-secondary md:w-[200px] w-[100px]">How does this work?</Link>
        </div>
      </section>
      <section id="description" className="mx-24 xl:mx-32 flex flex-col justify-center items-center mt-70">
        <Title
          title="Discover the"
          description="Microservice ecosystem"
        >
        </Title>
        <p className="md:text-2xl text-lg mb-8 text-[#b3b3b3] text-center">Click any for their GitHub page!</p>
        <div className="md:flex-row md:justify-center md:space-x-8 md:space-y-0 space-y-8 flex flex-col w-full items-center">
          <Card
            title="Authentication"
            description="JWT Authentication and Authorization with Spring Boot and Spring Security. Hosted on Oracle."
            image1="/spring-boot.svg"
            image2="/spring-security.svg"
            image3="/oracle.svg"
            link="https://github.com/Auwate/taskmanagerauth"
          >
          </Card>
          <Card
            title="Backend"
            description="Backend microservice with JWT authentication that uses Spring Boot and Spring Data. Hosted on Oracle."
            image1="/spring-boot.svg"
            image2="/spring-data.svg"
            image3="/oracle.svg"
            link="https://github.com/Auwate/taskmanager"
          >
          </Card>
          <Card
            title="Frontend"
            description="Frontend microservice with modern capabilities in NextJS and TypeScript. Hosted on Vercel."
            image1="/typescript.svg"
            image2="/next.svg"
            image3="/vercel.svg"
            link="https://github.com/Auwate/taskmanagerui"
          >
          </Card>
        </div>
      </section>
      <section id="about" className="xl:px-24 p-16 pb-0 flex flex-col justify-center items-center mt-64">
          <Title
            title="Fast, efficient, and cloud hosted."
            description="A whole productivity suite in one place"
          ></Title>
          <div className="flex justify-center space-x-10 mt-16">
            <div className="flex flex-col w-1/3">
              <p className="md:text-2xl text-md mb-6">Completely free, powered by Oracle and Vercel's cloud offerings. Data is automatically purged after 24 hours for sustained free access.</p>
              <p className="md:text-2xl text-md mb-6">Scalable, stateless microservices (Spring Boot, Java 21, Maven, Docker) power the backend. User data is securely managed via managed Oracle SQL databases and access is controlled through JWT tokens issued by the auth microservice.</p>
              <p className="md:text-2xl text-md text-lg">Full CI/CD pipelines automate testing, building, and deployment to Docker Hub and hosted instances. Explore projects above or connect on LinkedIn for details!</p>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <h1 className="md:text-5xl text-4xl mb-8 text-center">How do I login or sign up?</h1>
              <p className="md:text-2xl text-lg mb-12">Click <strong>log in</strong>, followed by <strong>sign up</strong>, then provide a <strong>username and password</strong>. Your browser will be provided with an access token by which it can communicate with the backend. If you already have an account, click login and follow the steps provided.</p>
              <h1 className="md:text-5xl text-4xl mb-8 text-center">How do I start?</h1>
              <p className="md:text-2xl text-lg mb-12">Click the button at the header that displays <strong>tasks</strong>. Once there, the application will check that you are logged in and will provide you with <strong>your</strong> data.</p>
            </div>
          </div>
      </section>
    </main>
  );
}
