var express = require('express');
var app = require('express')();
//to use socket.io
var http=require('http').createServer(app);
var io=require('socket.io')(http);

//
const { v4: uuidv4 } = require('uuid');
var _ = require("underscore");

var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var cors = require('cors')
var path = require('path');

//path.resolve() method is used to resolve a sequence of path-segments to an absolute path
//funziona processando la sequenza di percorsi da destra a sinistra
//aggiungendo all'inizio ognuno di questi percorsi fino ad arrivare al percorso assoluto creato
global.appRoot = path.resolve(__dirname);
//this line is used to resolve the project path and put it into global which is the global object
//everything attached to it will be seen in the whole application
//__dirname: __dirname tells you the absolute path of the directory containing the currently executing file

var PORT = 3000;
//for socket.io/Chat

var admins_hashmap = {};
var users_hashmap = {};

mongoose.connect('mongodb://localhost/test', { useNewUrlParser:true, useFindAndModify: false,useUnifiedTopology: true,useCreateIndex: true });

app.use(cors())


//Per gestire i parametri passati nel corpo della richiesta http.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));


var routes = require('./src/routes/booksRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
//socket.io

io.on('connection',(socket)=>{

  console.log('a user connected'+", the user socket.id is: "+socket.id);





  //user disconnected
  socket.on('disconnect',()=>{
    console.log('a user disconnected'+", the user socket.id is: "+socket.id);
  });

  socket.on('student notifications', function(){
    //cercare nel database le notifiche relative allo studente
  });



  //ADD STAFF MEMBER

  socket.on('add staff member',function( ){
    console.log('adding staff member lato server');
  //  this.isAdmin = data.isAdmin;
  //non si tratta di un utente "qualunque" , va eliminato dall'hasmap degli utenti
    delete users_hashmap[socket.id];
    socket.isAdmin=true;
    console.log("///add staff member///:cancellato il nuovo admin"+socket.id+" da users_hasmap.");
    console.log("///add staff member/// users_hashmap:");
    _.each(users_hashmap,function(userSocket){ //il nuovo admin/staffMember viene aggiunto a tutte le room di tutti gli utenti collegati
      console.log("user: "+userSocket.id );
    });
    //console.log(users_hashmap);

    admins_hashmap[socket.id]=socket;
    console.log("Add staff member// la lista degli utenti contiene "+Object.keys(users_hashmap).length);
    console.log("//////Add staff member/////// numero di utenti in users_hashmap:"+Object.keys(users_hashmap).length);
    if(!(Object.keys(users_hashmap).length === 0)){ //se la "lista" (hashmap) di utenti  non è vuota
      _.each(users_hashmap,function(userSocket){ //il nuovo admin/staffMember viene aggiunto a tutte le room di tutti gli utenti collegati
        console.log("Add staff member// l'admin "+socket.id+" si unisce alla stanza di "+userSocket.id );
        let room="room-"+userSocket.roomID;
        socket.join(room, function(){console.log("socket.join effettuato");});


      });

    }
    _.each(admins_hashmap,function(adminSocket){
      console.log("Add staff member// adminSocket.id : "+adminSocket.id);
    });
    _.each(users_hashmap,function(userSocket){
      console.log("Add staff member// userSocket.id : "+userSocket.id);
    })

  });
  //add user
  socket.on('add user',function(){
    //data=uuid.v4();
    //socket.roomID=data;
    socket.isAdmin=false;
    socket.roomID=socket.id;
    let room;
    room="room-"+socket.id;
    console.log("socket roomID "+socket.roomID+"socket.id "+socket.id);
    socket.join(room);
    _.each(admins_hashmap,function(adminSocket){
      adminSocket.join(room); //iscriviamo gli admin alla stanza del nuovo utente
    })
    msg="benvenuta";
    if(Object.keys(admins_hashmap).length === 0) //means if (admins is empty)
    {
    //  _.each(admins_hashmap,function(adminSocket){
    //    console.log("adminSocket.id"+adminSocket.id);
    //  });
    //  _.each(users_hashmap,function(userSocket){
    //    console.log("userSocket.id"+userSocket.id);
    //  })
    //  console.log(Object.keys(admins_hashmap).length === 0);
      msg=msg+", purtroppo al momento non ci sono bibliotecari online. Orari: lun: 8-12, mar:15-16. E-mail:administration@Unilibrary.it";
    }
    io.sockets.in(room).emit('welcome msg',msg);


    users_hashmap[socket.roomID]=socket;

    for(const user in users_hashmap){
      console.log("user:"+user);
    }
      console.log("users_hashmap"+users_hashmap);
      console.log("socket"+socket);
      console.log("socket.roomID"+socket.roomID);
      console.log("socket.id"+socket.id);
      console.log("users_hashmap length"+Object.keys(users_hashmap).length);
      console.log("users_hashmap[socket.id].id"+users_hashmap[socket.roomID].id);
      _.each(users_hashmap,function(user){
        console.log(user.id);
      })
  });


  //chat message
  socket.on('chat message',function(message){
    console.log("///////chat message lato server////////");
    //un admin avrà specificato il destinatario
    completeMessage={};
    definitiveMessage={};
    if(message.roomID!=null)
    {

      completeMessage.content=message.content;
      completeMessage.roomID=message.roomID;
      definitiveMessage=completeMessage;
      //definitiveMessage=JSON.stringify(completeMessage);
      room="room-"+message.roomID;
      //inviamo il messaggio all'utente specificato
      console.log("mess inviato dall'admin, definitive message:"+definitiveMessage);
      io.sockets.in(room).emit('prova prova');
      socket.to(room).emit('chat message', definitiveMessage);
      console.log("chat message: l'ha inviato un admin, è stato condiviso nella room: "+room+" il messaggio è : "+message.content);


    }else{
      //inviamo il messaggio nella socket dell'utente
        completeMessage.content=message.content;
        completeMessage.roomID=socket.id;
        definitiveMessage=completeMessage;
        //definitiveMessage=JSON.stringify(completeMessage);

        console.log("mess inviato da uno user, definitiveMessage : "+definitiveMessage);
        console.log("message intero:"+message);
        var room="room-"+socket.id;
          io.sockets.in(room).emit('prova prova');
          //socket.to(room).emit('chat message');
        socket.to(room).emit('chat message',definitiveMessage);
        console.log("chat message: l'ha inviato un utente, è stato condiviso nella room: "+room);
      /*  var roster = io.sockets.clients(room);

        roster.forEach(function(client) {
        console.log('Id: ' + client.id);
});*/
io.of('/').in(room).clients(function(error,clients){
       var numClients=clients.length;
       console.log("numero client in room "+room+":"+numClients);
       clients.forEach(function(client)  {console.log(client);

       });

   });
    }/*
    if(socket.roomID=="null"){//si tratta di un membro dello staff
      //la room.ID sarà passata con i dati, ciò significa che quando
      //un membro dello staff riceve un messaggio, riceve anche la rispettiva roomID
      //sintesi, data.roomID contiene il nome della room dell'utente
      //console.log("chat message // socket.roomID di chi ha inviato il messaggio :"+socket.roomID);
      //console.log("chat message // "+data.roomID);

}
else{
  //si tratta di un messaggio da un utente
  data.roomID=socket.id;//inseriamo il messaggio nel destinatario
}
let room;
room="room-"+data.roomID;
  //emit('chat message',data);
  console.log("Invio del messaggio sulla room"+data.roomID);
  io.sockets.in(room).emit(data);
*/
});

socket.on('disconnect',function(){
  if(socket.isAdmin)//è uno staffMember
  {
    console.log("Disconnect event server side (si tratta di un admin): viene cancellato l'admin "+socket.id);
    delete admins_hashmap[socket.id];
    console.log("Disconnect event server side, dopo la cancellazione dell'admin "+socket.id+"admins_hasmap contiene i seguenti elementi:");
    _.each(admins_hashmap,function(admin){console.log(admin.id+"\n")});
  }else{
    //is a user
    console.log("Disconnect event server side (si tratta di uno user): viene cancellato l'utente "+socket.id);
    delete users_hashmap[socket.roomID];
    console.log("Disconnect event server side: dopo la cancellazione dell'utente "+socket.id+"users_hasmap contiene i seguenti elementi:");
    _.each(users_hashmap,function(user){console.log(user.id+"\n")});
  //  socket.broadcast.to(socket.roomID).emit("User disconnected",socket.roomID);
    _.each(admins_hashmap,function(adminSocket){ adminSocket.leave(socket.roomID)});
  }
});



});







//end socket.io part
http.listen(PORT, function () {
  console.log('Node API server started on port '+PORT);
});
