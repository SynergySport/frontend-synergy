

function getFormatRuForNum(num, opt=null) {
        const formatNum = Intl.NumberFormat("ru-RU").format(Math.round(num))
        return formatNum;   
    }  


export {getFormatRuForNum};
