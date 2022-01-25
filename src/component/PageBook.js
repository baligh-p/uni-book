import React,{useEffect, useState} from 'react'
import {useParams,Link} from "react-router-dom"
/*import data from "../Data/BookData"*/
import "../scss/pageBook.scss"
import axios from "axios"
const PageBook = () => {
    const {id}=useParams();
    const [book, setBook] = useState([]);
    const fetchData=async()=>{
      var result=await axios.get(`http://localhost/BookBackend/getBook.php?selectedBook=${id}`)
      result=await result.data 
      setBook(result)
    }
    useEffect(()=>{
      fetchData();
    },[window.location.pathname])


    /*TODO 
     jaime + jaime pas*/


    return (
        book.map(({cheminImage,name,username,prix,description,like,dislike,languages,numberPage,cheminFile})=>{
          return(<div className="partBookContainer" id="partBookContainer" key={12}>
            <img src={"/"+cheminImage} id="imagePartBook" className="imagePartBook" alt={name+"  Photo"} />
            <h4 className="partBookTitle">{name}</h4>
            <div className="partBookReactContainer">
                <div className="partBookJaime">
                    <img src="/icons/like.png" className="jaimePartBook" id="jaimePartBook" alt="like book"/>
                    <p className="nbrLikePartBook">{like}</p>
                </div>
                <div className="partBookAimePas">
                    <img src="/icons/dislike.png" className="aimePasPartBook" id="aimePasPartBook" alt="dislike book"/>
                    <p className="nbrDislikePageBook">{dislike}</p>
                </div>
            </div>
            <h5 className="partBookFounder"><Link className="partBookFounderLink" to="/collection">{username}</Link></h5>
            <p className="partBookDescription">{description}</p>
            <p className="partBookPrix">{prix!="0"&&(prix+"€")||<span style={{color:"green"}}>free</span>}</p>
            {cheminFile!=="none"&&<div className="downLoadContainer"><a  href={"/"+cheminFile}  download><button className="buttonDownload">Download</button></a></div>}
            <div className="tableContainer">
              <table className="tableInformation" border="1">
                <tbody>
                  <tr>
                    <th>Language</th>
                    <td>{languages.map((language)=>language+" ")}</td>
                  </tr>
                  <tr>
                    <th>Nomber de Pages</th>
                    <td>{numberPage+" pages"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>)
        })
    )
}

export default PageBook
