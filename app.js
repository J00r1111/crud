var express = require('express');
var app = express();
app.set('view engine', 'hbs');
app.use(express.urlencoded());
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://marcin:marcin@cluster0.rotxh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

client.connect(err => {
    db = client.db("test").collection("studenci");
    
    app.get('/', async function (req, res) {
        const dbRes = await db.find({}, {});
        res.render('formularz', { uzytkownicy: await dbRes.toArray() });
    })
});
app.post('/', function (req, res) {
    db.insertOne({ imie: req.body.imie, nazwisko: req.body.nazwisko }, function (err, res) {
        if (err) throw err;
        
    });
    res.render('udalosie');
   
})


app.listen(5000, () =>{
    console.log("Uruchomiono aplikacje na porcie 5000");
    console.log("By Marcin");
    
});
client.close();