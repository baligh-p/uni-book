import React,{useState,useEffect} from 'react'
import Post from "./Post"
import {UseDate} from "./CustomHook/CustomDate"
import axios from "axios"
import $ from "jquery"
const Publication = () => {
    const [allPost,setAllPost]=useState([])
    const  [offset, setOffset] = useState(5)
    const [loadingPost, setLoadingPost] = useState(true)
    useEffect(async() => {
            var result=await axios.get(`http://localhost/BookBackend/getPosts.php?offset=0`)
            .then(async(res)=>{
                res=await res.data 
                await setAllPost(res)
                setLoadingPost(false)
            })
    }, [])
    const changeDate=(date)=>{
        return UseDate(date)
    }
    useEffect(() => {/*done*/
        $(window).scroll(async function() {
        const percent=(window.pageYOffset / (document.body.scrollHeight - window.innerHeight))
            if(percent>1&&!loadingPost)
            {
                await setLoadingPost(true)
                var data=await axios.get(`http://localhost/BookBackend/getPosts.php?offset=${allPost.length}`)
                .then(async(res)=>{
                    res=await res.data
                    if(res.length!=0)
                    {
                        await setAllPost([...allPost,...res])
                    }
                    else 
                    {
                        try 
                        {
                            document.getElementById("aucunePost").innerHTML="<p style=font-family:bodyFont;>No More Posts</p>";
                        }
                        catch(err)
                        {

                        }

                    }
                    await setLoadingPost(false)
                }) 
            }
        })
        return ()=>{
            $(window).off()
        }
    })
    return (
        <React.Fragment>
            <div className="publicationContainer">
                {allPost.map((data)=>{
                    return(
                        <Post key={data.idPost} idPost={data.idPost} username={data.username} 
                        nbrCommentaire={"0"} like={data.jaime} 
                        dislike={data.jaimePas} bookId={data.bookId} 
                        datePost={changeDate(data.datePost)} 
                        bookName={data.bookName} messagePost={data.messagePost}/>
                    )
                })}
            </div>
            <div className="loadingPostContainer" id="aucunePost" style={{width: "100%",marginTop:"-20px",marginBottom:"20px",display: "flex",alignItems: "center",justifyContent:"center"}}>
                <div className="lds-roller">
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Publication
