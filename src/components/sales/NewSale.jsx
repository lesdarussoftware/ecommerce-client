import { useEffect } from "react"

import { useForm } from "../../hooks/useForm"

import { ModalComponent } from "../common/ModalComponent"

export function NewSale({ handleSubmit, setOpen, isOpen, defaultData }) {

    const { formData, setFormData, validate, reset, errors, disabled, handleChange } = useForm({
        defaultData: {
            id: '',
            description: '',
            title: '',
            price: '',
            is_visible: false,
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

    useEffect(() => {
        if (typeof defaultData?.id === 'number') {
            setFormData(defaultData)
        }
    }, [defaultData])

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
        <ModalComponent isOpen={isOpen} onClose={() => reset(setOpen)}>
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
                {!defaultData ?
                    <div className="form-group">
                        <label htmlFor="images">Imágenes (subidas: {formData.images.length})</label>
                        <input type="file" multiple onChange={handleChangeImages} />
                    </div> :
                    <div className="form-group">
                        <label htmlFor="visible">Visible</label>
                        <input
                            type="checkbox"
                            checked={formData.is_visible}
                            onChange={e => handleChange({ target: { name: 'is_visible', value: e.target.checked } })}
                        />
                    </div>
                }
                <input type="submit" value="Guardar" disabled={disabled} />
                <button
                    type='button'
                    className='secondary-btn'
                    onClick={() => reset(setOpen)}
                >
                    Cancelar
                </button>
            </form>
        </ModalComponent>
    )
}