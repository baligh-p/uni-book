import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
const GoBack = () => {
    const history=useHistory();
    const [image, setImage] = useState("");
    const goBack=()=>{
        history.goBack();
    } 
    const t=window.innerWidth; 
    useEffect(() => {
      if(t>=900)
       {
        setImage("/icons/left-arrow.png");
       }
     else
      {
        setImage("/icons/black-left-arrow.png");
      }
    },[])
    return (
        <div className="goBackContainer" onClick={goBack}>
            <img src={image} className="leftArrowHistory"  alt="left arrow"/>
            <p className="goBack">Back</p>
        </div>
    )
}

export default GoBack
