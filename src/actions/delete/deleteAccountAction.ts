"use server"

import prisma from "@/utils/prisma"

export default async function deleteAccountAction(account_id: number){
    return await prisma.accounts.delete({
        where: {
            account_id
        }
    })
}