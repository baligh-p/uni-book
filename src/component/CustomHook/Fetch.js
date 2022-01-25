import axios from "axios"


export const UseFetch=async(url)=>{
    var result=await axios.get(url) 
    result=await result.data
    return await result;
}