import React from 'react'

function Modal({ closeModal }) {

    return (
        <div className='modalBackground' onClick={() => closeModal(false)}>
            <div className='modalContainer'>
                <div className='titleCloseButton'>
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className='bodyModal'>
                    <p>'Ingrese una locación válida</p>
                </div>
            </div>
        </div>
    )
}

export default Modal