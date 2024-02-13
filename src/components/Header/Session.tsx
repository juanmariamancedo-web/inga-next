"use client"
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function Session({session}:{session: Session}){
    return(
        <>
            {session?.user? (
                <li className="flex justify-center items-center">
                    <button onClick={()=>signOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 align-baseline" stroke="currentColor" fill="currentColor" viewBox="0 -960 960 960">
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                        </svg>
                    </button>
                </li>
            ): (
                <li className="flex justify-center items-center">
                    <button onClick={()=>signIn()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 align-baseline" stroke="currentColor" fill="currentColor" viewBox="0 -960 960 960">
                            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
                        </svg>
                    </button>
                </li>
            )}
        </>
    )
}