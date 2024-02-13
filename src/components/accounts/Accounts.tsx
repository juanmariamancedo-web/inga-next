"use client"
import { accounts_balances } from "@prisma/client"
import { Table, Pagination } from "flowbite-react"
import CreateAccount from "./CreateAccount"
import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import DeleteAccount from "./DeleteAccount"
import UpdateAccount from "./UpdateAccount"
import Link from "next/link"

export default function Accounts({
    accounts,
    countOfAccounts, 
    page,
    userId
}: {
    accounts: accounts_balances[],
    countOfAccounts: number, 
    page: number,
    userId: number
}){
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)

    const [account, setAccount] = useState<accounts_balances>()

    const [currentPage, setCurrentPage] = useState(page)

    const {replace} = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    function handleUpdate(account: accounts_balances){
        setOpenUpdate(true)
        setAccount(account)
    }
    
    function handleDelete(account: accounts_balances){
        setOpenDelete(true)
        setAccount(account)
    }

    useEffect(()=>{
        const params = new URLSearchParams(searchParams)

        params.set("page", currentPage.toString())

        replace(`${pathname}?${params}`, {scroll: false})
    }, [currentPage])

    return(
        <div className="flex flex-col items-center container gap-3">
            <CreateAccount userId={userId} />
            <div className="container overflow-x-auto rounded-xl">
                <Table striped className="bg-neutral-200/50 dark:bg-black/50 text-black dark:text-white">
                    <Table.Head>
                        <Table.HeadCell>
                            Title
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Income
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Expense
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Balance
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {accounts.map(account=>{
                            return(
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`account#${account.account_id}`}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <Link href={`/accounts/${account.title}`} className="underline">
                                            {account.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {account.total_income}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {account.total_expense}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {account.balance}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={()=> handleUpdate(account)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={()=> handleDelete(account)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Delete
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(countOfAccounts / 6)} onPageChange={setCurrentPage} showIcons />
            <DeleteAccount openModal={openDelete} setOpenModal={setOpenDelete} account={account} />
            <UpdateAccount openModal={openUpdate} setOpenModal={setOpenUpdate} account={account} />
        </ div>
    )
}