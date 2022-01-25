import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {useCookies} from "react-cookie";
import "../scss/Search.scss";
import "../scss/others.scss";
import axios from "axios";
const NavHome =() => {
    const [data2,setData2] = useState([]);
    const [profil, setProfil] = useState([]);
    const [verif, setVerif] = useState(false);
    const [pt, setPt] = useState("");
    const [cookie,setCookie]=useCookies(); 

    /* get profil when connect or open Session*/

    const getProfil=async()=>{
        if(cookie.clid==undefined)
        {
            
        }
        else 
        {
            var result=await axios.get(`http://localhost/BookBackend/getProfil.php?getProfil=${cookie.clid}`);
            setProfil(await result.data);
        }
    }

    

        useEffect(async() => {
            getProfil();
        },[window.location.pathname])


    /* know type device mobile->if true*/
    useEffect(() => {
        var taille=window.innerWidth;
        if(taille<900)
        {
            setVerif(true);
        }
    },[])

    /*Correct nav search */

    useEffect(() => {
        const logo=document.getElementById("searchLogoNav");
        const i=document.getElementById("inter");
        if(!verif)
        {
        logo.click();
        }
    },[])

    /* handle menu*/

     const burgerClick=()=>{
        var idBurger=document.getElementById("burger");
        var liste=document.getElementById("listeContainer");
        if(idBurger.getAttribute("class")!=="active")
        {
            idBurger.setAttribute("class", "active");
            liste.style.width="70vw";
        }
        else{
             idBurger.setAttribute("class", "Notactive");
             liste.style.width="0";
        }
    }

    /* close menu when Click on nav item*/
     
    const closeMenu=()=>{
        const burg=document.getElementById("burger");
        const liste=document.getElementById("listeContainer");
        if(getComputedStyle(burg).display==="flex")
        {
            burg.setAttribute("class", "Notactive");
            liste.style.width="0";
        }
    }

    /* handle the search*/

    const handleSearch=async(e)=>{
        const container=document.getElementById("searchContainer");
        setTimeout(()=>{
            container.style.display="flex";
        },700)
        if(e.target.value!="")
        {
           var result=await axios.get(`http://localhost/BookBackend/getSomeBooks.php?selector=${e.target.value}`)
           result=await result.data 
           setData2(result)
        }
        else 
        {
            setData2([]);
        }
    }
    const [compt, setCompt] = useState(0);
    useEffect(()=>{
        const input=document.getElementById("searchNav");
        const container=document.getElementById("searchContainer");
        const nav=document.getElementById("navHome");
        const inter=document.getElementById("inter");
        if(compt==0)
        {
            try 
            {
            nav.style.display="flex";
            container.style.display="none";
            inter.style.display="none";
            input.style.display="none"; 
            }catch(err)
            {
                
            }  
        }
    })
    const searchInput=()=>{
        
        const input=document.getElementById("searchNav");
        const logo=document.getElementById("searchLogoNav");
        const container=document.getElementById("searchContainer");
        const inp=document.getElementById("searchNavInput");
        const disp=document.querySelectorAll(".displayForSearch"); 
        const nav=document.getElementById("navHome");
        const inter=document.getElementById("inter");
        if(!verif) 
        {
            if(input.style.width=="0px")
            {
                input.style.width="35vw";
                logo.setAttribute("src","/icons/x.png");
                disp.forEach((d)=>{
                    d.style.display="none"; 
                })
                logo.style.marginLeft="-5.5vw"; 
                inp.style.display="flex";
                inp.focus();
            }
            else
            {
                input.style.width="0";
                disp.forEach((d)=>{
                    d.style.display="block"; 
                })
                logo.style.marginLeft="auto"; 
                logo.setAttribute("src","/icons/search.png");
                container.style.display="none";
                inp.style.display="none";
            }
        }
        else
        {
            if(nav.style.display=="flex")
            {
                nav.style.display="none";
                container.style.display="flex";
                inter.style.display="flex";
                input.style.display="flex";
                setCompt(()=>{
                    return compt+1
                })
            }
            else 
            {
                nav.style.display="flex";
                container.style.display="none";
                inter.style.display="none";
                input.style.display="none";  
                setCompt(()=>{
                    return compt+1
                })
            }
        }
    }


    /*LOG OUT FUNCTION*/

    const logOut=()=>{ 
        setCookie("clid","", {maxAge:0});
        window.location.reload();
    }
    /*return*/
    return (
        <React.Fragment>
            <div>
                {verif&&<li id="searchNav"><input onKeyUp={handleSearch} type="text" id="searchNavInput" className="searchNavInput" placeholder="Find book profil team ..." autoComplete="off" /></li>}
                {verif&&<li ><img src="/icons/x.png"  onClick={()=>searchInput()} id="inter" className="searchLogoNav positionInter" alt="search logo"/></li>}
            </div>
            {verif&&<div className="searchContainer" id="searchContainer">
                {data2.map(({cheminImage,name,username,prix,bookId})=>{
                    return(
                        <React.Fragment key={bookId}>
                        <Link to={`/document/${name}/${bookId}`} onClick={()=>searchInput()} className="destroy">
                                <div className="resultSearch" >
                                    <img src={"./"+cheminImage} className="resultSearchImage" alt="book image"/>
                                    <p className="nameSearch">{name}</p>
                                    <p className="founderSearch">{username}</p>
                                    <p className="prixSearch">{prix+"€"}</p>
                                </div>
                        </Link>
                        </React.Fragment>
                    )
                })}
            </div>}
        <div className="navHome" id="navHome">
                <div className="navHomePart1" id="navHomePart1">
                    <li className="homeLogoContainer">
                      <Link  className="navHomeItem" to="/">
                        <div className="logo">
                            <p className="siteName">Uni-Book</p>
                        </div>
                      </Link>
                    </li>
                    {verif&&<li ><img src="/icons/search.png"  onClick={()=>searchInput()} id="searchLogoNav" className="searchLogoNav" alt="search logo"/></li>}
                    <li id="burger"><div onClick={burgerClick} className="burger"></div></li>
                </div>
                <div className="navHomePart2" id="listeContainer">
                    <div className="allSearchItem">
                        {!verif&&<li id="searchNav"><input onKeyUp={handleSearch} type="text" id="searchNavInput" className="searchNavInput" placeholder="Find book profil team ..." autoComplete="off" /></li>}
                    {!verif&&<div className="searchContainer" id="searchContainer">
                         {data2.map(({cheminImage,name,username,prix,bookId})=>{
                    return(
                        <React.Fragment key={bookId}>
                        <Link to={`/document/${name}/${bookId}`} onClick={()=>searchInput()} className="destroy">
                                <div className="resultSearch" >
                                    <img src={"./"+cheminImage} className="resultSearchImage" alt="book image"/>
                                    <p className="nameSearch">{name}</p>
                                    <p className="founderSearch">{username}</p>
                                    <p className="prixSearch">{prix+"€"}</p>
                                </div>
                        </Link>
                        </React.Fragment>
                    )
                })}
                    </div>}
                    </div>
                    {!verif&&<li><img src="/icons/search.png" onClick={()=>searchInput()} id="searchLogoNav" className="searchLogoNav" alt="search logo"/></li>}
                    <li className="displayForSearch"><Link onClick={closeMenu}className="navHomeItem" to="/Books">Books</Link></li>
                     {(profil.length>0)&&<li className="displayForSearch"><Link onClick={closeMenu}className="navHomeItem" to="/Post_Books">Posts</Link></li>}
                     {(profil.length>0)&&<li className="displayForSearch"><Link onClick={closeMenu}className="navHomeItem" to="/add_Book/step1">Add Post</Link></li>}
                    <li className="displayForSearch"><Link onClick={closeMenu} className="navHomeItem" to="/contact">Contact</Link></li>
                    {!profil.length>0&&<li><Link  onClick={closeMenu} className="navHomeItem" to="/sign"><p className="sign">Sign In</p></Link></li>}
                    {!profil.length>0&&<li><Link onClick={closeMenu} id="login"className="navHomeItem" to="/login">Log In</Link></li>}
                    {(profil.length>0)&&<li><div className="logOutContainer" onClick={logOut}>
                        <div className="profilCircle"><p className="profilCircleLink" 
                        title={profil[0].username+" Account"} to="/error">{!verif&&(profil[0].username[0])||
                        (profil.length>0&&"My Account")}</p></div>
                        {verif&&<img className="logOut" src="/icons/profile-user.png"/>}
                    </div></li>}
                    {(profil.length>0&&verif)&&<li>
                        <div className="logOutContainer" onClick={logOut}>
                            <p>Log Out</p>
                            <img id="logOut" className="logOut" src="/icons/power-off.png"/>
                        </div>
                    </li>}
                </div>
        </div>
        </React.Fragment>
    )
}

export default NavHome