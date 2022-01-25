import React,{useState,useEffect,useRef} from 'react'
import data from '../Data/BookData';
import IconBook from "./IconBook"
const BandBook = ({bandTitle,lang,marginTop,marginBottom,nbr,type,prix}) => {
  const band= useRef(null)
  const [index, setIndex] = useState(0);
  const burger=document.getElementById("burger");
  const scrollL=()=>{
    var t=window.innerWidth;
    if(index>nbr-2)
    {
      
    }
    else if(t>=900)
    {
      var taille=window.innerWidth;
      band.current.scrollLeft+=taille;
    }
    else 
    {
    var taille=window.innerWidth; 
    var val=getComputedStyle(band.current).marginLeft;
    if(val.indexOf(".")==-1)
    {
      val=val.split("p");
    } 
    else 
    {
      val=val.split(".");
    }
    band.current.style.marginLeft=(Number(val[0])-taille)+"px";
    }
    if(index<=nbr-2)
    {
      setIndex(()=>{
      return index+1;
    })
    }
    
  }
  const scrollR=()=>{
    var t=window.innerWidth;
    if(index<=0)
    {

    }
    else if(t>=900)
    {
    var taille=window.innerWidth;
    band.current.scrollLeft-=taille;
    }
    else 
    {
      var taille=window.innerWidth; 

    var val=getComputedStyle(band.current).marginLeft;
    if(val.indexOf(".")==-1)
    {
      val=val.split("p");
    } 
    else 
    {
      val=val.split(".");
    }
    band.current.style.marginLeft=(Number(val[0])+taille)+"px";
    }
    if(index>0)
    {
      setIndex(()=>{
      return index-1;
    })
    }
  }
    return (
        <div className="band" style={{marginBottom:marginBottom,marginTop:marginTop}}>
          <h3 className="titleBand">{bandTitle}</h3>
          <div className="lineBandTitle"></div>
          <img id="arrow-right" onClick={scrollL} className="arrow arrowRight" src="./icons/right-arrow.png" alt="fleche left"/>
          <img id="arrow-left"  onClick={scrollR} className="arrow arrowLeft" src="./icons/left-arrow.png" alt="fleche left"/>
          <div className="bandBook" ref={band}>
            <IconBook lang={lang} nbr={nbr} type={type} prix={prix}/> 
          </div>
        </div>
    )
}

export default BandBook
