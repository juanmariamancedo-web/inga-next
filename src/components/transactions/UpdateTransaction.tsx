"use client"

import { Modal, Label, TextInput, Button, Select } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect } from "react"
import { categories_transactions, transactions, type_of_transaction } from "@prisma/client"
import { useState, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import updateTransaction from "@/actions/update/updateTransaction";

export default function UpdateTransaction({
    openModal, 
    setOpenModal, 
    transaction,
    categories
  }: {
    openModal: boolean, 
    setOpenModal: Dispatch<SetStateAction<boolean>>, 
    transaction: transactions | undefined,
    categories: categories_transactions[]
  }){
    const [description, setDescription] = useState<string>();
    const [amount, setAmount] = useState<number>()
    const [finish, setFinish] = useState<boolean>()
    const [typeOfTransaction, setTypeOfTransaction] = useState<type_of_transaction>("income")
    const [category, setCategory] = useState<number>()

    
    const router = useRouter()
    
    useEffect(()=>{
        setDescription(transaction?.description)
        setAmount(transaction?.amount)
        setFinish(transaction?.finish)
        setTypeOfTransaction(transaction?.type_of_transaction || "income")
    }, [transaction])
    
    // const [ filterCategories, category, setCategory ] = useFilterCategories(categories, typeOfTransaction, transaction)
    
    const filterCategories = useMemo(()=>{
        return categories.filter((category)=>{
            return category.type_of_transaction == typeOfTransaction
        })
    }, [typeOfTransaction, transaction])
    
    useEffect(()=>{
        setCategory(filterCategories[0].category_transaction_id)
    }, [filterCategories, transaction])
    

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
    
        await updateTransaction(transaction?.transaction_id, description as string, amount as number, typeOfTransaction as type_of_transaction, category as number)
        router.refresh()
        setOpenModal(false)
    }    

    return (
        <Modal show={openModal} size="md" onClose={()=>setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput id="description" type="text" placeholder="Transaction's description" onChange={(e)=>setDescription(e.target.value)} defaultValue={transaction?.description} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="Amount" />
                        </div>
                        <TextInput id="amount" type="number" placeholder="Transaction's amount" onChange={e=>{
                            const valor = e.target.value.trim();

                            if (valor.length > 1 && valor.charAt(0) === '0') {
                            e.target.value = valor.slice(1);
                            }
                            
                            setAmount(parseInt(e.target.value || "0"))
                        }} defaultValue={transaction?.amount} required />
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
                        <Select id="type" required defaultValue={transaction?.type_of_transaction} onChange={(e)=>setTypeOfTransaction(e.target.value as type_of_transaction)}>
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
                                <option value={category.category_transaction_id} key={`category#${category.category_transaction_id}`}>
                                    {category.title}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button type="submit">Edit</Button>
                      <Button color="failure" onClick={()=>setOpenModal(false)}>No, cancel</ Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
      );
}