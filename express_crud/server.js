const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs')

MongoClient.connect('mongodb://admin:admin@ds125938.mlab.com:25938/webbfontaine', function(err, client) {

    if (err) return console.log(err);
    db = client.db('webbfontaine');

    // ... start the server
    app.listen(3000, function () {
        console.log('listening on port 3000...');
    });

});

app.get('/', function (req,res) {

    var cursor = db.collection('quotes').find().toArray(function (err, result) {
        if (err) return console.log(err);
    });
    res.render('index.ejs', {quotes: result});
});

app.post('/quotes', function(req, res) {
    db.collection('quotes').save(req.body, function(err, result){
        if (err) return console.log(err);

        console.log('saved to database');
    res.redirect('/')
    });

    app.use(bodyParser.urlencoded({extended: true}));
});



