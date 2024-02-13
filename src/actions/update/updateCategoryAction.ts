"use server"

import prisma from "@/utils/prisma"

export default async function updateCategoryAction(category_transaction_id: number, title: string){
    return await prisma.categories_transactions.update({
        where: {
            category_transaction_id
        },
        data: {
            title
        }
    })
}