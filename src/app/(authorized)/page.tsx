import Balance from "@/components/Balance";
import prisma from "@/utils/prisma";
import { auth } from "../api/auth/[...nextauth]/route";
import Transactions from "@/components/Transactions";
import BalancesOfAccounts from "@/components/BalancesOfAccounts";
import obtainBalanceOfUser from "@/actions/get/obtainBalanceOfUser";
import obtainBalancesOfAccounts from "@/actions/get/obtainBalancesOfAccounts";
import Link from "next/link";

async function obtainTransactions(user_id: number){
  const user = await prisma.users.findFirst({
    where: {
      user_id
    },
    include: {
      accounts: {
        where: {user_id},
      }
    }
  })

  return await prisma.transactions.findMany({
    where: {
      account_id: {
        in: user?.accounts.map(account=> account.account_id)
      } 
    }
  })
}

export default async function Home() {
  const session = await auth()
  const transactions = await obtainTransactions(session?.user.user_id as number)

  const balance = await obtainBalanceOfUser(session?.user.user_id as number)

  const balancesOfAccounts = await obtainBalancesOfAccounts(session?.user.user_id as number, 1)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 py-24 gap-5">
        <Balance incomes={balance?.total_income as number} expenses={balance?.total_expense as number} total={balance?.balance as number}/>
        <div className="w-full flex flex-wrap justify-around gap-5">
          <div className="flex flex-col items-center gap-2">
            <Transactions transactions={transactions} />
            <Link href="/accounts" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">More transactions</Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BalancesOfAccounts balancesOfAccounts={balancesOfAccounts} />
            <Link href="/accounts" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">More accounts</Link>
          </div>
        </div>
    </main>
  );
}
