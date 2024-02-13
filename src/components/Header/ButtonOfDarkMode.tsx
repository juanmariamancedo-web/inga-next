"use client"

import { useState } from 'react'
import DarkMode from '../icons/DarkMode'
import LightMode from '../icons/LightMode'
import { setCookie } from '@/utils/cookies'

export default function ButtonOfDarkMode({themeProp}: {themeProp: "dark" | "light"}){
    const [theme, setTheme] = useState(themeProp)

    function changeThemeMode(){
        if(theme == "dark"){
            document.body.classList.remove("dark")
            setCookie('theme', 'light', 365)
            setTheme("light")
        }else{
            document.body.classList.add("dark")
            setCookie('theme', 'dark', 365)
            setTheme("dark")
        }
    }

    return(
        <button onClick={changeThemeMode} className="flex justify-center items-center">
                {theme == "dark"? <LightMode className="dark:text-white align-middle" />  : <DarkMode className="dark:text-white align-middle" />}
        </button>
    )
}