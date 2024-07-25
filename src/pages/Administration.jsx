import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

import { Header } from "../components/common/Header";
import { TableComponent } from "../components/common/TableComponent";

import { OWNER_ADDRESS } from "../helpers/env";
import { useSales } from "../hooks/useSales";

export function Administration() {

    const { account } = useContext(AuthContext)

    const navigate = useNavigate()

    const { sales, getSales } = useSales()

    useEffect(() => {
        if (account !== OWNER_ADDRESS) {
            return navigate('/')
        } else {
            getSales({ query: '' })
        }
    }, [])

    const columns = useMemo(() => [

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