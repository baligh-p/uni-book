import React,{useState,useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import {useCookies} from "react-cookie";
import GoBack from "./GoBack"
import Alert from "./Alert"
import axios from "axios";
const Sign = () => {
    const [champ, setChamp] = useState([]);
    const [exceptionMessage, setExceptionMessage] = useState("");
    const history=useHistory();
    const [cookie,setCookie]=useCookies();
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
    const controleEmail=(email)=>{
        return((email.indexOf("@")>0)&&(email.lastIndexOf(".")>email.indexOf("@")));
    }
    const getasIm=async(attribut)=>{
        var result=await axios.get(`http://localhost/BookBackend/signLogin.php?im=${attribut}`); 
        result=await result.data; 
        var bool;
        if(result.length>0)
        {
           bool =1 ; 
        }
        else 
        {
            bool=0;
        }
        return  (bool);
    }
    const getasUn=async(attribut)=>{
        var result=await axios.get(`http://localhost/BookBackend/signLogin.php?Un=${attribut}`); 
        result=await result.data; 
        var bool;
        if(result.length>0)
        {
           bool =1 ; 
        }
        else 
        {
            bool=0;
        }
        return  (bool);
    }
    const afficherMessage=(message)=>{
        if(disp=="none")
        {
            const messageError=document.getElementById("messageError");
            messageError.style.display="flex";
            messageError.innerHTML=message;
        }
    }
    const handleForm=async(e)=>{
        const messageError=document.getElementById("messageError");
        const email=document.getElementById("CreateEmail").value; 
        const username=document.getElementById("createUserName").value; 
        const password=document.getElementById("createPassWord").value; 
        const confirme=document.getElementById("confirmePassWord").value; 
        const accept=document.getElementById("acceptCondition");
        const mail=document.getElementById("CreateEmail");
        messageError.style.display="none";
        e.preventDefault();
        if(!controleEmail(email)) 
        {
            setExceptionMessage("Invalid EMAIL");
            afficherMessage("Invalid EMAIL");
            mail.style.borderColor= "rgb(248, 120, 120)";
        }
       else
        {
            var bool=getasIm(email);
            bool=await((await bool).toLocaleString());
            if(bool=="1")
            {
                setExceptionMessage("EMAIL already used");
                afficherMessage("EMAIL already used");
                const mail=document.getElementById("CreateEmail");
                mail.style.borderColor= "rgb(248, 120, 120)";
                mail.value="";
                mail.focus();
            } 
            else
            {
                const mail=document.getElementById("CreateEmail");
                mail.style.borderColor= "rgb(60, 231, 146)";
                bool=getasUn(username);
                bool=await((await bool).toLocaleString());
                if(bool=="1")
                {
                    setExceptionMessage("Username already used");
                    afficherMessage("Username already used");
                    const Un=document.getElementById("createUserName");
                    Un.value="";
                    Un.style.borderColor= "rgb(248, 120, 120)";
                    Un.focus();
                }
                else if(username.length<3)
                {
                    setExceptionMessage("Username should be at least 3 carateres");
                    afficherMessage("Username should be at least 3 carateres");
                    const Un=document.getElementById("createUserName");
                    Un.style.borderColor= "rgb(248, 120, 120)";
                    Un.focus();
                }
                else 
                {
                    const Un=document.getElementById("createUserName");
                    Un.style.borderColor= "rgb(60, 231, 146)";
                    if(password.length<6)
                    {
                        setExceptionMessage("Password should have at least 6 caracteres");
                        afficherMessage("Password should have at least 6 caracteres");
                        const pwd=document.getElementById("createPassWord");
                        pwd.style.borderColor= "rgb(248, 120, 120)"
                    }
                    else if(confirme!=password)
                    {
                        setExceptionMessage("Please confirme the right Password");
                        afficherMessage("Please confirme the right Password");
                        const pwd=document.getElementById("createPassWord");
                        pwd.style.borderColor= "rgb(60, 231, 146)";
                        const conf=document.getElementById("confirmePassWord");
                        conf.style.borderColor= "rgb(248, 120, 120)";
                    }
                    else if(accept.checked==false)
                    {
                        const conf=document.getElementById("confirmePassWord");
                        conf.style.borderColor= "rgb(60, 231, 146)";
                        setExceptionMessage("You should accept condition to create this account");
                        afficherMessage("You should accept condition to create this account");
                    }
                    else 
                    {
                        const data={
                            username:username, 
                            email:email, 
                            password:password
                        }
                        const postIt= await axios.post("http://localhost/BookBackend/signLogin.php",data); 
                        var getClid=await axios.get(`http://localhost/BookBackend/signLogin.php?un=${data.username}&pwd=${data.password}`);
                        getClid=await getClid.data;
                        setCookie("clid",getClid[0].clid,{maxAge:3*24*60*60});
                        if(disp=="flex")
                        {
                            const cont=document.getElementById("signParagraph"); 
                            const cont2=document.getElementById("signContainer"); 
                            cont.style.width="100vw";
                            cont2.style.width="0";
                            const loader=document.getElementById("loader");
                            loader.style.display="flex";
                            setTimeout(async() => {
                            await history.push("/");
                        }, 5000);
                        }
                        else 
                        {
                            setTimeout(async() => {
                            await history.push("/");
                        }, 1000);
                        }
                    }
                }
            }
        }
    }
    return (
        <React.Fragment>
            <div className="formTitleContainer" >
                <div className="formTitleDecoration"></div>
                <h2 className="formTitle">Create Account</h2>
                <div className="formTitleDecoration"> </div>
            </div>
            <input type="text" className="loginUserName"id="CreateEmail" placeholder="Email Address"/>
            <input type="text" className="loginUserName"id="createUserName" placeholder="UserName"/>
            <input type="password" className="loginPassWord" id="createPassWord" placeholder="Password"/>
            <input type="password" className="loginPassWord" id="confirmePassWord" placeholder="Confirme Password"/>
            <p id="messageError" className="messageError"></p>
            <label className="acceptCondition"><input type="checkbox" id="acceptCondition"/>I accept the 
            <Link className="condition" to="/condition/Privacy-Policy"> Privacy Policy</Link> and the 
            <Link className="condition" to="/condition/Terms-of-Service"> Terms of Service</Link></label>
            <button className="loginSubmit" onClick={handleForm} type="submit" id="createSubmit">Create</button>
            <div className="diviseur" ></div>
            <button className="createAccountButton"  type="button"><Link className="createAccountLink" to="/login">Log In</Link></button>
            <div className="returnToHome">
                <GoBack/>
            </div>
            <Alert display={disp} message={exceptionMessage}></Alert>
        </React.Fragment>
    )
}

export default Sign
