import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../../providers/UserProvider"
import { useForm } from "../../hooks/useForm"

import { ROLES } from "../../helpers/constants"

export function Header() {

    const { privateKey, role, setPrivateKey, setRole } = useContext(UserContext)

    const navigate = useNavigate()

    const { formData, errors, validate, handleChange, reset } = useForm({
        defaultData: { privateKey: '', role: '' },
        rules: {
            privateKey: {
                required: true,
                minLength: 66,
                maxLength: 66
            },
            role: {
                required: true
            }
        }
    })

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setPrivateKey(formData.privateKey)
            setRole(formData.role)
            reset()
        }
    }

    return (
        <header>
            {privateKey && role ?
                <nav>
                    <ul>
                        <li onClick={() => navigate('/')}>Inicio</li>
                        <li onClick={() => navigate('/historial')}>Historial</li>
                    </ul>
                </nav> :
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="privateKey"
                        placeholder="Llave privada"
                        value={formData.privateKey}
                        onChange={handleChange}
                    />
                    {errors.privateKey?.type === 'required' &&
                        <small>* La llave privada es requerida.</small>
                    }
                    {(errors.privateKey?.type === 'maxLength' || errors.privateKey?.type === 'minLength') &&
                        <small>* La llave privada es inválida.</small>
                    }
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="" disabled>Rol</option>
                        <option value={ROLES.BUYER}>{ROLES.BUYER}</option>
                        <option value={ROLES.SELLER}>{ROLES.SELLER}</option>
                    </select>
                    {errors.role?.type === 'required' &&
                        <small>* El rol es requerido.</small>
                    }
                    <input type="submit" value="Guardar" />
                </form>
            }
        </header>
    )
}