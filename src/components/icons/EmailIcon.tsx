export default function EmailIcon({className}: {className: string | undefined}){
    return(
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"></path>
            <path d="M3 6l9 6l9 -6"></path><path d="M15 18h6"></path>
            <path d="M18 15l3 3l-3 3"></path>
        </svg>
    )
}