import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers'

import { AuthContext } from "../providers/AuthProvider";
import { ContractContext } from "../providers/ContractProvider";

import { Header } from "../components/common/Header";
import { TableComponent } from "../components/common/TableComponent";

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
                    id: item[0],
                    sale_id: item[6],
                    type: item[1] === auth ? 'Compra' : item[2] === auth ? 'Venta' : '',
                    counterpart: item[1] === auth ? item[2] : item[2] === auth ? item[1] : '',
                    amount: ethers.formatEther(item[3]),
                    status: TRANSACTION_STATUS_LIST[parseInt(item[4])],
                    date: new Date(parseInt(item[5]) * 1000).toLocaleString({}, { hour12: false })
                })))
            }
        })()
    }, [contract])

    const columns = useMemo(() => [
        {
            id: 'id',
            label: '#',
            accessor: 'id'
        },
        {
            id: 'sale_id',
            label: 'N° venta',
            accessor: 'sale_id'
        },
        {
            id: 'type',
            label: 'Tipo',
            accessor: 'type'
        },
        {
            id: 'counterpart',
            label: 'Contraparte',
            accessor: 'counterpart'
        },
        {
            id: 'amount',
            label: 'Monto (ETH)',
            accessor: 'amount'
        },
        {
            id: 'date',
            label: 'Fecha',
            accessor: 'date'
        },
        {
            id: 'status',
            label: 'Estado',
            accessor: 'status'
        },
        {
            id: 'action',
            label: 'Acción',
            accessor: (row) => (
                <>
                    {row.status === TRANSACTION_STATUS.PENDING && row.type === 'Venta' &&
                        <button type="button" onClick={() => handleApproveBySeller(row.id)}>
                            Indicar entrega
                        </button>
                    }
                    {row.status === TRANSACTION_STATUS.SELLER_APPROVED && row.type === 'Compra' &&
                        <button type="button" onClick={() => handleApproveByBuyer(row.id)}>
                            Aprobar recepción
                        </button>
                    }
                    {row.status === TRANSACTION_STATUS.SELLER_APPROVED && row.type === 'Venta' &&
                        <button type="button">
                            Apelar
                        </button>
                    }
                </>
            )
        }
    ], [])

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
                <TableComponent
                    columns={columns}
                    rows={transactions}
                    styleClass="history-table"
                />
            </main>
        </>
    )
}