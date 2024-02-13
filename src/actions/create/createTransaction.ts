"use server"
import prisma from "@/utils/prisma"

export default async function createTransactionAction(amount:number, finish:boolean, description:string , account_id:number, type_of_transaction: "expense" | "income", category_transaction_id: number){
    return await prisma.transactions.create({
        data: {
            amount,
            description,
            finish,
            account_id,
            type_of_transaction,
            category_transaction_id
        }
    })
}