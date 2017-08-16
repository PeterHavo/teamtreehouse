

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3001;
const friends = require('./sandbox/friends');
const MongoClient = require('mongodb').MongoClient;


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

MongoClient.connect('mongodb://localhost:27017/movies', (err, db) => {
    console.log('connected to DB');
    app.get('/mongo', (req, res) => {
        db.collection('movies').find({}).toArray((err, docs) => {
            if(err){
                console.log(err);
            }
            res.render('mongo',{docs:docs});
        });
    });

    app.get('/mongo/:id', (req, res) => {
        var name = req.params.id;
        var getvar1 = req.query.getvar1;
        var getvar2 = req.query.getvar2;

        res.render('mongoParams', {name, getvar1, getvar2});
    });

    app.get('/mongopost', (req, res) => {
       res.render('mongoPost', {fruits:[{name:'apple'},{name:'orange'}]}) 
    });

    app.post('/postfruit', (req, res) => {
        var fruit = req.body.fruit;
        db.collection('movies').insert({fruit}, (err, doc) => {
            if (err){
                console.log(`res.status 400 ${err}`)
            }
            res.json(doc);
        })

        
    })
});


app.listen(port, () => {
    console.log(`app is up and runnig on port ${port}`)
});


