import React,{useState,useEffect,useRef,useReducer} from 'react'
import {useCookies } from "react-cookie"
import {useHistory} from "react-router-dom"
import "./../scss/BookIconPost.scss"
import BookIconPost from "./BookIconPost"
import Notification from "./Notification"
import {UseTrueLength} from "./CustomHook/CustomInput"
import axios from "axios"
import $ from "jquery"
const Poster = () => {
    /* get cookie+ history*/
    
    const [cookie,setCookie]=useCookies();
    const history=useHistory();
    useEffect(() => {
        if(cookie.clid==undefined||cookie.clid==null) history.push("/")
    }, [])
    

    /*ref part*/ 

    const postTxt=useRef(''); 
    const findInput=useRef('');

    /*usestate*/


    const [allBooks, setAllBooks] = useState([]);
    const [loadingSearch,setLoadingSearch]=useState("")
    const [selectedBook, setSelectedBook] = useState([])
    const [loading,setLoading]=useState("Upload");

    const [message,setMessage]=useState("")
    const [notificationType,setNotificationType]=useState("")
    const [heyRe_Render,setHeyRe_Render]=useState(0);
    const [showNotification,setShowNotification]=useState("none")
    /*search book*/
    const searchBook=async()=>{
        const searchResult=document.getElementById("booksContainer")
        $("label[for=findBookToPost]").text("Book you'll talk about")
        if(findInput.current.value!="")
        {
            findInput.current.style.borderColor="rgb(60, 231, 146)";
            $("label[for=findBookToPost]").css({"transform":"translateY(16px)","fontSize":"11px","color":"black"})
            setLoadingSearch("loading")
            searchResult.style.display="block"
            var donne=await axios.get(`http://localhost/BookBackend/getSomeBooks.php?selector=${findInput.current.value}`)
            .then(async(res)=>{
                setLoadingSearch("");
                res=await res.data
                await setAllBooks(res)
            })
        }
        else 
        {
            setAllBooks([])
            searchResult.style.display="none"
            findInput.current.style.borderColor=" rgba(128, 128, 128, 0.521)";
            $("label[for=findBookToPost]").css({"transform":"translateY(32px)","fontSize":"14px"})
        }
    }
    const handleTextArea=()=>{
        const posteTxt=document.getElementById("posteTxt")
        $("label[for=posteTxt]").text("Write your post");
        if(posteTxt.value!="")
        {
            $("label[for=posteTxt]").css({"transform":"translateY(16px)","fontSize":"11px","color":"black"})
            posteTxt.style.borderColor="rgb(60, 231, 146)";
        }
        else 
        {
            $("label[for=posteTxt]").css({"transform":"translateY(32px)","fontSize":"14px"})
            posteTxt.style.borderColor=" rgba(128, 128, 128, 0.521)";
        }
    }
    const checkBook=async(e)=>{
        var donne=await axios.get(`http://localhost/BookBackend/getSomeBooks.php?selectedBook=${e}`)
        .then(async(res)=>{
                res=await res.data
                await setSelectedBook(res)
                const searchResult=document.getElementById("booksContainer")
                searchResult.style.display="none";
            })
    }
    const unselectBook=()=>{
        setSelectedBook([])
    }


    const handleFormPost=async(e)=>{
        e.preventDefault();
        var data=new FormData();
        var submit=true;
        if(UseTrueLength(findInput.current.value)<3 && selectedBook.length==0)
        {
            findInput.current.value=""
            findInput.current.style.borderColor="rgb(247, 104, 104)";
            $("label[for=findBookToPost]").text("book name should be at least 3 caracteres")
            $("label[for=findBookToPost]").css({"transform":"translateY(32px)","fontSize":"14px","color":"red"})
            submit=false;
        }
        if(UseTrueLength(postTxt.current.value)<20)
        {
            postTxt.current.value="";
            postTxt.current.style.borderColor="rgb(247, 104, 104)"
            $("label[for=posteTxt]").text("post should be at least 20 caracteres")
            $("label[for=posteTxt]").css({"transform":"translateY(32px)","fontSize":"14px","color":"red"})
            submit=false;
        }
        if(submit) 
        {
            setLoading("Loading");
            data.append("postTxt",postTxt.current.value);
            data.append("typer",cookie.clid); 
            data.append("bookName",findInput.current.value)
            if(selectedBook.length>0)
            {
                data.append("bookId",selectedBook[0].bookId); 
            }
            var result=await axios.post("http://localhost/BookBackend/handlePost.php",data).then((res)=>{
                setLoading("Upload")
                setMessage("you post uploaded successfully") 
                setShowNotification("flex") 
                setNotificationType("success")
                setHeyRe_Render(heyRe_Render+1)
                const btnSubmit=document.getElementById("btnSubmit")
                btnSubmit.style.opacity="0.4"
                btnSubmit.setAttribute("disabled",true); 
                setTimeout(() => {
                   /*TODO-- execute fetching post*/
                    btnSubmit.style.opacity="1"
                    btnSubmit.setAttribute("disabled",false)
                    findInput.current.value=""
                    postTxt.current.value=""
                    setSelectedBook([])
                    handleTextArea();
                    searchBook();
                }, 3000); 
            }).catch((err)=>{
                setMessage("please check your network") 
                setLoading("Upload")
                setShowNotification("flex") 
                setNotificationType("error")
                setHeyRe_Render(heyRe_Render+1)
            })
        }
    }


    return (
        <React.Fragment>
        <form className="posterContainer">
                <p className="postTitle">Publish your opinion</p>
            <div style={{width:"100%",height:"2px",backgroundColor:" rgba(0, 0, 0, 0.233)",marginBottom:"20px"}}></div>
            <div className="partPoster">
                <label htmlFor="findBookToPost" className="labelSearch">Book you'll talk about </label>
                <input type="text" id="findBookToPost" onInput={searchBook} ref={findInput} className="findInput"/>
                <div className="booksContainer" id="booksContainer">
                    {loadingSearch&&<div className="loaderContainer"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
                    {allBooks.map((data)=>{
                        return(
                        <React.Fragment key={data.bookId}>
                            <div className="bookResult" key={data.bookId} onClick={()=>{checkBook(data.bookId)}}>
                                <div>
                                    <img src={"./"+data.cheminImage} alt={data.name + " image"}/>
                                    <h3>{data.name}</h3>
                                </div>
                                <h4>{data.username}</h4>
                            </div>
                            <div className="divisieur"></div>
                        </React.Fragment>);
                    })}
                </div>
            </div>
            {selectedBook.length>0&&<p style={{fontFamily:"bodyFont",fontSize:"10px"}}>Double Click to unselect book</p>}
            {selectedBook.length>0&&<div className="bookSelected" onDoubleClick={unselectBook}>
                <BookIconPost cheminImage={"./"+selectedBook[0].cheminImage} 
            name={selectedBook[0].name} like={selectedBook[0].like} 
            dislike={selectedBook[0].dislike} username={selectedBook[0].username} nbrCommentaire= {selectedBook[0].nombreCommentaire}/>
            </div>}
            <div className="part2Poster">
                <label htmlFor="posteTxt" className="textLabel">Write your post</label>
                <textarea id="posteTxt" ref={postTxt} className="posteTxt" onInput={handleTextArea}></textarea>
            </div>
            <button type="submit" id="btnSubmit" onClick={handleFormPost} className="postButtonSubmit">{loading}</button>
        </form>
        <Notification message={message} type={notificationType} disp={showNotification} heyRe_Render={heyRe_Render}/>
        </React.Fragment>
    )
}

export default Poster
