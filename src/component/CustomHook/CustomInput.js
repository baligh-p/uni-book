import $ from "jquery"
export const UseTrueLength=(string)=>{
    return (Array.from(string).filter(data=>data!=" ").length)
}