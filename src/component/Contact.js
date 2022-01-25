import React,{useRef,useState} from 'react'
import axios from "axios"
import "../scss/contact.scss"
import Notification from "./Notification"
const Contact = () => {
    const [showNotification,setShowNotification]=useState("none");
    const [notificationType, setNotificationType] = useState("")
    const [heyRe_Render, setHeyRe_Render] = useState(0)
    const [msg, setMsg] = useState("")
    const email = useRef(null)
    const [help, setHelp] = useState(0)
    const message = useRef(null)
     const controleEmail=(email)=>{
        return((email.indexOf("@")>0)&&(email.lastIndexOf(".")>email.indexOf("@")));
    }
    const handleSubmitContact=(e)=>{
        e.preventDefault();
        if(controleEmail(email.current.value))
        {
            if(message.current.value!="")
            {
                const data={
                    emailContactUs:email.current.value,
                    messageContactUs:message.current.value
                }
                axios.post(`http://localhost/BookBackend/handleContact`,data).then(()=>{
                    email.current.value="" 
                    message.current.value=""
                    setShowNotification("flex"); 
                    setNotificationType("success");
                    setMsg("message has sended successfully")
                    setHeyRe_Render(heyRe_Render+1)
                }).catch((err)=>{
                    setShowNotification("flex"); 
                    setNotificationType("error");
                    setMsg("Error please check you network")
                    setHeyRe_Render(heyRe_Render+1)
                })
            }
            else 
            {
                setShowNotification("flex"); 
                setNotificationType("alert");
                setMsg("empty message")
                setHeyRe_Render(heyRe_Render+1)
            }
        }else 
        {
            setShowNotification("flex"); 
            setNotificationType("alert");
            setMsg("Invalid email")
            setHeyRe_Render(heyRe_Render+1)
        }
    }
    const handleEmail=()=>{
        if(help==0)
        {
            email.current.style.height="3vh";
            email.current.style.minHeight="30px";
            setHelp(help+1)
        }
    }
    return (
        <React.Fragment>
        <div className="contactContainer">
            <div className="part1">
                    <p className="description">Have a question<br/>
                    Send your messages or call us
                    </p>
                    <a className="num" href="tel:20271724"><span className="tel">TEL:</span>20271724</a>
                    <a className="helper"href="mailto:belighzoughlemi8@gmail.com"><div className="email">
                        <img src="/icons/google.png" className="iconsContact" alt="email link "/>
                        <p>belighzoughlemi8@gmail.com</p>
                    </div></a>
                    <div className="iconsContainer">
                        <a href="http://facebook.com/"><img src="/icons/facebook (3).png" className="iconsContact" alt="link facebook page"/></a>
                        <a href="http://instagram.com/"><img src="/icons/instagram (2).png" className="iconsContact" alt="link instgram page"/></a>
                        <a href="http://linkedin.com/"><img src="/icons/linkedin (3).png" className="iconsContact" alt="link linkedin page"/></a>
                        <a href="http://twitter.com/"><img src="/icons/twitter (1).png" className="iconsContact" alt="link twitter page"/></a>
                    </div>
            </div>
            <form className="part2">
                <h3 className="contactUsTitle">Contact Us</h3>
                <label className="label"  htmlFor="contactEmail">Email</label>
                <input type="text" autoComplete="off" onFocus={handleEmail}  id="contactEmail" ref={email} className="contactEmail" />
                <textarea className="contactInput" ref={message} placeholder="Your message"></textarea>
                <button onClick={handleSubmitContact} type="submit" className="submitContact">Send</button>
            </form>
        </div>
         <Notification message={msg} type={notificationType} disp={showNotification} heyRe_Render={heyRe_Render}></Notification>
         </React.Fragment>
    )
}

export default Contact
