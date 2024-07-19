import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IoIosRefresh } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { ethers } from 'ethers'

import { AuthContext } from "../../providers/AuthProvider"

import { BLOCKCHAIN_PROVIDER } from "../../helpers/env";

export function Header() {

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [accountBalance, setAccountBalance] = useState(0.00)

    useEffect(() => {
        if (auth && accountBalance === 0) {
            getAccountBalance()
        }
    }, [auth])

    const getAccountBalance = async () => {
        const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_PROVIDER)
        const balance = await provider.getBalance(auth)
        setAccountBalance(ethers.formatEther(balance))
    }

    return (
        <header>
            <nav>
                <ul className="nav-menu">
                    <li
                        style={{ borderBottom: pathname === '/' ? '1px solid #00C52C' : '' }}
                        onClick={() => navigate('/')}
                    >
                        Inicio
                    </li>
                    <li
                        style={{ borderBottom: pathname === '/tienda' ? '1px solid #00C52C' : '' }}
                        onClick={() => navigate('/tienda')}
                    >
                        Tienda
                    </li>
                    {auth &&
                        <>
                            <li
                                style={{ borderBottom: pathname === '/historial' ? '1px solid #00C52C' : '' }}
                                onClick={() => navigate('/historial')}
                            >
                                Historial
                            </li>
                            <li
                                style={{ borderBottom: pathname === '/ventas' ? '1px solid #00C52C' : '' }}
                                onClick={() => navigate('/ventas')}
                            >
                                Ventas
                            </li>
                        </>
                    }
                </ul>
            </nav>
            {auth &&
                <section className="account-balance">
                    <p>Mi cuenta: {auth}</p>
                    <div className="user-data">
                        <p>
                            Balance: {`${accountBalance} ETH`}
                        </p>
                        <button onClick={() => getAccountBalance()}>
                            <IoIosRefresh />
                        </button>
                        <button onClick={() => {
                            setAuth(null)
                            navigate('/')
                        }}>
                            <TbLogout />
                        </button>
                    </div>
                </section>
            }
        </header>
    )
}