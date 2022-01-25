import React,{useEffect,useRef} from 'react'
import "../scss/notification.scss"
import {useResponsive} from "./CustomHook/Responsive";/*tester la taille  de screen*/
const Notification = React.memo(({message,type,disp,heyRe_Render}) => {/* hey re_render is a props just fo being marked 
    by react memo and use effect i n caller of the conponent because the rerender infinite of comments*/
   const exit=useRef(null);
   const screen =useResponsive(701);
   const memorie={
       notificationImage:{
           alert:"/icons/warning.png", 
           success:"/icons/checked.png", 
           error:"/icons/cancel.png"
       }, 
       color:{
           alert:"rgb(255, 241, 159)", 
           success:"rgb(101, 219, 180)", 
           error:"rgb(245, 113, 108)", 
       }
   }
   const exitHandle=()=>{
        const container=document.getElementById("notificationContainer");
        const part1=document.getElementById("part11");
        const part2=document.getElementById("part22");
        const message=document.getElementById("smg");
       if(screen)
       {
        container.style.transform="translateX(100vw)";
        container.style.width="28.5vw";
        part1.style.width="100%";
        part2.style.width="0";
        message.style.opacity=0;
       }
       else 
       {
        container.style.transform="translateX(20vw)";
        container.style.width="9.3vw";
        container.style.minWidth="105px";
        part1.style.width="100%";
        part2.style.width="0";
        message.style.opacity=0;
       }
   }
    const showNotification=()=>{
        const container=document.getElementById("notificationContainer");
        const part1=document.getElementById("part11");
        const part2=document.getElementById("part22");
        const message=document.getElementById("smg");
        if(disp=="flex")
        {
            if(screen)
            {
                container.style.transform="translateX(0)";
            setTimeout(()=>{
                container.style.width="95vw";
                part1.style.width="30%";
                part2.style.width="70%";
            },250)
            setTimeout(()=>{
                message.style.opacity=1;
            },1000)
            }
            else 
            {
                container.style.transform="translateX(0)";
            setTimeout(()=>{
                container.style.width="31vw";
                container.style.minWidth="350px";
                part1.style.width="30%";
                part2.style.width="70%";
            },250)
            setTimeout(()=>{
                message.style.opacity=1;
            },1000)
            }
        }
    }
    useEffect(() => {
        showNotification();
    })

    return (
        <div className="notificationContainer" id="notificationContainer" style={{display:disp}}>
            <div className="part1" id="part11" style={{backgroundColor:memorie.color[type]}}>
                <img src={memorie.notificationImage[type]} className="notificationImage" alt='notification'/>
            </div>
            <div className="part2" id="part22">
                <img  className="exitNotification"  ref={exit} onClick={exitHandle} src="/icons/x.png" alt=" exit notification"/>
                <p id="smg" className="message">{message}</p>
            </div>
        </div>
    )
})
export default Notification
