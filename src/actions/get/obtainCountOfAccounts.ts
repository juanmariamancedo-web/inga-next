"use server"

import prisma from "@/utils/prisma"

export default async function obtainCountOfAccounts(user_id: number){
    return await prisma.accounts.count({
        where: {
            user_id
        }
    })
}