import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers'

import { UserContext } from "../providers/UserProvider";
import { useContract } from "../hooks/useContract";

import { Header } from "../components/common/Header";

import { TRANSACTION_STATUS } from "../helpers/constants";

export function History() {

    const { privateKey, role } = useContext(UserContext)

    const navigate = useNavigate()

    const { contract, address } = useContract()

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        (async () => {
            if (!privateKey || !role) {
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
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo</th>
                        <th>Contraparte</th>
                        <th>Monto</th>
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
        </>
    )
}