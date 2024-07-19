import { useContext } from "react"
import { JsonRpcProvider, Wallet, Contract } from 'ethers'

import { AuthContext } from "../../providers/AuthProvider"
import { ContractContext } from "../../providers/ContractProvider"
import { useForm } from "../../hooks/useForm"

import { CONTRACT_ADDRESS, BLOCKCHAIN_PROVIDER } from "../../helpers/env"
import { abi } from '../../helpers/contract.json'

export function AuthForm() {

    const { setAuth } = useContext(AuthContext)
    const { setContract } = useContext(ContractContext)

    const { formData, errors, validate, handleChange, reset } = useForm({
        defaultData: { privateKey: '' },
        rules: {
            privateKey: {
                required: true,
                minLength: 66,
                maxLength: 66
            }
        }
    })

    const handleAuthenticate = (e) => {
        e.preventDefault()
        if (validate()) {
            const runner = new Wallet(formData.privateKey.trim(), new JsonRpcProvider(BLOCKCHAIN_PROVIDER))
            setAuth(runner.address)
            setContract(new Contract(CONTRACT_ADDRESS, abi, runner))
            reset()
        }
    }

    return (
        <form className="auth-form" onSubmit={handleAuthenticate}>
            <div className="form-group">
                <input
                    type="text"
                    name="privateKey"
                    placeholder="Llave privada"
                    value={formData.privateKey.trim()}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Guardar"
                disabled={
                    formData.privateKey.length === 0 ||
                    errors.privateKey?.type === 'required' ||
                    (errors.privateKey?.type === 'maxLength' || errors.privateKey?.type === 'minLength')
                }
            />
        </form>
    )
}