import { useContext } from "react";
import { ethers } from 'ethers'

import { UserContext } from "../providers/UserProvider";
import { useContract } from "../hooks/useContract";
import { useForm } from "../hooks/useForm";

import { Header } from "../components/common/Header";

export function Home() {

    const { privateKey, role } = useContext(UserContext)

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
            <main>
                {privateKey && role &&
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="amount">Monto</label>
                        <input type="number" name='amount' step="0.01" value={formData.amount} onChange={handleChange} />
                        <input type="submit" value="Enviar" />
                    </form>
                }
            </main>
        </>
    )
}