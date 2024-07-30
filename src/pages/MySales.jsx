import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import { AuthContext } from "../providers/AuthProvider";
import { useSales } from "../hooks/useSales";

import { Header } from "../components/common/Header";
import { TableComponent } from "../components/common/TableComponent";
import { ModalComponent } from "../components/common/ModalComponent";
import { NewSale } from "../components/sales/NewSale";

import { OPEN_TYPES, SALE_COLUMNS } from "../helpers/constants";

export function MySales() {

    const { account } = useContext(AuthContext)
    const { sales, getSales, open, setOpen, updateSale, workOn, setWorkOn } = useSales()

    const navigate = useNavigate()

    useEffect(() => {
        if (!account) {
            return navigate('/')
        } else {
            getSales({ query: `?seller=${account}` })
        }
    }, [account])

    const columns = useMemo(() => [
        ...SALE_COLUMNS,
        {
            id: 'actions',
            label: 'Acciones',
            accessor: (row) => (
                <div className="actions-container">
                    <span className="action-btn edit-action-btn" onClick={() => {
                        setWorkOn(row)
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
                <NewSale
                    handleSubmit={(e, formData, validate, reset) => updateSale(e, formData, validate, reset)}
                    isOpen={open === OPEN_TYPES.EDIT}
                    setOpen={setOpen}
                    defaultData={workOn}
                />
                <ModalComponent isOpen={open === OPEN_TYPES.DELETE} onClose={() => setOpen(null)}>
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