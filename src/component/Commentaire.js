import React,{useState,useEffect,useLayoutEffect,useRef} from 'react'
import axios from "axios";
import {useCookies} from "react-cookie"; 
import {useParams,Link} from "react-router-dom"; 
import "../scss/commentsBook.scss";
import Notification from "./Notification"
import {UseDate} from "./CustomHook/CustomDate"

const Commentaire = () => {

    const [cookie,setCookie]=useCookies(); 
    const [type, setType] = useState("general");/*comment type */
    const [heyRe_Render, setHeyRe_Render] = useState(0);
    const {id}=useParams();
    const [data,setData]=useState([]);
    const [showNotification,setShowNotification]=useState("none");
    const [notificationType, setNotificationType] = useState("")
    const part1=useRef(null);

   


    var fnData=async() => {
        var result=await axios.get(`http://localhost/BookBackend/commentsHandle.php?getComments=thoseComment&book=${id}&type=${type}`);
        result=await result.data;
        setTimeout(()=>{
            setData(result);
        },1000)
    }


    useEffect(()=>{
        fnData();
    },[data]);


    useLayoutEffect(() => {
        const generalComments=document.getElementById("generalComments");
        const subjectComments=document.getElementById("subjectComments");
        if(type=="general")
        {
           generalComments.style.width="80%";
           generalComments.style.color="#00b0ff"
           subjectComments.style.width="20%";
           subjectComments.style.color="white"
        }
        else 
        {
            subjectComments.style.width="80%";
            subjectComments.style.color="#00b0ff";
            generalComments.style.width="20%";
            generalComments.style.color="white"
        }
    },[type])

    const handleCommentForm=async()=>{
        const comment=document.getElementById("inputComments"); 
        if(cookie.clid!=undefined)
        {
            if(comment.value!="")
            {
                const data={
                comment:comment.value, 
                typerId:cookie.clid, 
                typeComment:type,
                bookId:id
                }
                axios.post(`http://localhost/BookBackend/commentsHandle.php`,data).catch((error)=>{
                console.log(error);
                })
                comment.value="";
            }
        }
        else 
        {
            setShowNotification("flex");
            setNotificationType("alert")
            setHeyRe_Render(heyRe_Render+1);
        }
    }


    return (
        <React.Fragment>
        <div className="partCommentsContainer" id="toComment">
            <div className="commentsType">
                <p id="generalComments" onClick={()=>setType("general")}>General</p>
                <p id="subjectComments" onClick={()=>setType("subject")}>Subject</p>
            </div>
            <div className="comments">
                {data.length>0&&data.map(({username,comment,commentId,dateComment})=>{
                    return(
                        <React.Fragment key={commentId}>
                        <div className="commentContainer" key={commentId}>
                            <div className="part1">
                                <p className="typerComment">{username}</p>
                                <img className="profilImage" src="/icons/images.jpg"/>
                            </div>
                            <div className="part2">
                                <p className="commentBook">{comment}</p>
                                <p className="dateComment">{UseDate(dateComment)}</p>
                            </div>
                        </div>
                        <div className="diviseur"></div>
                        </React.Fragment>
                    )
                })}
            </div>
            <div className="inputCommentsContainer">
                <textarea  className="inputComments" id="inputComments" placeholder="Write your Comments"></textarea>
                <img src="/icons/black-right-arrow.png" alt="publier commentaire" onClick={handleCommentForm} className="CommentSubmit" id="CommentSubmit"/>
            </div>
        </div>
        <Notification message="you should connect" type={notificationType} disp={showNotification} heyRe_Render={heyRe_Render}></Notification>
        </React.Fragment>
    )
}
export default Commentaire
