import React from 'react'
import './modal.css'
import {  Link } from "react-router-dom";
const Modal=({message,close,src,name,link})=>{
    return(
        <div className="modal-wrapper display-block">
            <div className="modal-main">
                <Link to={link}>
                <button onClick={close} className="close-btn">
                    X
                </button>
                </Link>
                <div className="content">
                    <div>{message}</div>
                        <div>
                            <img src={src}/>
                        </div>
                        <div className="name-winner">{name} Win!</div>
                </div>
            </div>
        </div>
    )
}
export default Modal;