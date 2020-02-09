export const FormatDate=(date)=>{
    const d = new Date(date);
    const day=d.getDay();
    const month=d.getMonth();
    const year = d.getFullYear();
    const time=d.getHours()+':'+('0'+d.getMinutes()).slice(-2);

    return day+'/'+month+'/'+year+' '+time;
};