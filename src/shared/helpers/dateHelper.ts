class DateHelper {
  public dateToStringBR(date: Date) {
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return dateString
  }
}
export default DateHelper;
