import prisma from "@/utils/prisma";


export default async function obtainBalanceOfAccount(account_id: number){
    return await prisma.accounts_balances.findUnique({
        where: {
            account_id
        }
    })
}