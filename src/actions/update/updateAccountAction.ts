"use server"

import prisma from "@/utils/prisma"

export default async function updateAccountAction(account_id: number, title:string, description:string){
    return await prisma.accounts.update({
        where: {
            account_id
        }, 
        data: {
            title,
            description
        }
    })
}