import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { type transactions } from '@prisma/client';

export default function Transactions({transactions}: {transactions: transactions[] | undefined}){
    return(
        <div className='container overflow-x-auto rounded-xl'>
            <Table striped className="bg-neutral-200/50 dark:bg-black/50 text-black dark:text-white">
                <TableHead>
                    <TableHeadCell>
                        Description
                    </TableHeadCell>
                    <TableHeadCell>
                        Finish
                    </TableHeadCell>
                    <TableHeadCell>
                        Type
                    </TableHeadCell>
                    <TableHeadCell>
                        Amount
                    </TableHeadCell>
                </TableHead>
                <TableBody>
                    {transactions?.map(transaction => (
                        <TableRow>
                            <TableCell>
                                    {transaction.description}
                           </TableCell>
                            <TableCell>
                                {transaction.finish? "Yes": "No"}
                            </TableCell>
                            <TableCell>
                                {transaction.type_of_transaction}
                            </TableCell>
                            <TableCell className='font-semibold'>
                                {transaction.amount}
                            </TableCell>
                        </TableRow>         
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}