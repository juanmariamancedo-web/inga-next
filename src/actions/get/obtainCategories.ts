"use server"
import prisma from "@/utils/prisma"

export default async function obtainCategories(user_id: number, page = 1){
    return await prisma.categories_transactions.findMany({
        where: {
            user_id
        },
        include: {
            transactions: true
        },
        take: 6,
        skip: (page - 1) * 6
    })
}