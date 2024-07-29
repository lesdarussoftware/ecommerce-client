import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { AuthContext } from "../providers/AuthProvider";
import { useSales } from "../hooks/useSales";

import { Header } from "../components/common/Header";
import { TableComponent } from "../components/common/TableComponent";

import { SALE_COLUMNS } from "../helpers/constants";

export function MySales() {

    const { account } = useContext(AuthContext)
    const { sales, getSales } = useSales()

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
                    <span className="action-btn delete-action-btn">
                        <MdDeleteOutline />
                    </span>
                    <span className="action-btn edit-action-btn">
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
                <TableComponent
                    columns={columns}
                    rows={sales}
                    styleClass="standard-table"
                />
            </main>
        </>
    )
}