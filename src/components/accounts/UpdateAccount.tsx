import { accounts_balances } from "@prisma/client";
import { Modal, TextInput, Button, Label } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import updateAccountAction from "@/actions/update/updateAccountAction";

export default function UpdateAccount({
    openModal, 
    setOpenModal, 
    account,
  }: {
    openModal: boolean, 
    setOpenModal: Dispatch<SetStateAction<boolean>>, 
    account: accounts_balances | undefined,
  }){

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string | null>();

    useEffect(()=>{
        setTitle(account?.title)
        setDescription(account?.description)
    }, [account, openModal])

    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
    
        await updateAccountAction(account?.account_id as number, title as string, description as string)
        router.refresh()
        setOpenModal(false)
    }

    return (
        <Modal show={openModal} size="md" onClose={()=> setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title:" />
                        </div>
                        <TextInput id="title" type="text" placeholder="Category's title" onChange={(e)=>setTitle(e.target.value)} defaultValue={account?.title} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description:" />
                        </div>
                        <TextInput id="description" type="text" placeholder="Category's description" onChange={(e)=>setDescription(e.target.value)} defaultValue={account?.description || ""} required />
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button type="submit">Edit</Button>
                      <Button color="failure" >No, cancel</ Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
      );
}