import React,{useEffect} from 'react'
import "../scss/alert.scss"
const Alert = ({message,display,children}) => {
    useEffect(() => {
        const container=document.getElementById("alertContainer");
        if(message!="")
        {
            if(display=="flex")
            {
               container.style.display="flex"; 
            }
            container.style.transform="translateX(-25vw)";
           setTimeout(()=>{
               container.style.transform="translateX(0)";
           },600)
        } 
        else 
        {
            if(display=="flex")
            {
                container.style.display="none";
            }
        }
    })
    return (
        <div className="alertContainer" style={{display:display}} id="alertContainer">
            <p className="message">{message}</p>
            {children}
        </div>
    )
}

export default Alert
