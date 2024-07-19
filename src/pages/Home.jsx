import { Header } from "../components/common/Header";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <section className="presentation-container">
                    <h1 className="presentation-title">MarketPlace descentralizado</h1>
                    <h2 className="presentation-subtitle">Cobra y paga con ether</h2>
                </section>
            </main>
        </>
    )
}