import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers'

import { AuthContext } from "../providers/AuthProvider";
import { useContract } from "../hooks/useContract";

import { Header } from "../components/common/Header";

import { TRANSACTION_STATUS } from "../helpers/constants";

export function History() {

    const { auth } = useContext(AuthContext)

    const navigate = useNavigate()

    const { contract, address } = useContract()

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        (async () => {
            if (!auth) {
                return navigate('/')
            } else if (contract) {
                const result = await contract.getMyTransactions()
                setTransactions(result.map(item => ({
                    id: parseInt(item[0]) + 1,
                    type: item[1] === address ? 'Compra' : item[2] === address ? 'Venta' : '',
                    counterpart: item[1] === address ? item[2] : item[2] === address ? item[1] : '',
                    amount: parseFloat(ethers.formatEther(item[3])).toFixed(2),
                    status: TRANSACTION_STATUS[parseInt(item[4])],
                    date: new Date(parseInt(item[5]) * 1000).toLocaleString({}, { hour12: false })
                })))
            }
        })()
    }, [contract])

    return (
        <>
            <Header />
            <main>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tipo</th>
                            <th>Contraparte</th>
                            <th>Monto (ETH)</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => {
                            return (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.type}</td>
                                    <td>{t.counterpart}</td>
                                    <td>{t.amount}</td>
                                    <td>{t.date}</td>
                                    <td>{t.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </main>
        </>
    )
}