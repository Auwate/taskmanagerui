import "../../../styles/login.css"
import "../../../styles/global.css"

export default function Home() {
    return (
    <>
    <main className="flex flex-grow flex-col justify-center items-center relative overflow-hidden">
        <div className="bubble largeBubble absolute z-[-1] blur"></div>
        <div className="min-w-[352px] min-h-[487px] my-20 h-full flex flex-col justify-center items-center shadow-2xl rounded-2xl bg-white">
            <div className="h-1/3">
                <h1 className="text-3xl">Log in</h1>
            </div>
            <div className="w-1/2 my-12 border border-px border-[#b3b3b3]"></div>
            <form className="h-2/3 flex flex-col space-y-8">
                <div className="relative">
                    <input id="username" name="username" className="block border border-px rounded-xl px-3 pt-3 pb-0 h-[60px]" placeholder=" " aria-label="username"></input>
                    <label htmlFor="username" className="absolute top-1 left-3 text-[#b3b3b3] pointer-events-none">Username</label>
                </div>
                <div className="relative">
                    <input id="password" name="password" type="password" className="border border-px rounded-xl px-3 pt-3 pb-0 h-[60px]" placeholder=" " aria-label="username"></input>
                    <label htmlFor="password" className="absolute top-1 left-3 text-[#b3b3b3] pointer-events-none">Password</label>
                </div>
                <button className="btn-primary cursor-pointer">Sign in</button>
            </form>
        </div>
    </main>
    </>
    )
}
