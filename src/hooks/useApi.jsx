import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";

import { STATUS_CODES } from "../helpers/constants";
import { useAuth } from "./useAuth";

export function useApi() {

    const { account, setToken } = useContext(AuthContext)

    const { generateAuthToken } = useAuth()

    async function handleQuery({ url, method, contentType = undefined, authorization = undefined, body = undefined }) {
        try {
            let headers = {}
            if (contentType) headers['Content-Type'] = contentType
            if (authorization) headers['Authorization'] = authorization
            const res = await fetch(url, {
                headers,
                method,
                body
            })
            const data = await res.json()
            if (res.status === STATUS_CODES.FORBIDDEN) {
                const { status: refreshStatus, data: refreshData } = await generateAuthToken({ account })
                if (refreshStatus === STATUS_CODES.OK) {
                    setToken(refreshData.token)
                    return handleQuery({
                        url,
                        method,
                        contentType,
                        authorization: refreshData.token,
                        body
                    })
                } else {
                    return { status: refreshStatus, data: refreshData }
                }
            } else {
                return { status: res.status, data }
            }
        } catch (e) {
            return { status: STATUS_CODES.SERVER_ERROR, data: e }
        }
    }

    return { handleQuery }
}