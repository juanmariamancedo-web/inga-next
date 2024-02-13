"use client"
import { FormEvent, useState } from "react"
import { type_of_transaction } from "@prisma/client"
import { createCategoryTransactionAction } from "@/actions/create/createCategoryTransaction"
import { Modal, TextInput, Label, Button, Select } from "flowbite-react"
import { useRouter } from "next/navigation"

export default function CreateCategoryTransaction({userId}:{userId: number}){
    const [title, setTitle] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [typeOfTransaction, setTypeOfTransaction] = useState<type_of_transaction>("expense")
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        await createCategoryTransactionAction(title, typeOfTransaction, userId)
        router.refresh()
        onCloseModal()
    }

    function onCloseModal() {
        setOpenModal(false);
        setTitle('');
        setTypeOfTransaction("income")
      }

    return(
        <>
            <Button onClick={() => setOpenModal(true)} className="self-start">Create Category</Button>      
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Create category" />
                            </div>
                            <TextInput id="title" type="text" placeholder="Category's title" onChange={(e)=>setTitle(e.target.value)} defaultValue={title} required />
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="countries" value="Select the transaction's category" />
                            </div>
                            <Select id="countries" value={typeOfTransaction} onChange={(e)=>{setTypeOfTransaction(e.target.value as type_of_transaction)}} required>
                                <option value={"income"}>Income</option>
                                <option value={"expense"}>Expense</option>
                            </Select>
                        </div>
                        <div className="flex justify-center gap-4">
                        <Button type="submit">Create</Button>
                        <Button color="failure" onClick={onCloseModal} >No, cancel</ Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )

}