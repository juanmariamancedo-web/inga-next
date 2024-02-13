"use client"

import { Session as SessionType } from "next-auth";
import { useEffect, useState} from "react"
import ButtonOfDarkMode from "./ButtonOfDarkMode";
import SwitchOpen from "./SwitchOpen";
import Session from "./Session";
import Link from "next/link";

export function Header({themeProp, SessionProp}: {themeProp: "dark" | "light", SessionProp:SessionType}){
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        const mql = window.matchMedia("(max-width: 768px)");
        mql.onchange = (e) => {
            if(!(e.matches)) setOpen(false)
        }
    }, [])

    function toggleOpen(){
        setOpen((prevState)=> !prevState)
    }

    return (
        <header className="z-10 fixed w-full h-14 flex justify-center items-center">
            <nav className="w-full h-full relative">
                <div className="absolute inset-0 flex justify-center items-center md:hidden ">
                    <div className="container p-3">
                        <button onClick={toggleOpen} className="bg-neutral-200 dark:bg-black hover:bg-black/10 dark:hover:bg-white/10 rounded-full px-3 py-1 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                        </button>
                    </div>
                </div>
                <div className={`${open? "translate-x-full": ""} 
                                bg-neutral-200/50 dark:bg-black/50
                                backdrop-blur-2xl md:backdrop-blur-0 dark:text-white
                                md:bg-transparent md:dark:bg-transparent md:transition-none
                                z-20 md:z-auto
                                fixed inset-y-0 -left-full right-full 
                                md:absolute md:inset-0
                                transition-transform duration-1000 
                                `}>
                    <div className="obsolute w-full h-14 flex justify-center items-center md:hidden">
                        <div className="container p-3 flex items-center">
                            <button onClick={toggleOpen} className="z-10 bg-neutral-200/50 dark:bg-black/50 hover:bg-black/10 dark:hover:bg-white/10 rounded-full px-3 py-1 dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center md:h-14">
                        <ul className={`flex flex-col md:flex-row items-center gap-3
                                        md:border md:border-black rounded-full 
                                        px-3 py-1
                                        md:bg-neutral-200/50 md:dark:bg-black/50  
                                        md:backdrop-blur-2xl dark:text-white 
                                        flex-grow-0`}>
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <Link className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition px-3 py-1" href="/">
                                        Home
                                    </Link>
                                </SwitchOpen>    
                            </li>
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <Link className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition px-3 py-1" href="/accounts">
                                        Accounts
                                    </Link>
                                </SwitchOpen>    
                            </li>
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <Link className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition px-3 py-1" href="/categories">
                                        Categories
                                    </Link>
                                </SwitchOpen>
                            </li>
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <Link className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition px-3 py-1" href="/about-me">
                                        About me
                                    </Link>
                                </SwitchOpen>
                            </li>
                            <li className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition px-3 py-1 flex justify-center items-center">
                                {/* <SwitchOpen setOpen={setOpen}> */}
                                    <ButtonOfDarkMode themeProp={themeProp} />
                                {/* </SwitchOpen> */}
                            </li>
                            <Session session={SessionProp} ></Session>
                        </ul>
                    </div>
                </div>  
            </nav>
        </header>
    )
}