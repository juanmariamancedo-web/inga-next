import prisma from "@/utils/prisma"

export default async function obtainBalancesOfAccounts(user_id: number, page: number){
    "use server"
    const user = await prisma.users.findFirst({
      where: {
        user_id
      },
      include: {
        accounts: true
      }
    })

    console.log(user)
  
    return await prisma.accounts_balances.findMany({
      where: {
        account_id: {
          in: user?.accounts.map(account=> account.account_id)
        } 
      },
      take: 6,
      skip: (page - 1) * 6
    })
  }