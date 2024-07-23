import { createContext, useEffect, useState } from "react"
import { ethers } from 'ethers'

import { useAuth } from "../hooks/useAuth"

import { CONTRACT_ADDRESS } from "../helpers/env"
import { abi } from '../helpers/contract.json'
import { STATUS_CODES } from "../helpers/constants"

export const AuthContext = createContext({
    account: null,
    setAccount: () => { },
    provider: null,
    setProvider: () => { },
    signer: null,
    setSigner: () => { },
    contract: null,
    setContract: () => { },
    token: null,
    setToken: () => { }
})

export function AuthProvider({ children }) {

    const { generateAuthToken } = useAuth()

    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        connectMetaMask()
    }, [])

    async function connectMetaMask() {
        let newProvider
        let newSigner
        let newContract
        if (window.ethereum == null) {
            // If MetaMask is not installed, we use the default provider,
            // which is backed by a variety of third-party services (such
            // as INFURA). They do not have private keys installed,
            // so they only have read-only access
            console.log("MetaMask not installed. Using read-only defaults.")
            newProvider = ethers.getDefaultProvider()
        } else {
            // Connect to the MetaMask EIP-1193 object. This is a standard
            // protocol that allows Ethers access to make all read-only
            // requests through MetaMask.
            newProvider = new ethers.BrowserProvider(window.ethereum)
            // It also provides an opportunity to request access to write
            // operations, which will be performed by the private key
            // that MetaMask manages for the user.
            newSigner = await newProvider.getSigner()
            newContract = new ethers.Contract(CONTRACT_ADDRESS, abi, newSigner)
            setSigner(newSigner)
            setContract(newContract)
            setAccount(newSigner.address)
            const { status, data } = await generateAuthToken({ account: newSigner.address })
            if (status === STATUS_CODES.OK) setToken(data.token)
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        setProvider(newProvider)
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
            }
        }
    }

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0 && accounts[0] !== account) {
            const newProvider = new ethers.BrowserProvider(window.ethereum)
            const newSigner = await newProvider.getSigner()
            const newContract = new ethers.Contract(CONTRACT_ADDRESS, abi, newSigner)
            setProvider(newProvider)
            setSigner(newSigner)
            setContract(newContract)
            setAccount(accounts[0])
            const { status, data } = await generateAuthToken({ account: accounts[0] })
            if (status === STATUS_CODES.OK) setToken(data.token)
        }
    };

    return (
        <AuthContext.Provider value={{
            account,
            setAccount,
            provider,
            setProvider,
            signer,
            setSigner,
            contract,
            setContract,
            token,
            setToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}