"use client"
import { SessionProvider } from "next-auth/react";

export default function SessionProviderTag({children}:{children: JSX.Element}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}