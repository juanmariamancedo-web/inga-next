"use client"
import { Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Dispatch, SetStateAction } from "react";
import { transactions } from "@prisma/client";
import { useRouter } from "next/navigation";
import deleteTransactionAction from "@/actions/delete/deleteTransactionAction";

export default function DeleteTransaction({
    openModal,
    setOpenModal,
    transaction, 
  }: {
    openModal: boolean, 
    setOpenModal: Dispatch<SetStateAction<boolean>>, 
    transaction: transactions | undefined
}){
    const router = useRouter()

    async function handleDelete(){
        await deleteTransactionAction(transaction?.transaction_id as number)
        router.refresh()
        setOpenModal(false)
    }

    return(
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete {transaction?.description}?
                </h3>
                <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                    {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
      </Modal>
    )
}