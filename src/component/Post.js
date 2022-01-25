import React,{useState,useEffect,useRef} from 'react'
import {useCookies} from "react-cookie"
import{Link} from "react-router-dom"
import axios from "axios"
import {UseDate} from "./CustomHook/CustomDate"
import $ from "jquery"
import "../scss/Post.scss"
import Comment from "./Comment"
import styled from "styled-components"
const Alert=styled.p`
font-family:bodyFont;
font-size:12px;
font-weight:600; 
text-decoration:underline; 
width:100% ; 
text-align:center;
`
const Post = React.memo(({idPost,username,datePost,bookName,like,nbrCommentaire,bookId,messagePost}) => {
    /*cookies*/
    const [cookie,setCookie]=useCookies();

    const [book,setBook]=useState([]);
    const [commentaire,setCommentaire]=useState([])
    const [openComment,setOpenComment]=useState(false)
    const postTxt=useRef(null);

    const inputComment=useRef()
    const label=useRef()
   const [reactLike, setReactLike] = useState("./icons/like.png")
   const [incrementLike,setIncrementLike]=useState(0)
   /*get 5 first book*/
   const getFirstBook= async() => {
       if(bookId!=null)
        {
            var donne=await axios.get(`http://localhost/BookBackend/getSomeBooks.php?selectedBook=${bookId}`)
            donne=await donne.data 
            setBook(donne)
        } 
    }
    useEffect(() => {
        getFirstBook()
    }, [])
    /*test if une post have react or no*/
    async function verifLike(){
            var donne=await axios.get(`http://localhost/BookBackend/post.php?clidVerif=${cookie.clid}&idPostVerif=${idPost}&type=like`)
            donne=await donne.data 
            if(donne==1)
            {
                setReactLike("./icons/like.png")
            }
            else 
            {
                setReactLike("./icons/like-blue.png")
            }
        }
    useEffect(() => { 
        verifLike();    
    },[])


    /*more button handle*/


   const handleMoreText=(e)=>{
       if(e.target.innerText=="More")
           {
            postTxt.current.style.overflow="initial"
            postTxt.current.style.maxHeight="100%"
            e.target.innerText="Hide"
           }
        else 
        {
            postTxt.current.style.overflow="hidden"
            postTxt.current.style.maxHeight="71px"
            e.target.innerText="More"
        }
   }
   /*handle input comment*/
   const handleLabel=()=>{
       label.current.style.transform="translateY(0)"
       label.current.style.left="2px"
       label.current.style.fontSize="11px"
       inputComment.current.style.borderColor="rgb(60, 231, 146)";
   }
   const handleInputComment=()=>{
       if(inputComment.current.value=="")
       {
           label.current.style.transform="translateY(28px)"
           label.current.style.left="5px"
           label.current.style.fontSize="12px"
           inputComment.current.style.borderColor="rgba(128, 128, 128, 0.692)";
       }
       else 
       {
           inputComment.current.style.borderColor="rgb(60, 231, 146)";
       }
   }


   /*handle jaime Button*/


   const handleJaime=async(e)=>{
       var data=new FormData(); 
       data.append("clid",cookie.clid); 
       data.append("idPost",idPost); 
       data.append("typeReact","like");
       var result=await axios.post(`http://localhost/BookBackend/post.php`,data)
       .then(async(res)=>{
           
           if(e.target.getAttribute("src")=="./icons/like.png")
           {
              setReactLike("./icons/like-blue.png")
              setIncrementLike(()=>{
                  return incrementLike-1;
                })
              
           }
           else 
           {
               setReactLike("./icons/like.png")
                setIncrementLike(()=>{
                  return incrementLike+1;
                })
           }
       })
   }

   /*handle Submit*/

   const partComment=useRef();
   const submitMessage=async(e)=>{
       e.preventDefault();
       var data=new FormData();
       if(inputComment.current.value!="")
       {
            data.append("clid",cookie.clid); 
            data.append("idPost",idPost); 
            data.append("comment",inputComment.current.value)
            e.target.style.display="none"
            var result=await axios.post("http://localhost/BookBackend/handleCommentPost.php",data).then(()=>{
            inputComment.current.value=""
            inputComment.current.focus()
            e.target.style.display="block"
       })
       }
   }
   const [loader,SetLoader]=useState(true)

   /*handle openning + get comment Of post */

   const handleComment=async()=>{  
       if(!openComment)
       {
           partComment.current.style.height="auto"
           setOpenComment(true);
       }
       else 
       {
           partComment.current.style.height=0;
           setOpenComment(false);
       } 
       var result=await axios.get(`http://localhost/BookBackend/handleCommentPost.php?idPost=${idPost}`).then((result)=>{
            SetLoader(false)
            result=result.data
            setCommentaire(result)
       })
   } 
   
   /* change date format */
   const changeDate=(date)=>{
       return UseDate(date)
   }
    return (
        <div className="postContainer">
                <div className="part1">
                    <img src="./icons/983249.jpg" className="photoUser" alt="user photo profil"/>
                    <h2 className="typerName">{username}</h2>
                    <p className="datePost">{datePost}</p>
                    <img src="./icons/options.png" alt="options book" className="optionsImage" />
                </div>

                <div className="part2">
                    {book.length==0&&<h3 className="bookName">{"About : "+bookName}</h3>}
                    <p className="postTxt" ref={postTxt}>{messagePost}</p>
                    <button className="more" onClick={handleMoreText}>More</button>
                </div>


                {book.length>0&&<div className="bookContainer">
                    <Link to={`pathname`} className="linkDist"><h3 className="bookName">{book[0].name}</h3></Link>
                    <h3 className="typer">{book[0].username}</h3>
                    <img src={book[0].cheminImage} alt="book image"/>
                </div>}


                <div className="part3">
                    <div className="like">
                        <img src={reactLike} className="reactImage" onClick={handleJaime}/>
                        {like-incrementLike!="0"&&<p>{like-incrementLike}</p>}
                    </div>
                    <div className="comment" onClick={handleComment}>
                        <img src="./icons/comment.png"/>
                    </div>
                    <div className="share">
                        <img src="./icons/share.png"/>
                    </div>
                </div>
                <div className="partComments" ref={partComment}>
                    <div className="commentsContainer">

                        {commentaire.map(({comment,idComment,dateComment,username})=>{
                            return (<Comment key={idComment} date={changeDate(dateComment)} comment={comment} 
                            typerName={username} cheminImage={"./icons/983249.jpg"} />)
                        })}
                        {!loader&&commentaire.length==0&&<Alert>No Comments</Alert>}

                        {loader&&<div style={{width: "100%",marginTop:"0",marginBottom:"20px",display: "flex",alignItems: "center",justifyContent:"center"}}>
                            <div className="lds-roller">
                                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div>
                        </div>}
                    </div>
                    <form className="commentContainer">
                        <img src="./icons/983249.jpg" className="photoUser" alt="user photo profil"/>
                        <label ref={label}  onClick={()=>{inputComment.current.focus()}}>Write Comment</label>
                        <textarea onFocus={handleLabel} onBlur={handleInputComment} className="postInputComment" ref={inputComment}/>
                        <img src="./icons/send2.png" alt="send comment" className="sendCommentPhoto" onClick={submitMessage}/>
                    </form>
                </div>
        </div>
    )
})

export default Post
