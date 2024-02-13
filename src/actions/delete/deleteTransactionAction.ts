"use server"

import prisma from "@/utils/prisma";

export default async function deleteTransactionAction(transaction_id: number){
    return await prisma.transactions.delete({
        where: {
            transaction_id
        }
    })
}