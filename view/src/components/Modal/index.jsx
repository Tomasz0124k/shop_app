import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './style.css'

const Modal = (props) => {
    return (
        <Popup
            trigger={props.trigger}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> {props.title} </div>
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            )}

        </Popup>
    )
}

export default Modal;