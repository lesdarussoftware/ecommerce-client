import { useContext, useEffect, useState } from "react";
import { JsonRpcProvider, Wallet, Contract } from 'ethers'

import { AuthContext } from "../providers/AuthProvider";

import { BLOCKCHAIN_PROVIDER, CONTRACT_ADDRESS } from "../helpers/env";
import { abi } from '../helpers/contract.json'

export function useContract() {

    const { auth } = useContext(AuthContext)

    const [commerceContract, setCommerceContract] = useState(null)
    const [address, setAddress] = useState('')

    useEffect(() => {
        if (auth) {
            const runner = new Wallet(auth, new JsonRpcProvider(BLOCKCHAIN_PROVIDER))
            setAddress(runner.address)
            setCommerceContract(
                new Contract(
                    CONTRACT_ADDRESS,
                    abi,
                    runner
                )
            )
        }
    }, [auth])

    return { contract: commerceContract, address }
}