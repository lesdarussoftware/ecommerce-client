import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import { AuthContext } from "../providers/AuthProvider";
import { useSales } from "../hooks/useSales";

import { Header } from "../components/common/Header";
import { TableComponent } from "../components/common/TableComponent";
import { ModalComponent } from "../components/common/ModalComponent";

import { OWNER_ADDRESS } from "../helpers/env";
import { OPEN_TYPES, SALE_COLUMNS } from "../helpers/constants";

export function Administration() {

    const { account } = useContext(AuthContext)

    const navigate = useNavigate()

    const { sales, getSales, open, setOpen, handleAllow, workOn, setWorkOn } = useSales()

    useEffect(() => {
        if (account !== OWNER_ADDRESS) {
            return navigate('/')
        } else {
            getSales({
                query: '/all',
                authorization: account
            })
        }
    }, [])

    const columns = useMemo(() => [
        ...SALE_COLUMNS,
        {
            id: 'seller',
            label: 'Vendedor',
            accessor: (row) => row.seller.slice(0, 9) + '...'
        },
        {
            id: 'actions',
            label: 'Habilitar',
            accessor: (row) => (
                <div className="actions-container">
                    <span className="action-btn edit-action-btn" onClick={() => {
                        setWorkOn(row.id)
                        setOpen(OPEN_TYPES.EDIT)
                    }}>
                        <FaRegEdit />
                    </span>
                </div>
            )
        }
    ], [])

    return (
        <>
            <Header />
            <main>
                <ModalComponent isOpen={open === OPEN_TYPES.EDIT} onClose={() => setOpen(null)}>
                    <h3 className="modal-h3">¿Habilitar la venta {workOn}?</h3>
                    <div className="modal-btn-panel">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => setOpen(null)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAllow(workOn)}
                        >
                            Confirmar
                        </button>
                    </div>
                </ModalComponent>
                <TableComponent
                    columns={columns}
                    rows={sales}
                    styleClass="standard-table"
                />
            </main>
        </>
    )
}