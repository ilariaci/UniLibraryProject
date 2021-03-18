//notinstitutional_email validator (Regex)
exports.validateEmail=function(value){
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
}

//institutional_email validator for student , institutional_email is composed by firstname '.' lastname , eventually a number, '@ studyUniv.it'
exports.validateStudentInstitutionalEmail=function(value,firstname,lastname){
  var email=new RegExp(firstname+"\."+lastname+"[0-9]*@studyUniv\.it"/*,"g"*/);
  //ex: console.log(firstname);=> /laura.turci@studyUniv.it/
  //In Perl (and JavaScript), a regex is delimited by a pair of forward slashes (default), in the form of /regex/.
  //console.log(email);
  return email.test(value);

}

//institutional mail validator

//used for fresher==matricola, and address.houseNumber
//a string that cannot contain alphabet letters neither symbols, only numbers
//empty string, undefined, null are not accepted
exports.validateNumber=function(value){
  if(!value)
    return false;
  return /^[0-9]*$/.test(value);
}
//module.exports o exports?????<-------------------------------------------------GUARDA QUì
//name validator , a name cannot contain numbers and symbols (used to validate lastname , firstname, address.city )
//empty string, undefined, null are not accepted
module.exports.validateName=function(value){
  if (!value) //check for empty strings (""), null, undefined, false and the numbers 0 and NaN
    return false;
  return /^[a-zA-Z]*$/.test(value);
}

/*exports.validateStreet=function(value){
  return /^("via"|"viale"|"Via"|"Viale")+" "+[a-z][A-Z]$/.test(value);
}*/
//meglio fare inserire solo il nome


//telephone validator University staff, it has to be composed by firstname '.' lastname, eventually a number , '@Univ.it'

exports.validateStaffInstitutionalEmail=function(value,firstname,lastname){
var email=new RegExp(firstname+"\."+lastname+"[0-9]*@Univ\.it"/*,"g"*/);
return email.test(value);
}
/*exports.notEmptyNumber=function(value){
/*
 const EmptyValue="";
 return EmptyValue.test(value);

*//*
  if(value.value.length!=0){
    return true;
  }
  return false;
}
*/
