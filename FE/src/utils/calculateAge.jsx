export const  calculateAge = (dateOfBirth) =>
    {
  if(dateOfBirth){
    const current_date = new Date()
    const dob  = new Date(dateOfBirth)
    var year = current_date.getFullYear() - dob.getFullYear();
    var m = current_date.getMonth() - dob.getMonth();
  
    const age  = year+' years '+ m + " month"
    return age;
  }
        return "";
    }