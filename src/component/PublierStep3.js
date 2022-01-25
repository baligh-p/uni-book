import React,{useEffect,useState,useRef} from 'react'
import {useHistory} from "react-router-dom"
import {useCookies} from "react-cookie"
import Notification from "./Notification"
import $ from "jquery"
import axios from 'axios'
const PublierStep3 = () => {
    /*state*/
    const [available,setAvailable]=useState([]);
    const [currentPays,setCurrentPays]=useState("");
    const [srcImage, setSrcImage] = useState("/icons/add-image.png")
    const [fileName,setFileName]=useState("No file uploaded")
    const [loading, setLoading] = useState("Publish")
    /*statec for notification*/
    const [message, setMessage] = useState("");
    const [notificationType, setNotificationType] = useState(""); 
    const [showNotification, setShowNotification] = useState("none"); 
    const [heyRe_Render,setHeyRe_Render]=useState(0);
    /*useRef*/
    const pays = useRef("");
    const photo = useRef(null);
    const file = useRef(null)
    /*useHistory*/
    const history=useHistory();
    /*cookie*/
    const [cookie,setCookie]=useCookies();


    /*utilisateur passe les 2 etapes precedent ou non ?*/
    useEffect(() => {
        try 
        {
            const {valueName,valueCreator,valueDescription,type,valuePrice,numberPage,free,languages}=history.location.state
        }catch(err)
        {
            history.push("/add_book/step1");
        }
    }, [])

    useEffect(() => {
        if(pays.current.value=="") 
        {
            handleInputPadding(pays.current,"25px","black","Where your Book is available ?")
            pays.current.value="";
            pays.current.style.borderBottomColor="rgba(128, 128, 128, 0.24)";
        }
        else 
        {
            handleInputPadding(pays.current,"0","rgb(60, 231, 146)","Where your Book is available ?")
            pays.current.style.borderBottomColor=" rgb(60, 231, 146)";
        }
    }, [currentPays])

    const handleInputPadding=(input,value,color,label)=>{
        const id=input.getAttribute("id"); 
        $(`label[for=${id}]`).css({"top":`${value}`,"color":`${color}`}).html(label)
    }
    /*change label foe handle exceptions*/
    const changeLabel=(input,value)=>{
        const id=input.getAttribute("id");
        try 
        {
            $(`label[for=${id}]`).html(value).css({"color":"#f55057"});
            input.style.borderBottomColor="#f50057" ;
        }catch(err)
        {
            console.log("no element label");
        }
    }

    useEffect(() => {
        if(cookie.clid==undefined) history.push("/");
    },[window.location.pathname])

    /*handle submit */
    const handleSubmit=async(e)=>{
        e.preventDefault();
        var submit=true;
        if(available.length<1)
        {
            changeLabel(pays.current,"you should add at least 1 country");
            pays.current.value=""
            submit=false;
        }
        if(!photo.current.files[0]||photo.current.files[0].value=="")
        {
            setMessage("Photo cover book is required"); 
            setNotificationType("alert"); 
            setShowNotification("flex"); 
            setHeyRe_Render(heyRe_Render+1)
            submit=false;
        }
        if(submit)
        {
            setLoading("Loading...")
            var post=new FormData(); 
            const {valueName,valueCreator,valueDescription,type,valuePrice,numberPage,free,languages}=history.location.state;
            post.append("name",valueName); 
            post.append("creator",valueCreator);
            post.append("description",valueDescription); 
            post.append("price",valuePrice);
            post.append("type",type); 
            post.append("numberPage",numberPage); 
            post.append("free",free);
            post.append("available",available); 
            post.append("photo",photo.current.files[0]) 
            post.append("file",file.current.files[0])
            post.append("languages",languages);
            post.append("clid",cookie.clid);
            var value=await axios.post("http://localhost/BookBackend/handlePublish.php",post).then((res)=>{
                setMessage("book published"); 
                setNotificationType("success"); 
                setShowNotification("flex"); 
                setHeyRe_Render(heyRe_Render+1);
                setLoading("success");
                $("#publish").prop("disabled",true);
                $("#publishBack").prop("disabled",true);
                setTimeout(() => {
                   history.push("/");
                }, 1500);
            }).catch(()=>{
                setMessage("error please"); 
                setNotificationType("error"); 
                setShowNotification("flex"); 
                setHeyRe_Render(heyRe_Render+1)
                setLoading("Publish")
            })
        }
    }

    const handleImage=()=>{
        if(photo.current.files[0])
        {
            if(photo.current.files[0].type.indexOf("image")!=-1)
            {
                $("#ImageBook").attr("src",URL.createObjectURL(photo.current.files[0])).css({"height":"100%","width":"100%"})
            }
            else 
            {
                photo.current.files[0].value="";
                setMessage("type of Image is not supported"); 
                setNotificationType("alert"); 
                setShowNotification("flex"); 
                setHeyRe_Render(heyRe_Render+1)
                $("#ImageBook").attr("src","/icons/add-image.png").css({"height":"60px","width":"60px"})
            }
        }
        else 
        {
            $("#ImageBook").attr("src","/icons/add-image.png").css({"height":"60px","width":"60px"})
        }
    }

    const handleFile=(e)=>{
        const filetype=["pdf","docx","txt"]
        if(e.target.files[0])
        {
            var extension=e.target.files[0].name.split("."); 
            extension=extension[1];
            if(filetype.indexOf(extension)!=-1)
            {
                setFileName(e.target.files[0].name)
            }
            else
            {
                e.target.files[0].value="";
                setMessage("type of file is not supported"); 
                setNotificationType("alert"); 
                setShowNotification("flex"); 
                setHeyRe_Render(heyRe_Render+1)
                setFileName("No file uploaded")
            }
        }
        else 
        {
            setFileName("No file uploaded")
        }
    }

    const addPays=()=>{
        if(available.length==10)
        {
            console.log("max pays")
        }
        else 
        {
            if(pays.current.value!="")
            {
                if(available.indexOf(pays.current.value)==-1)
                {
                    setAvailable([...available,pays.current.value]);
                    pays.current.value="";
                    setCurrentPays(pays.current.value)
                }
            }
        }
    }

    const deletePays=(e)=>{
        setAvailable(available.filter(data=>data!=e.target.textContent))
    }

    const handleInput=(e)=>{
        if(e.target.getAttribute("id")=="pays") setCurrentPays(pays.current.value)
    }
    return (
        <React.Fragment>
            <form className="publierBook" encType="multipart/form-data">
                <h2 className="title">Publish Book</h2>
                {/*input pour quels pays ce livre est disponible dans le marche*/}
                <div className="languageContainer">
                    <label className="txt" htmlFor="pays">Where your Book is available ?</label>
                    <input type="text" id="pays" onInput={handleInput} ref={pays} list="listPays"/>
                    <datalist id="listPays">
                        <option value="tunisie">tunisie</option>
                        <option value="egypt">egypt</option>
                        <option value="algerie">algerie</option>
                    </datalist>
                    <button type="button" onClick={addPays} className="addButton">Add</button>
                    {(available.length>0)&&<p style={{fontFamily:"bodyFont",fontSize:"9px"}}>click Country to delete it</p>}
                    <div className="books">
                        {available.map((i)=>{
                            return (
                                <div className="addedLanguages" key={i} onClick={deletePays}>
                                    <p className="nameLanguage">{i}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/*files  */}
                <label htmlFor="photoBook" className="photoLabel">Your Book Cover<span style={{color:"red"}}>*</span></label>
                <input type="file" ref={photo} id="photoBook"  onInput={handleImage}/>
                <div className="imageContainer">
                    <img id="ImageBook" className="addPhoto" src={srcImage} alt='add photo' onClick={()=>{photo.current.click()}}/>
                </div>
                <label htmlFor="fileBook" style={{marginTop:"20px"}} className="photoLabel">Your Book file(<span style={{color:"green",fontFamily:"bodyFont",fontSize:"12px"}}>not required</span>)</label>
                <input className="fileBook" type="file" ref={file} id="fileBook" onInput={handleFile}/>
                <div style={{display:"flex",alignItems:"center"}}>
                    <button onClick={()=>{file.current.click()}} className="uploadFileButton" type="button">{(fileName=="No file uploaded")&&"Upload File"||"Change File"}</button>
                    <p style={{fontFamily:"bodyFont",fontSize:"13px",textOverflow:"hidden"}}>{fileName}</p>
                </div>
                {/*buttons submit and back*/}
                <div className="buttonContainer">
                    <button type="button" id="publishBack" onClick={()=>history.goBack()} className="buttonSubmit">Back</button>
                    <button type="submit" id="publish" onClick={handleSubmit} className="buttonSubmit">{loading}</button>
                </div>
            </form>
            <Notification message={message} type={notificationType} disp={showNotification} heyRe_Render={heyRe_Render}/>
        </React.Fragment>
    )
}

export default PublierStep3
