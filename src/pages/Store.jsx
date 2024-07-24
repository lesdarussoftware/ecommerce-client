import { useContext, useEffect } from "react"

import { AuthContext } from "../providers/AuthProvider"
import { useSales } from "../hooks/useSales"

import { Header } from "../components/common/Header"
import { NewSale } from "../components/sales/NewSale"
import { SaleItem } from "../components/sales/SaleItem"
import { Purchase } from "../components/sales/Purchase"

import { OPEN_TYPES } from "../helpers/constants"

export function Store() {

    const { account } = useContext(AuthContext)

    const { sales, getSales, createSale, open, setOpen, purchase, setPurchase } = useSales()

    useEffect(() => {
        getSales({ query: `?seller=${account}&only_not=true` })
    }, [account])

    return (
        <>
            <Header />
            <main>
                {account &&
                    <button type="button" onClick={() => setOpen(OPEN_TYPES.REGISTER)}>
                        Vender
                    </button>
                }
                <NewSale
                    handleSubmit={(e, formData, validate, reset) => createSale(e, formData, validate, reset)}
                    isOpen={open === OPEN_TYPES.REGISTER}
                    setOpen={setOpen}
                />
                {purchase &&
                    <Purchase
                        sale={purchase}
                        isOpen={open === OPEN_TYPES.PURCHASE}
                        setOpen={setOpen}
                    />
                }
                <div className="store-container">
                    {sales.map(s => (
                        <SaleItem
                            key={s.id}
                            sale={s}
                            setPurchase={setPurchase}
                            setOpen={setOpen}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}