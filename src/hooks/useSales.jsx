import { useState } from "react";

import { SALE_URL } from "../helpers/urls";
import { STATUS_CODES } from "../helpers/constants";

export function useSales() {

    const [sales, setSales] = useState([])
    const [register, setRegister] = useState(false)
    const [purchase, setPurchase] = useState(null)

    async function getSales() {
        try {
            const res = await fetch(SALE_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            if (res.status === STATUS_CODES.OK) {
                setSales(data)
            } else {
                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function createSale(e, newSale, validate, reset) {
        e.preventDefault()
        if (validate()) {
            const submitData = new FormData()
            submitData.append('seller', newSale.seller)
            submitData.append('description', newSale.description)
            newSale.images.forEach(i => submitData.append('files', i))
            try {
                const res = await fetch(SALE_URL, {
                    method: 'POST',
                    body: submitData
                })
                const data = await res.json()
                if (res.status === STATUS_CODES.CREATED) {
                    reset()
                    setRegister(false)
                } else {
                    console.log(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    return {
        sales,
        getSales,
        createSale,
        register,
        setRegister,
        purchase,
        setPurchase
    }
}