"use server"
import prisma from "@/utils/prisma"

export default async function DeleteCategoryAction(category_transaction_id: number){
    return await prisma.categories_transactions.delete({
        where: {
            category_transaction_id
        }
    })
}