"use client"

import { Modal, Button, Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createAccountAction } from "@/actions/create/createAccountAction"
import { FormEvent } from "react"

export default function CreateAccount({userId}:{userId: number}){
    const [openModal, setOpenModal] = useState(false)
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        await createAccountAction(title, description, userId)
        router.refresh()
        onCloseModal()
    }

    function onCloseModal() {
        setOpenModal(false);
        setTitle('');
        setDescription('')
    }

    return(
        <>
            <Button onClick={() => setOpenModal(true)} className="self-start">Create Account</Button>      
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                            <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Title" />
                            </div>
                            <TextInput id="title" type="text" placeholder="Category's title" onChange={(e)=>setTitle(e.target.value)} defaultValue={title} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <TextInput id="description" type="text" placeholder="Category's description" onChange={(e)=>setDescription(e.target.value)} defaultValue={description} required />
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