import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { accounts_balances } from "@prisma/client";
import Link from 'next/link';

export default function BalancesOfAccounts({balancesOfAccounts}: {balancesOfAccounts: accounts_balances[]}){
    return(
        <div className="container overflow-x-auto rounded-xl">
            <Table striped className="bg-neutral-200/50 dark:bg-black/50 text-black dark:text-white">
                <TableHead>
                    <TableHeadCell>
                        Titles
                    </TableHeadCell>
                    <TableHeadCell>
                        Incomes
                    </TableHeadCell>
                    <TableHeadCell>
                        Expenses
                    </TableHeadCell>
                    <TableHeadCell>
                        Total
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {balancesOfAccounts.map((balance)=>{
                        return(
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`category#${balance.account_id}`}>
                                <TableCell>
                                    <Link href={`/accounts/${balance.title}`} className='font-semibold underline'>
                                        {balance.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {balance.total_income}
                                </TableCell>
                                <TableCell className='font-semibold'>
                                    {balance.total_expense}
                                </TableCell>
                                <TableCell className='font-semibold'>
                                    {balance.balance}
                                </TableCell>
                            </TableRow>         
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}