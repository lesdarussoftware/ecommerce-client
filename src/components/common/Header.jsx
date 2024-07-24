import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { AuthContext } from "../../providers/AuthProvider"

import { OWNER_ADDRESS } from "../../helpers/env"

export function Header() {

    const { account } = useContext(AuthContext)

    const navigate = useNavigate()
    const { pathname } = useLocation()

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
                    {account &&
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
                            {account === OWNER_ADDRESS &&
                                <li
                                    style={{ borderBottom: pathname === '/moderacion' ? '1px solid #00C52C' : '' }}
                                    onClick={() => navigate('/moderacion')}
                                >
                                    Moderación
                                </li>
                            }
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}