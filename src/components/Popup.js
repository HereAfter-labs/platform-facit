import React from 'react';
import './Popup.css';

function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
             <div className="popup-inner">
            {props.children}
        </div>
     </div>
    ) :
    <span></span>
}



export default Popup