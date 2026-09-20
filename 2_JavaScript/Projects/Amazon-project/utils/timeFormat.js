import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function  timeFormatter(addTime){
    const today = dayjs();
    return today.add(addTime, 'day').format('dddd, MMMM D');
}


export default timeFormatter;