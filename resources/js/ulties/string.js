export const formatDate = timestamp => {
    let time = new Date(timestamp);
    let date = '0' + time.getDate();
    let mon = '0' + time.getMonth();
    let year = time.getFullYear();
    return date.substr(-2) + '-' + mon.substr(-2) + '-' + year;
}