import prisma from "@/utils/prisma";

export default async function obtainAccount(title: string, user_id: number){
    return await prisma.accounts.findFirst({
        where: {
            title,
            user_id
        }
    })
}