import { useEffect, useRef, useState } from 'react'

export function ModalComponent({ isOpen, onClose, children }) {

    const [isVisible, setIsVisible] = useState(isOpen)
    const dialogRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
        } else {
            setTimeout(() => setIsVisible(false), 300)
        }
    }, [isOpen])

    const handleClose = () => {
        onClose()
    }

    const handleOutsideClick = (e) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            handleClose()
        }
    }

    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            handleClose()
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick)
            document.addEventListener('keydown', handleEscKey)
        } else {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscKey)
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscKey)
        }
    }, [isOpen])

    return (
        isVisible && (
            <div className={`dialog-overlay ${isOpen ? 'fade-in' : 'fade-out'}`}>
                <div className="dialog" ref={dialogRef}>
                    <button className="close-button" onClick={handleClose}>X</button>
                    {children}
                </div>
            </div>
        )
    )
}