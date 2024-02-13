"use server"

import prisma from "@/utils/prisma"

export default async function obtainTransactions(account_id: number, page = 1){
    return await prisma.transactions.findMany({
        where: {
            account_id
        },
        include: {
            categories_transactions: true
        },
        take: 6,
        skip: (page - 1) * 6
    })
}