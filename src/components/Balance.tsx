import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

export default function Balance({incomes, expenses, total}: {incomes: number, expenses: number, total:number}){
    return(
        <div className='container overflow-x-auto rounded-xl'>
            <Table striped className="bg-neutral-200/50 dark:bg-black/50 text-black dark:text-white">
                <TableHead>
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
                <TableBody>
                    <TableRow>
                        <TableCell>
                        {incomes}
                        </TableCell>
                        <TableCell>
                            {expenses}
                        </TableCell>
                        <TableCell className='font-semibold'>
                            {total}
                        </TableCell>
                    </TableRow>         
                </TableBody>
            </Table>
        </div>
    )
}