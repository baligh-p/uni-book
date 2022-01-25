import React, { useEffect, useState } from 'react'
import {useCookies} from "react-cookie";
import { Link,useHistory} from "react-router-dom";
import GoBack from "./GoBack"
import Alert from "./Alert"
import axios from "axios";
const Login = () => {
    const history=useHistory();
    const [cookie,setCookie]=useCookies();
    const [exceptionMessage, setExceptionMessage] = useState("");
    const [disp, setDisp] = useState("");
    useEffect(() => {
        const messageError=document.getElementById("messageError");
        if(window.innerWidth>899)
        {
           setDisp("flex")
        }
        else 
        {
           setDisp("none");
        }
    }, [window.innerWidth])
    const afficherMessage=(message)=>{
        if(disp=="none")
        {
            const messageError=document.getElementById("messageError");
            messageError.style.display="flex";
            messageError.innerHTML=message;
        }
    }
    const handleLogin=async(e)=>{
        const username=document.getElementById("loginUserName"); 
        const password=document.getElementById("loginPassWord");
        const erroContainer=document.getElementById("messageError"); 
        erroContainer.style.display="none";
        setExceptionMessage("");
        e.preventDefault();
        var result=await axios.get(`http://localhost/BookBackend/signLogin.php?un=${username.value}&pwd=${password.value}`); 
        result = await result.data;
        if(result.length==1)
        {
           setCookie("clid",result[0].clid,{maxAge:3*24*60*60}) ;
           if(disp=="flex")
           {

            const cont=document.getElementById("loginParagraph"); 
            const cont2=document.getElementById("loginContainer"); 
            cont.style.width="100vw";
            cont2.style.width="0";
            const loader=document.getElementById("loader");
            loader.style.display="flex";
            setTimeout(() => {
               history.goBack(); 
            }, 5000);
          }
        else 
        {
            setTimeout(() => {
               history.goBack(); 
            }, 1000);
        }
        }
        else if(username.value=="" || password.value=="")
        {
            setExceptionMessage("Please complete your username or password");
            afficherMessage("Please complete your username or password");
        }
        else 
        {
            setExceptionMessage("invalid Username or Password");
            afficherMessage("invalid Username or Password");
        }
    }  
    return (
        <form className="loginContainer" id="loginContainer">
            <div className="formTitleContainer" id="formTitleContainer">
                <div className="formTitleDecoration"></div>
                <h2 className="formTitle">Log In</h2>
                <div className="formTitleDecoration"> </div>
            </div>
            <input type="text" className="loginUserName" id="loginUserName" placeholder="Username" />
            <input type="password" className="loginPassWord" id="loginPassWord" placeholder="Password" />
            <p id="messageError" className="messageError"></p>
            <button className="loginSubmit" onClick={handleLogin} type="submit" id="loginSubmit">Log In</button>
            <div className="diviseur"></div>
            <button className="createAccountButton" type="button"><Link className="createAccountLink" to="/sign">Create Account</Link></button>
            <div className="returnToHome">
                <GoBack/>
            </div>
            <Alert display={disp} message={exceptionMessage}></Alert>
        </form>
    )
}
export default Login
