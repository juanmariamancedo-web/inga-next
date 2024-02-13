import Link from "next/link"

export default function Footer(){
    return(
        <footer
  className="rounded-lg shadow bg-black/5 dark:bg-black/20 backdrop-blur-lg w-full xl:w-[1120px] mx-auto"
>
  <div
    className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
  >
    <span className="text-sm sm:text-center text-yellow-800/90 dark:text-yellow-200/90"
      >© 2023 <a href="https://midu.dev/" className="hover:underline">Juan María Mancedo</a>.
      Casi todos los derechos reservados
    </span>
    <ul
      className="flex flex-wrap items-center mt-3 text-sm font-medium dark:text-white/90 sm:mt-0"
    >
      <li>
        <Link href="/about-me" className="hover:underline me-4 md:me-6">Sobre mí</Link>
      </li>
      <li>
        <Link href="/about-me" className="hover:underline">Contacto</Link>
      </li>
    </ul>
  </div>
</footer>
    )
}