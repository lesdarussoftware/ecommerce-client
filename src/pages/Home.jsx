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
                <section className="presentation-container">
                    <h1 className="presentation-title">MarketPlace descentralizado</h1>
                    <h2 className="presentation-subtitle">Cobra y paga con ether</h2>
                </section>
                {!auth &&
                    <section className="home-auth-form-container">
                        <AuthForm />
                    </section>
                }
            </main>
        </>
    )
}