export const UseDate=(dateTime)=>{/* String dateTime*/
        var date=dateTime.split(" ");
        var time=date[1]; 
        date=date[0].split("-");  
        time=time.split(":");
        const today =new Date(); 
        var day= today.getDate()
        var month=today.getMonth()+1; 
        var year=today.getFullYear();
        var second=today.getSeconds(); 
        var minute=today.getMinutes(); 
        var hour=today.getHours();
        const yearCalculateMessage=Number(date[0])+Number(date[1])/12
        const yearCalculateSys=year+month/12
        const monthCalculateMessage=Number(date[0])*12+Number(date[1])+Number(date[2])/30
        const monthCalculateSys=year*12+month+day/30
        const daysCalculateMessage=Number(date[0])*12*30+Number(date[1])*30+Number(date[2])+Number(time[0])/24
        const daysCalculateSys=year*12*30+month*30+day+(hour/24)
        const hoursCalculateMessage=Number(date[0])*12*30*24+Number(date[1])*30*24+Number(date[2])*24+Number(time[0])+(Number(time[1])/60)
        const hoursCalculateSys=year*12*30*24+month*30*24+day*24+hour+(minute/60)
        const minutesCalculateMessage=Number(date[0])*12*30*24*60+Number(date[1])*30*24*60+date[2]*24*60+Number(time[0])*60+Number(time[1])
        const minutesCalculateSys=year*12*30*24*60+month*30*24*60+day*24*60+hour*60+minute
        if(parseInt(yearCalculateSys-yearCalculateMessage)>0)
        {
            return "Il ya "+parseInt(yearCalculateSys-yearCalculateMessage)+" annees";
        }
        else if(parseInt(monthCalculateSys-monthCalculateMessage)>0)
        {
            return "Il ya "+parseInt(monthCalculateSys-monthCalculateMessage)+" mois";
        }
        else if(parseInt(daysCalculateSys-daysCalculateMessage)>0)
        {
            return "Il ya "+parseInt(daysCalculateSys-daysCalculateMessage)+" days";
        }
        else if(parseInt(hoursCalculateSys-hoursCalculateMessage)>0)
        {
            return "Il ya "+parseInt(hoursCalculateSys-hoursCalculateMessage)+" hours";
        }
        else if(parseInt(minutesCalculateSys-minutesCalculateMessage)>0)
        {
            return "Il ya "+parseInt(minutesCalculateSys-minutesCalculateMessage)+" minutes";
        }
        else 
        {
            return "Now";
        }
}