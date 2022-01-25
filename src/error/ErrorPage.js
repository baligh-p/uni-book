import React from 'react'
import {Link,useHistory} from "react-router-dom"
const ErrorPage = () => {
    const history=useHistory(); 
    const goBack=()=>{
        history.goBack();
    }  
    const goHome=()=>{
        history.push("/");
    } 
    return(  
        <div className="ErrorPage">
            <p className="oops">Oops</p>
            <p className="error404">404-Page Not Found</p>
            <p className="errorP">The page you are looking for might have been removed its changed or temporarly unavailable</p>
            <div className="errorButtonContainer">
                <span className="backTohome" onClick={goBack}><button className="buttonError">Go Back</button></span>
            </div>
        </div>
    )
}

export default ErrorPage
