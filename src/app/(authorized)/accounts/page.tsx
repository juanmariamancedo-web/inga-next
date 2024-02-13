import Accounts from "@/components/accounts/Accounts";
import obtainBalancesOfAccounts from "@/actions/get/obtainBalancesOfAccounts";
import obtainCountOfAccounts from "@/actions/get/obtainCountOfAccounts";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

export default async function AccountsPage({searchParams}: {
    searchParams : {
        page: string | undefined
    }
}){
    const session = await auth()
    const balancesOfAccounts = await obtainBalancesOfAccounts(session?.user.user_id as number, parseInt(searchParams.page || "1"))
    const countOfAccounts = await obtainCountOfAccounts(session?.user.user_id as number)

    if(!balancesOfAccounts) return notFound()

    return(
        <main className="flex min-h-screen items-center justify-center py-24 px-3 gap-3">
            <Accounts accounts={balancesOfAccounts} page={parseInt(searchParams.page || "1")} countOfAccounts={countOfAccounts} userId={session?.user.user_id as number} />
        </main>
    )
}