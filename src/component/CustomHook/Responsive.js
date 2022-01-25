export const useResponsive=(refmax,refmin=0)=>{
    return (window.innerWidth>=refmin&&window.innerWidth<refmax);/*true si mobile for example*/
}