import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers'

import { AuthContext } from "../providers/AuthProvider";
import { ContractContext } from "../providers/ContractProvider";

import { Header } from "../components/common/Header";

import { TRANSACTION_STATUS, TRANSACTION_STATUS_LIST } from "../helpers/constants";

export function History() {

    const { auth } = useContext(AuthContext)

    const navigate = useNavigate()

    const { contract } = useContext(ContractContext)

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        (async () => {
            if (!auth) {
                return navigate('/')
            } else if (contract) {
                const result = await contract.getMyTransactions()
                setTransactions(result.map(item => ({
                    id: parseInt(item[0]),
                    type: item[1] === auth ? 'Compra' : item[2] === auth ? 'Venta' : '',
                    counterpart: item[1] === auth ? item[2] : item[2] === auth ? item[1] : '',
                    amount: parseFloat(ethers.formatEther(item[3])).toFixed(2),
                    status: TRANSACTION_STATUS_LIST[parseInt(item[4])],
                    date: new Date(parseInt(item[5]) * 1000).toLocaleString({}, { hour12: false })
                })))
            }
        })()
    }, [contract])

    const handleApproveBySeller = async (id) => {
        await contract.approveBySeller(id)
        setTransactions(transactions.map(t => {
            if (t.id !== parseInt(id)) return t
            return { ...t, status: TRANSACTION_STATUS.SELLER_APPROVED }
        }))
    }

    const handleApproveByBuyer = async (id) => {
        await contract.approveByBuyer(id)
        setTransactions(transactions.map(t => {
            if (t.id !== parseInt(id)) return t
            return { ...t, status: TRANSACTION_STATUS.ENDED }
        }))
    }

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
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => {
                            return (
                                <tr key={t.id}>
                                    <td>{t.id + 1}</td>
                                    <td>{t.type}</td>
                                    <td>{t.counterpart}</td>
                                    <td>{t.amount}</td>
                                    <td>{t.date}</td>
                                    <td>{t.status}</td>
                                    <td>
                                        {t.status === TRANSACTION_STATUS.PENDING && t.type === 'Venta' &&
                                            <button type="button" onClick={() => handleApproveBySeller(t.id)}>
                                                Indicar entrega
                                            </button>
                                        }
                                        {t.status === TRANSACTION_STATUS.SELLER_APPROVED && t.type === 'Compra' &&
                                            <button type="button" onClick={() => handleApproveByBuyer(t.id)}>
                                                Aprobar recepción
                                            </button>
                                        }
                                        {t.status === TRANSACTION_STATUS.SELLER_APPROVED && t.type === 'Venta' &&
                                            <button type="button">
                                                Apelar
                                            </button>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </main>
        </>
    )
}