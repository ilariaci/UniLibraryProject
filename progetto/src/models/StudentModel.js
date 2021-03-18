
var validator=require('../customValidator/customValidators');//problema con questa riga , non riesce a trovare il modulo
module.exports = function(mongoose) {
    var Schema = mongoose.Schema;


    var StudentSchema = new Schema({
      firstname: String, // String is shorthand for {type: String}
      lastname: String,
      password:String,
      institutional_email:String

    });
    return mongoose.model('student', StudentSchema, 'Student');
};
/*    var StudentSchema = new Schema({
        firstname:{type:String,minlength:2,maxlength:50,required:[true,' firstname is required '],validate:{validator:validator.validateName }, message:"invalid firstname"},
        lastname:{type:String,minlength:2,maxlength:50,required:[true,'lastname is required'],validate:{validator:validator.validateName},message:"invalid lastname"},
        password:{type: String,minlength:8,maxlength:30,required: true},
        notinstitutional_email:{type: String,required: true,validate:{validator:validator.validateEmail},message:"invalid e-mail"},
        institutional_email:{
            type: String,
            required:true,
            unique:true,
            validate:{validator:validator.validateStudentInstitutionalEmail,message:"invalid institutional e-mail"}
            //validate:/this.firstname\.this.lastname[0-9]*@studyUniv.it/
        }

    });
    return mongoose.model('student', StudentSchema, 'Student');
    //Student, l'ultimo parametro, deve essere di fatto il nome della collezione sul db (mongodb)
};*/



/*const bcrypt=require('bcrypt');
var validator=require('../src/customValidators/customValidators');

module.exports=function(mongoose){
  var Schema=mongoose.Schema;

const StudentSchema=new Schema({
  firstname:{type:String},
  lastname:{type:String},
  address:{city:String}
});
}
/*
  const StudentSchema=new Schema({
  firstname:{type:String,minlength:2,maxlength:50,required:[true,' firstname is required '],validate:{validator.validateName, message:"invalid firstname"}},
  //a value satisfies the required validator if val != null (that is, if the value is not null nor undefined)
  //But a value could be the empty string
  //in the custom validators empty string is not accepted
  lastname:{type:String,minlength:2,maxlength:50,required:[true,'lastname is required']},
  gender:{type : String,enum:['male','female']},
  date_of_birth:{type:Date,required:[true,'date of birth is required']},
  fresher:{type:String,required:true,unique:true,validate:{validator:function(v){return /^[0-9]*$/.test(v);}message:props=>'${props.value} is not a valid fresher '}}, //matricola
  address:{
    city:String,
    street:String,
    houseNumber:String
  },
  telephone:{type:String,required:true},
  institutional_email:{
      type: String,
      required:true,
      unique:true,
      //validate:/this.firstname\.this.lastname[0-9]*@studyUniv.it/
  },
  password:{type: String,minlength:8,maxlength:30,required: true},
  notinstitutional_email:{type: String,required: true}
});


}



/*module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var StudentSchema = new Schema({
        firstname:  String, // String is shorthand for {type: String}
        lastname: String,
        password:String,
        institutional_email:String
    });
    return mongoose.model('student', StudentSchema, 'Student');
};*/
