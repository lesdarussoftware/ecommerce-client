import { useContext, useEffect, useMemo } from "react";

import { AuthContext } from "../providers/AuthProvider";

import { Header } from "../components/common/Header";
import { TableComponent } from "../components/common/TableComponent";
import { useNavigate } from "react-router-dom";
import { useSales } from "../hooks/useSales";

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
        {
            id: 'id',
            label: '#',
            accessor: 'id'
        }
    ], [])

    return (
        <>
            <Header />
            <main>
                <TableComponent
                    columns={columns}
                    rows={sales}
                />
            </main>
        </>
    )
}