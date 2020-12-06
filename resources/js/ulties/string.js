export const formatDate = timestamp => {
    let time = new Date(timestamp);
    let date = '0' + time.getDate();
    let mon = '0' + time.getMonth();
    let year = time.getFullYear();
    return date.substr(-2) + '-' + mon.substr(-2) + '-' + year;
}

export const formatTimeInDay = timestamp => {
    let time = new Date(timestamp);
    let hour = '0' + time.getHours();
    let min = '0' + time.getMinutes();
    let sec = '0' + time.getSeconds();
    return hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2);
}

export const formatTimestamp = timestamp => {
    return formatDate(timestamp) + ' ' + formatTimeInDay(timestamp);
}