import { createContext, useState } from "react";

export const UserContext = createContext({
    privateKey: null,
    setPrivateKey: () => { },
    role: null,
    setRole: () => { }
})

export function UserProvider({ children }) {

    const [privateKey, setPrivateKey] = useState(null)
    const [role, setRole] = useState(null)

    return (
        <UserContext.Provider value={{ privateKey, setPrivateKey, role, setRole }}>
            {children}
        </UserContext.Provider>
    )
}