import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../providers/AuthProvider"

export function Header() {

    const { auth } = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <header>
            <nav>
                <ul className="nav-menu">
                    <li onClick={() => navigate('/')}>Inicio</li>
                    <li onClick={() => navigate('/tienda')}>Tienda</li>
                    {auth &&
                        <li onClick={() => navigate('/historial')}>
                            Historial
                        </li>
                    }
                </ul>
            </nav>

        </header>
    )
}