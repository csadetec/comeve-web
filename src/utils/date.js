const dateFormat = (dateString) => {
  let d = new Date(dateString)
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  //const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}`;
}

export default dateFormat