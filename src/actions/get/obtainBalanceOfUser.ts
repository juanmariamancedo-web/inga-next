import prisma from "@/utils/prisma";

export default async function obtainBalanceOfUser(user_id: number){
    return await prisma.users_balances.findUnique({
        where: {
            user_id
        }
    })
}