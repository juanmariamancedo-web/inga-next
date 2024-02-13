import SocialPill from "@/components/SocialPill"
import LinkedinIcon from "@/components/icons/LinkedinIcon"
import GithubIcon from "@/components/icons/GithubIcon"
import EmailIcon from "@/components/icons/EmailIcon"

export default function AboutMe(){
    return(
        <section className="flex min-h-screen w-full items-center justify-center py-24 px-3">
            <div className="flex flex-col items-center container gap-3">
                <img
                    className="rounded-full size-12 mb-4"
                    src="/juanma.webp"
                    alt="Foto de Juan María Mancedo"
                />
                <h1
                    className="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold flex flex-row gap-x-4 pb-6 lg:pb-10">
                    Hola, soy Juan María Mancedo
                    <a
                    href="https://linkedin.com/in/juan-maría-mancedo"
                    target="_blank"
                    rel="noopener"
                    className="flex justify-center items-center"
                    >
                        <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-blue-600 text-white dark:bg-blue-900 dark:text-blue-300">
                            Disponible para trabajar
                        </span>
                    </a>
                </h1>
                <h2
                    className="text-xl lg:text-2xl text-center max-w-[700px] text-black dark:text-white"
                >
                        <span>Muy chambeador. </span>
                        <span className="text-yellow-800 dark:text-yellow-200">
                            Desarrollador Web
                        </span>
                        <span>. </span>
                        <span className="text-red-800 dark:text-red-200">
                            De Corrientes, Argentina
                        </span>
                        <span>. </span>
                        <span className="text-sky-800 dark:text-sky-200">
                            Especializado en crear páginas webs únicas.
                        </span>
                </h2>

                <nav className="flex justify-center gap-4 mt-8 flex-wrap">
                    <SocialPill href="https://linkedin.com/in/juan-maría-mancedo">
                        <LinkedinIcon className="size-4 md:size-6" />
                        LinkedIn
                    </SocialPill>
                    <SocialPill href="https://github.com/juan-maría-mancedo">
                        <GithubIcon className="size-4 md:size-6" />
                            GitHub
                    </SocialPill>
                    <SocialPill href="mailto:juanmaninc@gmail.com">
                        <EmailIcon className="size-4 md:size-6" />
                        <span>
                            juanmaninc@gmail.com
                        </span>
                    </SocialPill>
                </nav>
            </div>
        </section>
    )
}