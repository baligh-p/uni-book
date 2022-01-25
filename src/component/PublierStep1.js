import React,{useRef,useEffect,useState} from 'react'
import {useHistory} from "react-router-dom"
import {useCookies} from "react-cookie"
import $ from "jquery"
import Notification from "./Notification"
import "../scss/publierBook.scss"


const PublierStep1 = () => {
    const name = useRef("")
    const Creator = useRef("");
    const buttonSubmit = useRef(null);

    const [valueName, setValueName] = useState("");
    const [valueCreator, setValueCreator] = useState("");
    const [valueDescription,setValueDescription]=useState("");
    const [message, setMessage] = useState("");
    const [notificationType, setNotificationType] = useState(""); 
    const [showNotification, setShowNotification] = useState("none"); 
    const [heyRe_Render,setHeyRe_Render]=useState(0);
    const [loading, setLoading] = useState(false);


    const history=useHistory();
    const [cookie,setCookie]=useCookies();

    /*handle input style + value*/
    const handleInputPadding=(input,value,color,label)=>{
        const id=input.getAttribute("id"); 
        $(`label[for=${id}]`).css({"top":`${value}`,"color":`${color}`}).html(label)

    }

    const changeLabel=(input,value)=>{
        const id=input.getAttribute("id");
        try 
        {
            $(`label[for=${id}]`).html(value).css({"color":"#f55057"});
            input.style.borderBottomColor="#f50057" ;
        }catch(err)
        {
            console.log("no element label");
        }
    }

    const handleInput=(e)=>{
        if(e.target.getAttribute("id")=="publierName")
        {
            setValueName(e.target.value);
        }
        else if (e.target.getAttribute("id")=="Creator")
        {
            setValueCreator(e.target.value);
        }
        else 
        {
            const descriptionArea=document.getElementById("description");
            setValueDescription(descriptionArea.value)
        }
    }


    useEffect(() => {
        const descriptionArea=document.getElementById("description");
        if(name.current.value=="")
        {
            handleInputPadding(name.current,"25px","black","name")
            name.current.style.borderBottomColor=" rgba(128, 128, 128, 0.24)";
        }
        else{
            handleInputPadding(name.current,"0","rgb(60, 231, 146)","name"); 
            name.current.style.borderBottomColor=" rgb(60, 231, 146)";
        }
        if(Creator.current.value=="")
        {
            handleInputPadding(Creator.current,"25px","black","Writer Name")
            Creator.current.style.borderBottomColor=" rgba(128, 128, 128, 0.24)";
        }
        else{
            handleInputPadding(Creator.current,"0","rgb(60, 231, 146)","Writer Name")
            Creator.current.style.borderBottomColor=" rgb(60, 231, 146)";
        }
        if(descriptionArea.value=="")
        {
            descriptionArea.style.borderBottomColor=" rgba(128, 128, 128, 0.24)";
        }
        else 
        {
            descriptionArea.style.borderBottomColor="rgb(60, 231, 146)";
        }
    }, [valueCreator,valueName,valueDescription])

    /*handle submit with exceptions*/
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        var submit=true;
        const descriptionArea=document.getElementById("description");
        
        if(cookie.clid==undefined) 
        {
            setShowNotification("flex"); 
            setHeyRe_Render(heyRe_Render+1); 
            setMessage("You should connect to publish Books");
            setNotificationType("alert");
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }
        else
        {
            if(Array.from(valueName).filter(data=>data!=" ").length<3) 
            {
                changeLabel(name.current,"name at least 3 caracteres");
                name.current.value="";
                submit=false;
            }
            if(Array.from(valueCreator).filter(data=>data!=" ").length<3)
            {
                changeLabel(Creator.current,"Creator Name at least 3 caracteres");
                Creator.current.value=""
                submit=false;
            }
            if(Array.from(valueDescription).filter(data=>data!=" ").length<20)
            {
                descriptionArea.placeholder="Description should be at least 20 caracteres";
                descriptionArea.style.borderBottomColor="#f50057";
                descriptionArea.value=""
                submit=false;
            }
            if(submit)
            {
                setLoading(true);
                setTimeout(() => {
                    history.push({pathname:"/add_book/step2",state:{valueName,valueCreator,valueDescription}});
                }, 4000);
            } 
        }
    }
    /*handle the loading value*/

    useEffect(() => {
      if(loading)
      {
        buttonSubmit.current.textContent="loading...";
      }  
    }, [loading])


    return (
        <React.Fragment>
            <form className="publierBook" >
                <h2 className="title">Publish Book</h2>
                <label className="txt" htmlFor="publierName">Name</label>  
                <input type="text" className="publierName" ref={name}  onInput={handleInput} id="publierName"/>
                <label className="txt" htmlFor="Creator">Writer Name</label>
                <input type="text" className="Creator" ref={Creator} onInput={handleInput} id="Creator"/>
                <textarea id="publierDescription" id="description" onInput={handleInput} placeholder="Write Description"></textarea>
                <button type="submit" onClick={handleSubmit} ref={buttonSubmit} className="buttonSubmit exception">Next</button>
            </form>
            <Notification message={message} type={notificationType} disp={showNotification} heyRe_Render={heyRe_Render}/>
        </React.Fragment>
    )
}

export default PublierStep1