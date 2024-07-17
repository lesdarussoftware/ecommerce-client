import { useContext, useEffect } from "react"

import { AuthContext } from "../providers/AuthProvider"
import { useSales } from "../hooks/useSales"

import { Header } from "../components/common/Header"
import { NewSale } from "../components/sales/NewSale"
import { AuthForm } from "../components/common/AuthForm"

export function Store() {

    const { auth } = useContext(AuthContext)

    const { sales, getSales, createSale, register, setRegister } = useSales()

    useEffect(() => {
        getSales()
    }, [])

    return (
        <>
            <Header />
            <main>
                {register && auth ?
                    <NewSale handleSubmit={(e, formData, validate, reset) => createSale(e, formData, validate, reset)} /> :
                    <div>
                        {auth ? <button type="button" onClick={() => setRegister(true)}>Vender</button> : <AuthForm />}
                        {sales.map(s => {
                            return s.id
                        })}
                    </div>
                }
            </main>
        </>
    )
}