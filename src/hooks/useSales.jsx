import { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { useApi } from "./useApi";

import { SALE_URL } from "../helpers/urls";
import { STATUS_CODES } from "../helpers/constants";

export function useSales() {

    const { token } = useContext(AuthContext)

    const { handleQuery } = useApi()

    const [sales, setSales] = useState([])
    const [purchase, setPurchase] = useState(null)
    const [open, setOpen] = useState(null)

    async function getSales({ query = '', authorization = undefined }) {
        const { status, data } = await handleQuery({
            url: SALE_URL + query,
            method: 'GET',
            contentType: 'application/json',
            authorization
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
                reset(setOpen)
            }
            console.log(data)
        }
    }

    async function handleAllow(id) {
        const { status, data } = await handleQuery({
            url: SALE_URL + `/handle-allowed/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            authorization: token,
            body: JSON.stringify({ is_allowed: true })
        })
        if (status === STATUS_CODES.OK) {
            setSales([...sales.filter(s => s.id !== data.id)])
            setOpen(null)
        } else {
            console.log(data)
        }
    }

    return {
        sales,
        getSales,
        createSale,
        open,
        setOpen,
        purchase,
        setPurchase,
        handleAllow
    }
}