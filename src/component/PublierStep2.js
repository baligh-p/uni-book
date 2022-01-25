import React,{useEffect, useState,useRef} from 'react'
import {useHistory} from "react-router-dom"
import axios from 'axios'
import $ from "jquery"
import {useCookies} from "react-cookie"
const PublierStep2 = () => {
    const [types,setTypes]=useState([]);
    const [valuePrice, setValuePrice] = useState("");
    const [numberPage, setNumberPage] = useState("")
    const [free,setFree]=useState("flex"); 
    const [type,setType]=useState("default");
    const [level,setLevel]=useState("default");
    const [languages,setLanguages]=useState([]);
    const [currentLanguage, setCurrentLanguage] = useState("");

    const history=useHistory();
    const [cookie,setCookie]=useCookies();

    const selectType = useRef(null); 
    const selectLevel=useRef(null);
    const inputPrice = useRef(""); 
    const inputPage = useRef("")
    const inputLanguage=useRef("");

    useEffect(() => {
        try 
        {
            const {valueName,valueCreator,valueDescription}=history.location.state; /* not important 
            because it will transfere with history.location.state object ..just for try the exception*/
        }catch(err)
        {
            history.push("/add_book/step1");
        }
    }, [])
    useEffect(() => {
        if(cookie.clid==undefined) 
        {
            history.push("/");
        }
    })


    const fetchTypes=async()=>{
        const result=await axios.get("http://localhost/BookBackend/handleForm.php?getTypes=true").then(Response=>{
            setTypes(Response.data);
        })
    }
    
    const handleInputPadding=(input,value,color,label)=>{
        const id=input.getAttribute("id"); 
        $(`label[for=${id}]`).css({"top":`${value}`,"color":`${color}`}).html(label)
    }


    const handleInput=(e)=>{
        if(e.target.getAttribute("id")=="price") setValuePrice(inputPrice.current.value)
        else if(e.target.getAttribute("id")=="numberPage") setNumberPage(inputPage.current.value)
        else if(e.target.getAttribute("id")=="language") setCurrentLanguage(inputLanguage.current.value)
    }
    /*change label*/
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
        if(inputPrice.current.value=="") 
        {
            handleInputPadding(inputPrice.current,"25px","black","Price")
            inputPrice.current.value="";
            inputPrice.current.style.borderBottomColor="rgba(128, 128, 128, 0.24)";
        }
        else 
        {
            handleInputPadding(inputPrice.current,"0","rgb(60, 231, 146)","Price")
            inputPrice.current.style.borderBottomColor=" rgb(60, 231, 146)";
        }
        if(inputPage.current.value=="")
        {
            handleInputPadding(inputPage.current,"25px","black","Number")
            inputPage.current.value="";
            inputPage.current.style.borderBottomColor="rgba(128, 128, 128, 0.24)";
        } 
        else
        {
            handleInputPadding(inputPage.current,"0","rgb(60, 231, 146)","Number")
            inputPage.current.style.borderBottomColor=" rgb(60, 231, 146)";
        } 
        if(currentLanguage=="")
        {
            handleInputPadding(inputLanguage.current,"25px","black","Language")
            inputLanguage.current.style.borderBottomColor="rgba(128, 128, 128, 0.24)";
        }
        else 
        {
            handleInputPadding(inputLanguage.current,"0","rgb(60, 231, 146)","Language")
            inputLanguage.current.style.borderBottomColor=" rgb(60, 231, 146)";
        }
    }, [valuePrice,numberPage,currentLanguage])

    const handleCheckPrice=(e)=>{
        if(e.target.checked==true)
        {
            setFree("none");
            setValuePrice(0);
        } 
        else
        {
            setFree("flex");
        } 
    }


    /*fetch the type of books to the select element*/
    useEffect(() => {
        fetchTypes();
    }, [])

    /*handle submit part */

    const handleSubmit=(e)=>{
        e.preventDefault();
        var submit=true;
        if(type=="default")
        {
            submit=false;
            $(`#typeBook option[value=default]`).text("please select type");
            $(`#typeBook`).css({"backgroundColor":"#D0342C"});
        }
        if(level=="default")
        {
            submit=false;
            $(`#level option[value=default]`).text("please select level");
            $(`#level`).css({"backgroundColor":"#D0342C"});
        }
        if(free=="flex"&&(valuePrice==""||Number(valuePrice)<1)) 
        {
            changeLabel(inputPrice.current,"Price cannot be this value");
            inputPrice.current.value=""
            submit=false;
        }
        if(numberPage==""||Number(numberPage)<1)
        {
            changeLabel(inputPage.current,"Number of Page cannot be this value");
            inputPage.current.value=""
            submit=false;
        }
        if(languages.length<1)
        {
            changeLabel(inputLanguage.current,"you should add at least 1 language");
            inputLanguage.current.value=""
            submit=false; 
        }
        if(submit)
        {
            if(!valuePrice)
            {


            }
            const obj={...(history.location.state),type,level,valuePrice,numberPage,free,languages}
            history.push({pathname:"/add_book/step3",state:obj});
        }
    }

    /*handle languages */
    const addLanguages=()=>{
        if(languages.length==10)
        {
            console.log("max languages")
        }
        else 
        {
            if(inputLanguage.current.value!="")
            {
                if(languages.indexOf(inputLanguage.current.value)==-1)
                {
                    setLanguages([...languages,inputLanguage.current.value]);
                    inputLanguage.current.value="";
                    setCurrentLanguage(inputLanguage.current.value)
                }
            }
        }
    }
    const deleteLanguage=(e)=>{
        setLanguages(languages.filter(data=>data!=e.target.textContent))
    }
    /*handle select */
    const handleSelect=(e)=>{
       if(e.target.getAttribute("id")=="typeBook")
       {
           setType(e.target.value);
           $(`#typeBook`).css({"backgroundColor":"rgb(60, 231, 146)","color":"white"});
           
       }
       else if(e.target.getAttribute("id")=="level")
       {
           setLevel(e.target.value);
           $(`#level`).css({"backgroundColor":"rgb(60, 231, 146)","color":"white"});
       }
    }

    return (
        <form className="publierBook">
            <h2 className="title">Publish Book</h2> 
            {/*input for language*/}
            <div className="languageContainer">
                <label className="txt" htmlFor="language">Language</label>
                <input type="text" ref={inputLanguage} onInput={handleInput} id="language" list="listLanguage"/>
                <datalist id="listLanguage">
                    <option value="French">French</option>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                </datalist>
                <button type="button" onClick={addLanguages} className="addButton">Add</button>
                {(languages.length>0)&&<p style={{fontFamily:"bodyFont",fontSize:"9px"}}>click language to delete</p>}
                <div className="books">
                    {languages.map((i)=>{
                        return (
                            <div className="addedLanguages" key={i} onClick={deleteLanguage}>
                                <p className="nameLanguage">{i}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="checkBox">
                <label  className="nottxt" htmlFor="checkPrice" >Free</label>
                <input type="checkbox" id="checkPrice" onClick={handleCheckPrice}/>
            </div>
            {/*input for price*/}
            <label style={{display:free}} className="txt" htmlFor="price">Price</label>
            <input type="number" style={{display:free}} ref={inputPrice} onInput={handleInput} id="price"/>
            {/*input for number of pages*/}
            <label className="txt" htmlFor="numberPage">Number of Pages</label>
            <input type="number"  ref={inputPage} id="numberPage" onInput={handleInput} />
            {/*Select  */}
            <select id="typeBook" ref={selectType} onChange={handleSelect}>
                <option value="default">Book type</option>
                {types.map(({nameType})=>{
                    return (<option key={nameType} value={nameType}>{nameType}</option>)
                })}
            </select>
            <select id="level" ref={selectLevel} onChange={handleSelect}>
                <option value="default">Level Of Understand</option>
                <option value="easy">easy to understand</option>
                <option value="medium"> medium to understand</option>
                <option value="difficult">difficult to understand</option>
            </select>
            <div className="buttonContainer">
                    <button type="button" onClick={()=>history.goBack()} className="buttonSubmit">Back</button>
                    <button type="submit" onClick={handleSubmit} className="buttonSubmit">Next</button>
            </div>
        </form>
    )
}

export default PublierStep2
