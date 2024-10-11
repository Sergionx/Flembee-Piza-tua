export function getUtcDate(value: any){
  const date = new Date(value);

  const difference = date.getTimezoneOffset();
  return new Date(
    date.getTime() + difference * 60000
  );
}