import { createContext, useEffect, useState } from "react"
import { ethers } from 'ethers'

import { CONTRACT_ADDRESS } from "../helpers/env"
import { abi } from '../helpers/contract.json'

export const AuthContext = createContext({
    account: null,
    setAccount: () => { },
    provider: null,
    setProvider: () => { },
    signer: null,
    setSigner: () => { },
    contract: null,
    setContract: () => { }
})

export function AuthProvider({ children }) {

    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    useEffect(() => {
        connectMetaMask()
    }, [])

    async function connectMetaMask() {
        let newProvider
        let newSigner
        let newContract
        if (window.ethereum == null) {
            console.log("MetaMask not installed using read-only defaults")
            newProvider = ethers.getDefaultProvider()
        } else {
            newProvider = new ethers.BrowserProvider(window.ethereum)
            newSigner = await newProvider.getSigner()
            newContract = new ethers.Contract(CONTRACT_ADDRESS, abi, newSigner)
        }
        setProvider(newProvider)
        setSigner(newSigner)
        setContract(newContract)
        setAccount(newSigner.address)
    }

    return (
        <AuthContext.Provider value={{
            account,
            setAccount,
            provider,
            setProvider,
            signer,
            setSigner,
            contract,
            setContract
        }}>
            {children}
        </AuthContext.Provider>
    )
}