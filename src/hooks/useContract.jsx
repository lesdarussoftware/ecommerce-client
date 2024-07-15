import { useEffect, useState } from "react";
import { JsonRpcProvider, Wallet, Contract } from 'ethers'

import { BLOCKCHAIN_PROVIDER, CONTRACT_ADDRESS } from "../helpers/env";
import { abi } from '../helpers/contract.json'

export function useContract(PRIVATE_KEY) {

    const [commerceContract, setCommerceContract] = useState(null)

    useEffect(() => {
        setCommerceContract(
            new Contract(
                CONTRACT_ADDRESS,
                abi,
                new Wallet(PRIVATE_KEY, new JsonRpcProvider(BLOCKCHAIN_PROVIDER))
            )
        )
    }, [])

    return { contract: commerceContract }
}