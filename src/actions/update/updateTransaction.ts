"use server"

import prisma from "@/utils/prisma"
import { type_of_transaction } from "@prisma/client"

export default async function updateTransaction(transaction_id: number | undefined, description:string, amount: number, type_of_transaction: type_of_transaction, category_transaction_id: number){
    return await prisma.transactions.update({
        where: {
            transaction_id
        },
        data: {
            description,
            amount,
            type_of_transaction,
            category_transaction_id
        }
    })
}