"use client";

import { QRCodeSVG } from "qrcode.react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

    const [qrCode, setQrCode] = useState<string>("");
    const [totpCode, setTotpCode] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const router = useRouter();

    const AUTH = process.env.NEXT_PUBLIC_SERVER ? process.env.NEXT_PUBLIC_SERVER : "http://localhost:9095";

    useEffect(() => {

        async function getQrCode(): Promise<void> {

            try {

                const response = await fetch(`${AUTH}/api/auth/2fa/generate`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    setQrCode(data.data);
                } else {
                    console.log(response);
                }

            } catch (error) {
                console.log(error);
            }

        }

        getQrCode();

    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {

            const response = await fetch(`${AUTH}/api/auth/2fa/setup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "totp": totpCode
                }),
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                if (data.status === 200) {
                    router.push("/auth/login");
                } else {
                    setResponse(data.message);
                }
            } else {
                setResponse(data.message);
            }

        } catch (error) {
            setResponse(`There was an error authenticating 2FA on your account: ${error}`);
        }

    }

    return (
        <>
        <main id="main" className="flex flex-grow flex-col justify-center items-center relative bg-[#f2f1ed] overflow-hidden">
            <form onSubmit={handleSubmit} className="flex flex-col bg-white shadow-2xl rounded-2xl my-20 py-16 px-10 space-y-6 max-w-[352px] min-w-[352px] min-h-[500px] justify-center items-center">
                <QRCodeSVG
                    value={qrCode}
                    size={172}
                    level="H"
                ></QRCodeSVG>
                <div className="w-1/2 border mt-2 border-px border-[#b3b3b3]"></div>
                <h1 className="text-center text-sm">Please enable 2FA by scanning this QR code and entering your one time code. We recommend Google Authenticator or Authy.</h1>
                <input
                    id="totp"
                    name="totp"
                    className="block border border-px rounded-xl px-3 pb-0 h-[50px]"
                    placeholder=" "
                    aria-label="totp"
                    onChange={(event) => setTotpCode(event.target.value)}
                ></input>
                <button type="submit" className="btn-primary cursor-pointer min-w-3/4">Submit</button>
                <h1 className="text-center text-sm">{response}</h1>
            </form>
        </main>
        </>
    )

}