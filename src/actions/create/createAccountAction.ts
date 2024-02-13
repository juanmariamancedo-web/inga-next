"use server"
import prisma from "@/utils/prisma"

export async function createAccountAction(title: string, description: string, user_id: number){
    await prisma.accounts.create({
        data: {
            title,
            description,
            user_id
        }
    })

    await prisma.$disconnect()
}