'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { categories_transactions } from '@prisma/client';
import { FormEvent } from 'react';
import updateCategoryAction from '@/actions/update/updateCategoryAction';
import { useRouter } from 'next/navigation';

export default function UpdateCategory({
  openModal, 
  setOpenModal, 
  category,
}: {
  openModal: boolean, 
  setOpenModal: Dispatch<SetStateAction<boolean>>, 
  category: categories_transactions | undefined,
}) {
  const [title, setTitle] = useState<string>();
  const router = useRouter()

  useEffect(()=>{
    setTitle(category?.title)
  }, [category])

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    await updateCategoryAction(category?.category_transaction_id as number, title as string)
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
                        <Label htmlFor="title" value={category?.title} />
                    </div>
                    <TextInput id="title" type="text" placeholder="Category's title" onChange={(e)=>setTitle(e.target.value)} defaultValue={category?.title} required />
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
