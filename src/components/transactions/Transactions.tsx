"use client"
import { categories_transactions, transactions } from "@prisma/client"
import { Table, Pagination } from "flowbite-react"
import { useState, useEffect } from "react"
import UpdateTransaction from "./UpdateTransaction"
import DeleteTransaction from "./DeleteTransaction"
import CreateTransaction from "./CreateTransaction"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Transactions({
    transactions,
    countOfTransactions, 
    page,
    categories,
    accountId
}: {
    transactions: transactions[],
    countOfTransactions: number, 
    page: number,
    categories: categories_transactions[],
    accountId: number
}){
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)

    const [transaction, setTransaction] = useState<transactions>()

    const [currentPage, setCurrentPage] = useState(page)

    const {replace} = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    function handleUpdate(transaction: transactions){
        setOpenUpdate(true)
        setTransaction(transaction)
    }
    
    function handleDelete(transaction: transactions){
        setOpenDelete(true)
        setTransaction(transaction)
    }

    useEffect(()=>{
        const params = new URLSearchParams(searchParams)

        params.set("page", currentPage.toString())

        replace(`${pathname}?${params}`, {scroll: false})
    }, [currentPage])

    return(
        <div className="flex flex-col items-center container gap-3">
            <CreateTransaction categories={categories} accountId={accountId} />
            <div className="container overflow-x-auto rounded-xl">
                <Table striped className="bg-neutral-200/50 dark:bg-black/50 text-black dark:text-white">
                    <Table.Head>
                        <Table.HeadCell>
                            Description
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Amount
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Finish
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Type
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {transactions.map(transaction=>{
                            return(
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`transaction#${transaction.transaction_id}`}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {transaction.description}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {transaction.amount}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {transaction.finish? "Yes": "No"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {transaction.type_of_transaction}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={()=>handleUpdate(transaction)}>
                                            Edit
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={()=>handleDelete(transaction)}>
                                            Delete
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(countOfTransactions / 6)} onPageChange={setCurrentPage} showIcons />
            <UpdateTransaction openModal={openUpdate} setOpenModal={setOpenUpdate} transaction={transaction} categories={categories}  />
            <DeleteTransaction openModal={openDelete} setOpenModal={setOpenDelete} transaction={transaction} />
        </ div>
    )
}