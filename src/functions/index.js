export const FormatDate=(date)=>{
    const d = new Date(date);
    const day=d.getDay();
    const month=d.getMonth();
    const year = d.getFullYear();
    const time=d.getHours()+':'+('0'+d.getMinutes()).slice(-2);

    return day+'/'+month+'/'+year+' '+time;
};

export const FilterReply=(str)=>{

    const profanity =['ass','dick','fuck','poes','wanker','asshole', 'fucking','fucked','shit'];

    const splitStr=str.split(' ');

    const newStr = splitStr.filter(word=>{
        if(!profanity.includes(word)){
            return word
        }
    }).join(' ');


    return newStr.replace(/[^\w\s]/gi, '');

};