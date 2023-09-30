
// Преобрзаует дату и время у локальный формат

function getFormatDate(datetime, opt=null) {
    console.log(datetime)
   
    if (datetime == '') {
            return '-'
    } else {
            const date_in = new Date(datetime);
            const shortDateTime = date_in.toLocaleString('ru-RU', { timeZone: 'UTC' })
            return shortDateTime;   
    }  
}

function getDate(datetime, opt=null) {
    console.log(datetime)
   
    if (datetime == '') {
            return '-'
    } else {
            const date_in = new Date(datetime);
            const shortDateTime = date_in.toLocaleDateString('ru-RU', { timeZone: 'UTC' })
            return shortDateTime;   
    }  
}



export {getFormatDate, getDate};