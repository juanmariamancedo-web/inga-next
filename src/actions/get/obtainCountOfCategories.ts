"use server"

import prisma from "@/utils/prisma"

export default async function obtainCountOfCategories(user_id: number){
    return await prisma.categories_transactions.count({
        where: {
            user_id
        }
    })
}