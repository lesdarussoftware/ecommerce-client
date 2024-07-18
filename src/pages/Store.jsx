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
                {auth ?
                    <>
                        {!purchase && !register &&
                            <button type="button" onClick={() => setRegister(true)}>
                                Vender
                            </button>
                        }
                    </> :
                    <AuthForm />
                }
                {register &&
                    <NewSale
                        handleSubmit={(e, formData, validate, reset) => createSale(e, formData, validate, reset)}
                        setRegister={setRegister}
                    />
                }
                {purchase && <Purchase sale={purchase} setPurchase={setPurchase} />}
                {!register && !purchase &&
                    <div className="store-container">
                        {sales.map(s => <SaleItem key={s.id} sale={s} setPurchase={setPurchase} />)}
                    </div>
                }
            </main>
        </>
    )
}