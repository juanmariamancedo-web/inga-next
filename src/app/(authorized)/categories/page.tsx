import { auth } from "../../api/auth/[...nextauth]/route"
import prisma from "@/utils/prisma"
import Categories from "@/components/categories/Categories"
import obtainCategories from "@/actions/get/obtainCategories"
import obtainCountOfCategories from "@/actions/get/obtainCountOfCategories"

export default async function CategoriesPage({searchParams}: {
    searchParams : {
        page: string | undefined
    }
}){
    const session = await auth()
    const page = parseInt(searchParams.page || '1')

    const categories = await obtainCategories(session?.user.user_id as number, page)
    const countCategories = await obtainCountOfCategories(session?.user.user_id as number)

    return(
        <main className="flex min-h-screen items-center justify-center py-24 px-3 gap-3"> 
            <Categories categories={categories} countOfCategories={countCategories} page={page} userId={session?.user.user_id as number} />
        </main>
    )
}