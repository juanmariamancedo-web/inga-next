import prisma from "@/utils/prisma";

export default async function obtainCountTransactions(account_id:number){
    return await prisma.transactions.count({
        where: {
            account_id
        }
    })
}