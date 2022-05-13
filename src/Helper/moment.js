import moment from "moment"

const small_date_time = 'DD MMM YY, h:mm a'
const long_date_time = 'dddd, MMMM Do YYYY, h:mm:ss a'
const small_time = 'h:mm a'
const long_time = 'h:mm:ss a'
const small_date = 'DD MMM YYYY'
const long_date = 'dddd, MMMM Do YYYY'

export const getDiff = (timestamp, deadline) => {
    if (!deadline) return
    const a = moment(timestamp);
    const b = moment(deadline);
    return b.diff(a);
}


export const formatDateTime = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment(timestamp).utcOffset("+05:30").format(long_date_time);
}

export const formatDateTimeSmall = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment(timestamp).utcOffset("+05:30").format(small_date_time);
}

export const formatUnixDateTime = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment.unix(timestamp).utcOffset("+05:30").format(long_date_time);
}

export const formatUnixDateTimeSmall = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment.unix(timestamp).utcOffset("+05:30").format(small_date_time);
}
// //////////////////////////////////// //////////  /   /       /   /   /   /

export const formatDate = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment(timestamp).utcOffset("+05:30").format(long_date);
}

export const formatDateSmall = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment(timestamp).utcOffset("+05:30").format(small_date);
}

export const formatUnixDate = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment.unix(timestamp).utcOffset("+05:30").format(long_date);
}

export const formatUnixDateSmall = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment.unix(timestamp).utcOffset("+05:30").format(small_date);
}

// //////////////////////////////////// //////////  /   /       /   /   /   /

export const formatTime = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment(timestamp).utcOffset("+05:30").format(long_time);
}

export const formatTimeSmall = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment(timestamp).utcOffset("+05:30").format(small_time);
}

export const formatUnixTime = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment.unix(timestamp).utcOffset("+05:30").format(long_time);
}

export const formatUnixTimeSmall = (timestamp) => {
    if (!timestamp) return "Timestamp not Found";
    return moment.unix(timestamp).utcOffset("+05:30").format(small_time);
}

export const getHourDiff = (timestamp, deadline) => {
    if (!deadline) return
    const a = moment.unix(timestamp);
    const b = moment(deadline);
    return b.diff(a, 'hour');
}

export const fromNow = (time) => {
    if (!time) return
    return moment(time).utcOffset("+05:30").fromNow();
}

export const fromNowUnix = (time) => {
    if (!time) return
    return moment.unix(time).utcOffset("+05:30").fromNow();
}

export const timeRemaining = (seconds) => {
    if (!seconds) return '0:00'
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const minutes = (seconds % 3600) / 60

    return [minutes, seconds % 60].map(format).join(':')
}