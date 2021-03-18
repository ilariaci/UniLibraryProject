var mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
Staff = require("../models/LibraryStaffModel.js")(mongoose);

accessTokenSecret="095034853098";

exports.validate = function(req, res) {
  const {email,password}=req.body;
  console.log(email);

	Staff.findOne({institutional_email:email},function(err,member){
  console.log("Membro:"+member);

  if(member){
    if(err)
      res.send(err);
    else{
          if(member.password==password){
              const accessToken=jwt.sign({institutional_email:member.institutional_email,role:"staff"},accessTokenSecret);
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
exports.authenticateStaffToken=function(req,res,next){

  const token=req.body.AccessToken;
  console.log(req.body);


  };

 
