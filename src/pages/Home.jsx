import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";

import { AuthForm } from "../components/common/AuthForm";
import { Header } from "../components/common/Header";

export function Home() {

    const { auth } = useContext(AuthContext)

    return (
        <>
            <Header />
            <main>
                {!auth && <AuthForm />}
            </main>
        </>
    )
}