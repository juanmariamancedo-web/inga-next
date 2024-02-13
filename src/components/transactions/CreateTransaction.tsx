"use client"

import { useState, useMemo, FormEvent, useEffect } from "react";
import { Modal, TextInput, Label, Select, Button } from "flowbite-react";
import { categories_transactions, type_of_transaction } from "@prisma/client";
import createTransactionAction from "@/actions/create/createTransaction";
import { useRouter } from "next/navigation";

export default function CreateTransaction({
    categories,
    accountId
  }: {
    categories: categories_transactions[],
    accountId: number
}){
    const [openModal, setOpenModal] = useState(false)

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0)
    const [finish, setFinish] = useState(false)
    const [typeOfTransaction, setTypeOfTransaction] = useState<type_of_transaction>("income")
    const [category, setCategory] = useState<number>()
    
    const router = useRouter()
    
    const filterCategories = useMemo(()=>{
        return categories.filter((category)=>{
            return category.type_of_transaction == typeOfTransaction
        })
    }, [typeOfTransaction])
    
    useEffect(()=>{
        setCategory(filterCategories[0].category_transaction_id)
    }, [filterCategories, openModal])

    useEffect(()=>{
        setDescription("")
        setAmount(0)
        setFinish(false)
        setTypeOfTransaction('income')
    }, [openModal])
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
    
        await createTransactionAction(amount, finish, description, accountId, typeOfTransaction, category as number)
        router.refresh()
        setOpenModal(false)
    }
    
    return(
        <>
            <Button onClick={() => setOpenModal(true)} className="self-start">Create Transaction</Button>      
            <Modal show={openModal} size="md" onClose={()=>setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <TextInput id="description" type="text" placeholder="Transaction's description" onChange={(e)=>setDescription(e.target.value)} defaultValue={description} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="amount" value="Amount" />
                            </div>
                            <TextInput id="amount" type="number" placeholder="Transaction's amount" onChange={e=>{setAmount(parseInt(e.target.value || "0"))}} defaultValue={amount} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="finish" value="Finish?" />
                            </div>
                            <Select id="finish" required defaultValue={finish? "yes" : "no"} onChange={(e)=>{
                                setFinish(e.target.value == "yes"? true: false)
                            }}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Transaction's type" />
                            </div>
                            <Select id="type" required defaultValue={typeOfTransaction} onChange={(e)=>setTypeOfTransaction(e.target.value as type_of_transaction)}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Transaction's category" />
                            </div>
                            <Select id="type" onChange={(e)=>setCategory(parseInt(e.target.value))} value={category}>
                                {filterCategories.map(category=>(
                                    <option value={category.category_transaction_id} key={`category-createTransaction#${category.category_transaction_id}`}>
                                        {category.title}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex justify-center gap-4">
                        <Button type="submit">Create</Button>
                        <Button color="failure" onClick={()=>setOpenModal(false)}>No, cancel</ Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}