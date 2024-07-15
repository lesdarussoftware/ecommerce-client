import { useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import { useContract } from './hooks/useContract'

function App() {

  const { contract: contractForBuyer } = useContract('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')
  const { contract: contractForAdmin } = useContract('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')

  const [transaction, setTransaction] = useState({
    amount: 0,
    to: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'
  })

  const handleChange = e => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const amountInWei = ethers.parseEther(transaction.amount.toString())
    await contractForBuyer.receivePayment(amountInWei, transaction.to, {
      value: amountInWei
    })
  }

  const getTransactions = async () => {
    const result = await contractForAdmin.getTransactions()
    console.log(result)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Monto</label>
        <input type="number" name='amount' value={transaction.amount} onChange={handleChange} />
        <input type="submit" value="Enviar" />
      </form>
      <button type='button' onClick={getTransactions}>
        Obtener transacciones
      </button>
    </>
  )
}

export default App
