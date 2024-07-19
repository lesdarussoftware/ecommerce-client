import { useEffect } from "react"

import { useSales } from "../hooks/useSales"

import { Header } from "../components/common/Header"
import { NewSale } from "../components/sales/NewSale"
import { SaleItem } from "../components/sales/SaleItem"
import { Purchase } from "../components/sales/Purchase"

export function Store() {

    const { sales, getSales, createSale, register, setRegister, purchase, setPurchase } = useSales()

    useEffect(() => {
        getSales()
    }, [])

    return (
        <>
            <Header />
            <main>
                {!purchase && !register &&
                    <button type="button" onClick={() => setRegister(true)}>
                        Vender
                    </button>
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