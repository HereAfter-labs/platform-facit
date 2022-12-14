import React, {useEffect, useState, useRef} from 'react';
import './Popup.css';
import useOutsideAlerter from '../pages/presentation/chat/WithListChatPage';


function Popup(props){
    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
            props.setTrigger(false);
        }
    };

    const handleClickInside = () => 
        {setClickedOutside(false);}

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (props.trigger) ? (
        (props.start_chat) ? (
        <div className="popup-start-chat" onClick={handleClickInside} ref={myRef}>
             <div className="popup-inner">
            {props.children}
        </div>
     </div>
    ) : (
        <div className="popup">
             <div className="popup-inner" onClick={handleClickInside} ref={myRef}>
            {props.children}
        </div>
     </div>
    )):
    <span></span>
}

export default Popup