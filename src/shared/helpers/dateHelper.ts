class DateHelper {

  public dateToStringBR(date: Date) {
    const day = !/\d{2}/.test(date.getUTCDate().toString()) ? "0" + date.getUTCDate() : date.getUTCDate();
    const dateString =  day + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return dateString
  }

  public dateWithoutTime(date: Date) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    date.setUTCHours(0)
    date.setUTCMinutes(0)
    date.setUTCSeconds(0)
    date.setUTCMilliseconds(0)
    return date
  }
}
export default DateHelper;
