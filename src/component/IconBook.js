import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
const IconBook = React.memo(({lang,nbr,type,prix}) => {
  
  const [data,setData]=useState([]);
  /*TODO :: fetch data with number (like , dislike)<=most popular books and type  ::*/
  const getData=async(language)=>{
    var result=await axios.get(`http://localhost/BookBackend/getBookWithConditions.php?nbr=${nbr}&lang=${language}`)
    result= await result.data
    setData(result)
  }
  const getBookWithType=async(type)=>{
    var result=await axios.get(`http://localhost/BookBackend/getBookWithConditions.php?nbr=${nbr}&type=${type}`)
    result= await result.data
    setData(result)
  }
  const getBookWithPrix=async(prix)=>{
    var result=await axios.get(`http://localhost/BookBackend/getBookWithConditions.php?nbr=${nbr}&prix=${prix}`)
    result= await result.data
    setData(result)
  }
  useEffect(() => {
    if(lang!=undefined)
    {
      console.log("lang work")
      switch (lang) {
      case "all":
        getData("all")
        break;
      default:
        getData(lang)
        break;
    }
    }
    if(type!=undefined)
    {
      getBookWithType(type);
    }
    if(prix!=undefined)
    {
      getBookWithPrix(prix);
    }
  }, [])
    return (
        data.map(({cheminImage,name,description,prix,username,bookId})=>{
        return(
        <div className="iconBook" key={bookId}>
            <img className="imageIcon" src={"./"+cheminImage} alt={name+"imm"}/>
            <h3 className="nameIconBook">{name}</h3>
           
            <p className="founder"><Link className="linkFounder" to="/collection">{username}</Link></p>
            <p className="description">{description}</p>
            <p className="prixIcon">{(prix&&prix+"€")||("free")}</p>
            <div className="moreInfoBook">
              <Link to={`/document/${name}/${bookId}`} className="linkMoreInfo">more informations and comments</Link>
              <img src="./icons/black-right-arrow.png" alt="right arrow learn more"/>
            </div>
        </div>)
        })
    )
})

export default IconBook
