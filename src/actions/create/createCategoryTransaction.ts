"use server"
import prisma from "@/utils/prisma"
import { type_of_transaction } from "@prisma/client"

export async function createCategoryTransactionAction(title: string, type_of_transaction: type_of_transaction,  user_id: number){
    await prisma.categories_transactions.create({
        data: {
            title,
            type_of_transaction,
            user_id
        }
    })

    await prisma.$disconnect()
}