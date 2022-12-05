import React from 'react';
import './Popup.css';

function Popup(props){
    return (props.trigger) ? (
        (props.start_chat) ? (
        <div className="popup-start-chat">
             <div className="popup-inner">
            {props.children}
        </div>
     </div>
    ) : (
        <div className="popup">
             <div className="popup-inner">
            {props.children}
        </div>
     </div>
    )):
    <span></span>
}

export default Popup