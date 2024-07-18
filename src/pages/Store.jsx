import { useContext, useEffect } from "react"

import { AuthContext } from "../providers/AuthProvider"
import { useSales } from "../hooks/useSales"

import { Header } from "../components/common/Header"
import { NewSale } from "../components/sales/NewSale"
import { AuthForm } from "../components/common/AuthForm"
import { SaleItem } from "../components/sales/SaleItem"
import { Purchase } from "../components/sales/Purchase"

export function Store() {

    const { auth } = useContext(AuthContext)

    const { sales, getSales, createSale, register, setRegister, purchase, setPurchase } = useSales()

    useEffect(() => {
        getSales()
    }, [])

    return (
        <>
            <Header />
            <main>
                {register && auth ?
                    <NewSale handleSubmit={(e, formData, validate, reset) => createSale(e, formData, validate, reset)} /> :
                    <>
                        {auth ? <button type="button" onClick={() => setRegister(true)}>Vender</button> : <AuthForm />}
                        {purchase && auth ?
                            <Purchase sale={purchase} setPurchase={setPurchase} /> :
                            <div className="store-container">
                                {sales.map(s => <SaleItem key={s.id} sale={s} setPurchase={setPurchase} />)}
                            </div>
                        }
                    </>
                }
            </main>
        </>
    )
}