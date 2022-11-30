import moment from "moment-timezone";

export const getESTISOString = (isostringUTC) => {
    let date = moment(isostringUTC).tz("Europe/London")
    return date.tz("America/New_York").format()
}
