import { useContext, useEffect, useState } from "react";
import { JsonRpcProvider, Wallet, Contract } from 'ethers'

import { UserContext } from "../providers/UserProvider";

import { BLOCKCHAIN_PROVIDER, CONTRACT_ADDRESS } from "../helpers/env";
import { abi } from '../helpers/contract.json'

export function useContract() {

    const { privateKey } = useContext(UserContext)

    const [commerceContract, setCommerceContract] = useState(null)

    useEffect(() => {
        if (privateKey) {
            setCommerceContract(
                new Contract(
                    CONTRACT_ADDRESS,
                    abi,
                    new Wallet(privateKey, new JsonRpcProvider(BLOCKCHAIN_PROVIDER))
                )
            )
        }
    }, [privateKey])

    return { contract: commerceContract }
}