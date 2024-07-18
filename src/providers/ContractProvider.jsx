import { createContext, useState } from "react";

export const ContractContext = createContext({
    contract: null,
    setContract: () => { }
})

export function ContractProvider({ children }) {

    const [contract, setContract] = useState(null)

    return (
        <ContractContext.Provider value={{ contract, setContract }}>
            {children}
        </ContractContext.Provider>
    )
}