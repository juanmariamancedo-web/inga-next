"use client"
import { categories_transactions } from "@prisma/client";
import { Table, Pagination } from "flowbite-react";
import DeleteCategory from "./DeleteCategory";
import { useEffect, useState } from "react";
import UpdateCategory from "./UpdateCategory";
import CreateCategoryTransaction from "./CreateCategoryTransaction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Categories({
    categories, 
    countOfCategories, 
    page,
    userId
}: {
    categories: categories_transactions[], 
    countOfCategories: number,
    page: number,
    userId: number
}){
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)

    const [category, setCategory] = useState<categories_transactions>()

    const [currentPage, setCurrentPage] = useState(page)

    const {replace} = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    
    function handleUpdate(category: categories_transactions){
        setOpenUpdate(true)
        setCategory(category)
    }
    
    function handleDelete(category: categories_transactions){
        setOpenDelete(true)
        setCategory(category)
    }

    useEffect(()=>{
        const params = new URLSearchParams(searchParams)

        params.set("page", currentPage.toString())

        replace(`${pathname}?${params}`, {scroll: false})
    }, [currentPage])

    return(
        <div className="flex flex-col items-center gap-3">
            <CreateCategoryTransaction userId={userId} />
            <div className="container overflow-x-auto rounded-xl">
                <Table striped className="bg-neutral-200/50 dark:bg-black/50 text-black dark:text-white">
                    <Table.Head>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {categories.map(category=>{
                            return(
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={`category#${category.category_transaction_id}`}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {category.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {category.type_of_transaction}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button disabled={category.title == "Otros"} onClick={()=> handleUpdate(category)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button disabled={category.title == "Otros"} onClick={()=> handleDelete(category)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Delete
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>

            <Pagination currentPage={currentPage} totalPages={Math.ceil(countOfCategories / 6)} onPageChange={setCurrentPage} showIcons />
            <DeleteCategory openModal={openDelete} setOpenModal={setOpenDelete} category={category} />
            <UpdateCategory openModal={openUpdate} setOpenModal={setOpenUpdate} category={category} />
        </ div>
    )
}