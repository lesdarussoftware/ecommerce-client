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
            title: '',
            price: '',
            images: []
        },
        rules: {
            title: {
                required: true,
                maxLength: 55
            },
            description: {
                required: true,
                maxLength: 191
            },
            price: {
                required: true
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

    const formatPrice = (value) => {
        const formattedValue = parseFloat(value).toFixed(8);
        return formattedValue;
    };

    return (
        <form className="new-sale-form" onSubmit={(e) => handleSubmit(e, formData, validate, reset)}>
            <div className="form-group">
                <label htmlFor="title">Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                {errors.title?.type === 'required' &&
                    <small>* El título es requerido.</small>
                }
                {errors.title?.type === 'maxLength' &&
                    <small>* El título es demasiado largo.</small>
                }
            </div>
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
                <label htmlFor="price">Precio (Gwei)</label>
                <input
                    type="number"
                    step="0.00000001"
                    min="0"
                    inputMode="decimal"
                    name="price"
                    value={formData.price}
                    onChange={e => handleChange({
                        target: {
                            name: 'price',
                            value: formatPrice(e.target.value)
                        }
                    })}
                />
                {errors.price?.type === 'required' &&
                    <small>* El precio es requerido</small>
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