var mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
Student=require("../models/StudentModel.js")(mongoose);

accessTokenSecret="095034853098";

exports.validate = function(req, res) {
  const {email,password}=req.body;
  console.log(email);

Student.findOne({institutional_email:email},function(err,member){
console.log("Membro:"+member);

if(member){
  if(err)
    res.send(err);
  else{
        if(member.password==password){
            const accessToken=jwt.sign({institutional_email:member.institutional_email,role:"student"},accessTokenSecret);
            res.json({accessToken});
        }else{
          res.send('Password Incorrect');
        }

    }
}else{
  res.send("Utente non trovato");
}

});



};




















exports.authenticateStudentToken=function(req,res,next){

 const token=req.body.AccessToken;
 console.log(req.body);

   /*if(token){
       decoded=jwt.verify(token,accessTokenSecret,(err,decoded)=>{
       if(err){return res.sendStatus(403);}

       if(decoded.role==="staff"){
         console.log("is authenticated staff");
       //isAuthenticated==true
         if(decoded.book_id)
         {
           Books
         }
         next();
       }

     });
   }else
   {
     res.sendStatus(401);//non c'è header di autenticazione
   }*/
 };

//provare accesso alla pagina crud prima e dopo essersi loggati
