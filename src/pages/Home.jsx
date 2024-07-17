import { useContext } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "../hooks/useForm";

import { Header } from "../components/common/Header";

export function Home() {

    const { auth, setAuth } = useContext(AuthContext)

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
            setAuth(formData.privateKey)
            reset()
        }
    }

    return (
        <>
            <Header />
            <main>
                {!auth &&
                    <form className="user-form" onSubmit={handleAuthenticate}>
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
                        <input type="submit" value="Guardar" />
                    </form>
                }
            </main>
        </>
    )
}