import { useContext } from "react"
import { useForm } from "../../hooks/useForm"
import { AuthContext } from "../../providers/AuthProvider"

export function NewSale({ handleSubmit, setRegister }) {

    const { auth } = useContext(AuthContext)

    const { formData, setFormData, validate, reset, errors, disabled, handleChange } = useForm({
        defaultData: {
            id: '',
            seller: auth,
            description: '',
            images: []
        },
        rules: {
            description: {
                required: true,
                maxLength: 191
            }
        }
    })

    const handleChangeImages = (e) => {
        setFormData({
            ...formData,
            images: [
                ...formData.images,
                ...e.target.files
            ]
        })
    }

    return (
        <form className="new-sale-form" onSubmit={(e) => handleSubmit(e, formData, validate, reset)}>
            <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                {errors.description?.type === 'required' &&
                    <small>* La descripción es requerida.</small>
                }
                {errors.description?.type === 'maxLength' &&
                    <small>* La descripción es demasiado larga.</small>
                }
            </div>
            <div className="form-group">
                <label htmlFor="images">Imágenes (subidas: {formData.images.length})</label>
                <input type="file" multiple onChange={handleChangeImages} />
            </div>
            <input type="submit" value="Guardar" disabled={disabled} />
            <button
                type='button'
                className='secondary-btn'
                onClick={() => {
                    setRegister(null)
                    reset()
                }}
            >
                Cancelar
            </button>
        </form>
    )
}