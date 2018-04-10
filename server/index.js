const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
	  express = require('express'),
	  MongoClient = require('mongodb').MongoClient,
      bodyParser = require('body-parser'),
      session = require('express-session'),
      mongoose = require('mongoose');

const PORT = 3000;
const app = express();
const Server = http.createServer(app);

mongoose.connect('mongodb://localhost/agenda', function(err){
	if(err){ 
		 console.log(err.name +" "+ err.message); 
	}else{
	  console.log('Conectado a MongoDB'); 
	}
});


app.use(express.static(__dirname + './../client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(session({ 
    secret: 'secret-pass', 
    cookie: { maxAge: 3600000 }, 
    resave: false,
    saveUninitialized: true,
}));

app.get('/',function(request,res){
	res.sendFile(__dirname + './../client/index.html');
})

app.use(express.static(__dirname + './../client'));
app.use('/', Routing)


Server.listen(PORT, function() {
 	console.log('Servidor esta escuchando por el puerto: ' + PORT);
})
