import { useContext } from 'react'
import { ethers } from 'ethers'

import { useForm } from '../../hooks/useForm'
import { ContractContext } from '../../providers/ContractProvider'

export function Purchase({ sale, setPurchase }) {

    const { contract } = useContext(ContractContext)
    const { formData, handleChange, reset } = useForm({
        defaultData: {
            amount: 0.00,
            to: sale.seller.trim()
        },
        rules: {}
    })

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const amountInWei = ethers.parseEther(formData.amount.toString())
            await contract.receivePayment(amountInWei, formData.to, { value: amountInWei })
            setPurchase(null)
            reset()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form className="purchase-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Monto</label>
                    <input
                        type="number"
                        name='amount'
                        step="0.01"
                        value={formData.amount}
                        onChange={e => handleChange({
                            target: {
                                name: 'amount',
                                value: Math.abs(parseFloat(e.target.value).toFixed(2))
                            }
                        })}
                    />
                </div>
                <input
                    type="submit"
                    value="Enviar"
                    disabled={formData.amount <= 0}
                />
                <button
                    type='button'
                    className='secondary-btn'
                    onClick={() => {
                        setPurchase(null)
                        reset()
                    }}
                >
                    Cancelar
                </button>
            </form>
        </div>
    )
}