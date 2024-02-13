import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import Transactions from "@/components/transactions/Transactions"
import obtainAccount from "@/actions/get/obtainAccount"
import obtainTransactions from "@/actions/get/obtainTransactions"
import obtainCategories from "@/actions/get/obtainCategories"
import obtainCountTransactions from "@/actions/get/obtainCountOfTransactions"
import { notFound } from "next/navigation"

export default async function Account({params, searchParams}: {params: Params, searchParams: {page:number | undefined}}){
    const session = await auth()
    const categoriesTransactions = await obtainCategories(session?.user.user_id as number)

    const account = await obtainAccount(decodeURIComponent(params.title), session?.user.user_id as number)

    if(!account) return notFound()

    const transactions = await obtainTransactions(account?.account_id as number, searchParams.page)

    const countOfTransactions = await obtainCountTransactions(account?.account_id as number)
    
    return(
        <main className="flex min-h-screen items-center justify-center py-24 px-3 gap-3">
            <Transactions transactions={transactions} countOfTransactions={countOfTransactions} page={searchParams.page || 1} categories={categoriesTransactions} accountId={account?.account_id as number} />
        </main>
    )
}