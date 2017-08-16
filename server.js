
require(' @std/esm');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3001;
const friends = require('./sandbox/friends');


//use body parser in our app

app.use(bodyParser.urlencoded({extended: false}));

//use cookie parser for reading and writting cookies 

app.use(cookieParser());


//define static assets
app.use('/static', express.static('public'));


//define template engine

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
//define routes
var porto = 500
//using midleware
const isAdmin = (req, res, next) => {
    console.log(`This ${porto} is admin` );
    next();
}
app.use( isAdmin);


app.use( (req, res, next) => {
   console.log(`Peter`); 
//    var err = new Error(`error occured`);
//     err.status = 500;
   next();
});

//import routes

const mainRoutes = require('./routes/index');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);

//partion routes

app.use(mainRoutes);
app.use('/cards', cardRoutes);




app.use((req, res, next) => {
    const err = new Error(`Page Not Found on Peters Server`);
    err.status = 404;
    next(err);
});

//handling errros last in stack

app.use((err, req, res, next) => {
    res.locals.error = err;
    // res.status(500); //error code on server
    // res.render('error', err); 
    res.status(err.status)
    res.render('error');   
})

app.listen(port, () => {
    console.log(`app is up and runnig on port ${port}`)
});


