import { useContext } from 'react'
import { ethers } from 'ethers'

import { AuthContext } from '../../providers/AuthProvider'
import { useForm } from '../../hooks/useForm'
import { ModalComponent } from '../common/ModalComponent'

export function Purchase({ sale, setOpen, isOpen }) {

    const { contract } = useContext(AuthContext)
    const { formData, reset } = useForm({
        defaultData: {
            amount: sale.price,
            to: sale.seller.trim(),
            sale_id: sale.id
        },
        rules: {}
    })

    const handleConfirm = async () => {
        try {
            const amountInWei = ethers.parseEther(formData.amount.toFixed(8))
            await contract.receivePayment(amountInWei, formData.to, formData.sale_id, { value: amountInWei })
            reset(setOpen)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={() => reset(setOpen)}>
            <button type="button" onClick={() => handleConfirm()}>
                Confirmar
            </button>
            <button
                type='button'
                className='secondary-btn'
                onClick={() => reset(setOpen)}
            >
                Cancelar
            </button>
        </ModalComponent>
    )
}