var mongoose = require('mongoose');
Book = require("../models/booksModel.js")(mongoose);

const jwt=require('jsonwebtoken');
Reservation = require("../models/ReservationModel.js")(mongoose);
Notification = require("../models/notificationsModel.js")(mongoose)
accessTokenSecret="095034853098";


exports.show_index = function(req, res) {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.list_books = function(req, res) {
	Book.find({}, function(err, book) {
		if (err)
			res.send(err);
		res.json(book);
		console.log(book);
	});
};

exports.read_book = function(req, res) {
	/*
	TODO cast req.params.id to ObjectId
	*/
	Book.findById(req.params.id, function(err, book) {
		if (err)
			res.send(err);
		else{
			if(book==null){
				res.status(404).send({
					description: 'Book not found'
				});
			}
			else{
				res.json(book);
			}
		}
	});
};

exports.create_book = function(req, res) {
	var new_book = new Book(req.body);
	console.log("welcome creation book")
	new_book.save(function(err, book) {
		if (err){
		console.log("welcome"+err)
			res.send(err);
		}
		else{
			//book.successful=true;
			console.log("Successful creation of a new book record");
			res.json("Successful creation of a new book record");

		}

	});
};





exports.update_book = function(req, res) {
	var book_id,status
	var institutional_email=""
	var availability=false

 	//console.log(req.body.book_id)//undefined
	Book.findOneAndUpdate({_id: req.params.id}/*filter*/, req.body/*update*/, {new: true}, function(err, book) {
		console.log("req.body"+req.body)

		console.log("_id"+req.params.id)
		if (err)
			res.send(err);
		else{
			if(book==null){
				console.log("book is null")
				  res.status(404).send({
					description: 'Book not found'
				});
			}
			else{
				console.log("updated book:"+book)
				book_id=book.book_id
				status=book.status
				console.log("book_id "+book_id)
				res.json("Successful book update");
        //gestione dell'after update
				/***************************/
				Book.find({ book_id: book_id },function(err,book){
									if(err)
										console.log(err);
									else {
									    console.log("book status "+status)
											if(status=='available')
											{
												console.log("book status is available")
												availability=true
												console.log("availability "+availability)
												if(availability==true){
													//se il libro che ha subito modifiche è available verifichiamo se ci sono prenotazioni (reservation) dello stesso
															Reservation.findOne({book_id:book_id},function(err,reservation){
													                        if(err)
													                          console.log(err);
													                        else {
													                        	student_institutional_email=reservation.student_institutional_email
																										console.log("student_institutional_email"+student_institutional_email)
																										console.log("reservation"+reservation);
										 															 if(reservation)
										 															 {
										 																 //creo una notifica
										 															   let new_notification=new Notification({book_id,student_institutional_email});
										 															   new_notification.save(function(err,notification){
										 															     if(err)
										 															       console.log(err)
										 															     else {
										 															       console.log(notification);
										 															       //ho creato una notifica
										 															     }
										 															   });//save notification
										 															 }
													                        }
													                    });


												}//if availability true
											}
									}
				});





			}
		}
	});
	//chiama l'after_update?
};
/*exports.after_update=function(req,res){
//problema:non so se la mofidica fatta è relativa al field di disponibilità
//dobbiamo quindi controllare il libro
const {book_id}=req.book_id
var institutional_email="";
var availability=false;
//controlla che il libro sia available
Book.find({ book_id: book_id },function(err,book){
					if(err)
						console.log(err);
					else {
							if(book.status=='available')
								availability=true
					}
});
if(availability==true){
	//se il libro che ha subito modifiche è available verifichiamo se ci sono prenotazioni (reservation) dello stesso
			const reservations=Reservation.find({book_id:book_id}).sort({reservation_date})
	                   .exec(function(err,reservation){
	                        if(err)
	                          console.log(err);
	                        else {
	                        	institutional_email=reservations[0].institutional_email
	                        }
	                    });
			 console.log("reservations[0]"+reservation[0]);
			 if(reservations[0])
			 {
				 //creo una notifica
			   let new_notification=new Notification({book_id,institutional_email});
			   new_notification.save(function(err,notification){
			     if(err)
			       res.send(err)
			     else {
			       console.log(notification);
			       //ho creato una notifica
			     }
			   });//save notification
			 }

}




}; */ //after_update

exports.delete_book = function(req, res) {
	Book.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.status(404).send({
					description: 'Book not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
  });
};


exports.search_book=function(req,res){
	console.log("hei");
	console.log(req.body.title);
	Book.find({$or: [ { title: req.body.title },
									  { book_id: req.body.book_id },
									  /*{ publication_date: req.body.publication_date },
									  { edition: req.body.edition },
									  { authors: req.body.authors } */
									 ]}, function(err,book)
								 			{
												console.log(book);
									 				if(err)
									 				{
										 				res.send(err);
									 				}
									 			else{
													if(!book.length)
													{
													  res.json("Libro non trovato nell'archivio")
													}
										 			else
														res.json(book);

									 			}
								 });

};

exports.textual_search=function(req,res){
	userText=req.body.content;


	Book.find({ $text: { $search: userText }} , function(err,book){

		if(err)
		res.send(err);
		else {
			console.log(book);
			res.json(book);
		}
	});
};







exports.insert=function(req,res){
  //riceve AccessToken e book_id
  const {AccessToken,book_id}=req.body;
  console.log("AccessToken: "+AccessToken);
  console.log("book_id: "+book_id);

  var decoded = jwt.verify(AccessToken, accessTokenSecret);
  console.log("decoded jwt: "+decoded)

  if(decoded==undefined){
    //token non verificato
    res.send("Prenotazione negata, autenticarsi");
  }else {
    var student_institutional_email=decoded.institutional_email;
    console.log("student institutional email: "+student_institutional_email)

		Reservation.findOne(  { book_id: book_id },
										  /*{ publication_date: req.body.publication_date },
										  { edition: req.body.edition },
										  { authors: req.body.authors } */
										  function(err,reservation)
									 			{
													console.log("reservation "+reservation);
										 				if(err)
										 				{
											 				res.send(err);
										 				}
										 			else{
														if(reservation==undefined || reservation==null || reservation==[])
														{
															var todaydateinmilliseconds=Date.now();
													    let dateOb=new Date(todaydateinmilliseconds);
													    let date=dateOb.getDate();
													    let month=dateOb.getMonth()+1;
													    let year=dateOb.getFullYear();
													    var reservation_date=year+"-"+month+"-"+date;
													    console.log("reservation_date: "+reservation_date)
													    let new_reservation=new Reservation({book_id,student_institutional_email,reservation_date});

													    new_reservation.save(function(err,reservation){
													      if(err)
													      res.send(err)
													      else {
													        reservation.successful=true;
													        res.status(201).json(reservation);
													      }
													    });
														}else {
															reservation.successful=false
															res.status(403).json(reservation)
															//403 Forbidden, libro già prenotato
														}
										 			}
									 });


  }
  //aggiunge al db un nuovo documento con data di prenotazione pari a quella odierna
  //moficica il documento del libro prenotato nella voce last_active_borrow

};
