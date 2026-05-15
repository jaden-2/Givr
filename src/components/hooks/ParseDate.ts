export function parseZonedDateTime(zonedDateTimeStr:string) {
  const date = new Date(zonedDateTimeStr);
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function parseTime(timeTimeStr:string){
  const date = new Date(timeTimeStr)

  return date.toLocaleTimeString("en-uk")
}