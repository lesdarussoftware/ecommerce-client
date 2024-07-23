import { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { useApi } from "./useApi";

import { SALE_URL } from "../helpers/urls";
import { STATUS_CODES } from "../helpers/constants";

export function useSales() {

    const { token } = useContext(AuthContext)

    const { handleQuery } = useApi()

    const [sales, setSales] = useState([])
    const [register, setRegister] = useState(false)
    const [purchase, setPurchase] = useState(null)

    async function getSales({ query }) {
        const { status, data } = await handleQuery({
            url: SALE_URL + (query ? query : ''),
            method: 'GET',
            contentType: 'application/json'
        })
        if (status === STATUS_CODES.OK) {
            setSales(data)
        } else {
            console.log(data)
        }
    }

    async function createSale(e, newSale, validate, reset) {
        e.preventDefault()
        if (validate()) {
            const submitData = new FormData()
            submitData.append('seller', newSale.seller)
            submitData.append('title', newSale.title)
            submitData.append('description', newSale.description)
            submitData.append('price', newSale.price)
            newSale.images.forEach(i => submitData.append('files', i))
            const { status, data } = await handleQuery({
                url: SALE_URL,
                method: 'POST',
                authorization: token,
                body: submitData
            })
            if (status === STATUS_CODES.CREATED) {
                reset()
                setRegister(false)
            }
            console.log(data)
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