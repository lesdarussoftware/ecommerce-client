import { ethers } from 'ethers'

import { Header } from "../components/common/Header"
import { useContract } from "../hooks/useContract"
import { useForm } from "../hooks/useForm"

export function Store() {

    const { contract } = useContract()
    const { formData, handleChange, reset } = useForm({
        defaultData: {
            amount: 0.00,
            to: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'
        },
        rules: {}
    })

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const amountInWei = ethers.parseEther(formData.amount.toString())
            await contract.receivePayment(amountInWei, formData.to, { value: amountInWei })
            reset()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Header />
            <form className="purchase-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Monto</label>
                    <input type="number" name='amount' step="0.01" value={formData.amount} onChange={handleChange} />
                </div>
                <input type="submit" value="Enviar" />
            </form>
        </>
    )
}