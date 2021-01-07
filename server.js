/*server.js*/

// include all required modules
var http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
// var mongodb = require('mongodb');
// var router = express.Router();
// const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;

// const dbConnectionUrl = "mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/<dbname>?retryWrites=true&w=majority/clicks";

// MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
//     if (err) {
//         console.log(`[MongoDB connection] ERROR: ${err}`);
//         failureCallback(err); // this should be "caught" by the calling function
//     } else {
//         const dbObject = dbInstance.db("mydb");
//         const dbCollection = dbObject.collection("customers");
//         console.log("[MongoDB connection] SUCCESS");

//         // successCallback(dbCollection);
//     }
// });

// server details
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/assets', express.static(__dirname + 'public/assets'))

// let db;
// MongoClient.connect(url, (err, database) => {
//     if (err) {
//         return console.log(err);
//     }
//     db = database;
//     // start the express web server listening on 5000
//     app.listen(port, () => console.info(`Listening on port ${port}`))
// });

app.get('', (req, res) => {
    res.sendFile(__dirname + '/route/index.html')
})

app.get('/charts.html', (req, res) => {
    res.sendFile(__dirname + '/route/charts.html')
})

app.get('/customer.html', (req, res) => {
    res.sendFile(__dirname + '/route/customer.html')
})

app.get('/admin.html', (req, res) => {
    res.sendFile(__dirname + '/route/admin.html')
})

app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/route/auth/login.html')
})

app.get('/password.html', (req, res) => {
    res.sendFile(__dirname + '/route/auth/password.html')
})

app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/route/auth/register.html')
})

app.get('/buffetMeat.html', (req, res) => {
    res.sendFile(__dirname + '/route/buffets/buffetMeat.html')
})

app.get('/buffetMenu.html', (req, res) => {
    res.sendFile(__dirname + '/route/buffets/buffetMenu.html')
})

app.get('/buffets.html', (req, res) => {
    res.sendFile(__dirname + '/route/buffets/buffets.html')
})

app.get('/dessertMenu.html', (req, res) => {
    res.sendFile(__dirname + '/route/desserts/dessertMenu.html')
})

app.get('/desserts.html', (req, res) => {
    res.sendFile(__dirname + '/route/desserts/desserts.html')
})

app.get('/dishes.html', (req, res) => {
    res.sendFile(__dirname + '/route/dishes/dishes.html')
})

app.get('/dishMeat.html', (req, res) => {
    res.sendFile(__dirname + '/route/dishes/dishMeat.html')
})

app.get('/dishMenu.html', (req, res) => {
    res.sendFile(__dirname + '/route/dishes/dishMenu.html')
})

app.get('/drinkMenu.html', (req, res) => {
    res.sendFile(__dirname + '/route/drinks/drinkMenu.html')
})

app.get('/drinks.html', (req, res) => {
    res.sendFile(__dirname + '/route/drinks/drinks.html')
})

app.get('/401.html', (req, res) => {
    res.sendFile(__dirname + '/route/error/401.html')
})

app.get('/404.html', (req, res) => {
    res.sendFile(__dirname + '/route/error/404.html')
})

app.get('/500.html', (req, res) => {
    res.sendFile(__dirname + '/route/error/500.html')
})

app.get('/snackMenu.html', (req, res) => {
    res.sendFile(__dirname + '/route/snacks/snackMenu.html')
})

app.get('/snacks.html', (req, res) => {
    res.sendFile(__dirname + '/route/snacks/snacks.html')
})

// << db setup >>
// const db = require("./db");
// app.use('/db', db);
// const dbName = "mydb";
// const collectionName = "customers";

// db.initialize("mydb", "customers", function(dbCollection) { // successCallback
//     // get all items
//     dbCollection.find().toArray(function(err, result) {
//         if (err) throw err;
//           console.log(result);
//     });

//     // << db CRUD routes >>

//   }, function(err) { // failureCallback
//     throw (err);
// });

// Listen on port
app.listen(port , () => console.info(`Listening on port ${port}`))

// Connect with Mongo DB
// const uri = "mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/<dbname>?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('MongoDB Connected…')
// })
// .catch(err => console.log(err))

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
    // const click = { clickTime: new Date() };
    // console.log(click);
    // console.log(db);

    // db.collection('clicks').save(click, (err, result) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log('click added to db');
    //     res.sendStatus(201);
    // });
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "testinggg"

    async function run() {
        try {
             await client.connect();
             console.log("Connected correctly to server");
             const db = client.db(dbName);
             // Use the collection "people"
             const col = db.collection("people");
             // Construct a document
             let personDocument = {
                 "docid": "_id",
                 "name": { "first": "KaungSett", "last": "Paing" },
                 "birth": new Date(1912, 5, 23), // June 23, 191
                 "work": [ "IT", "translate", "Engineer" ],
                 "views": 1250000
             }
             // Insert a single document, wait for promise so we can read it back
             const p = await col.insertOne(personDocument);
             // Find one document
             const myDoc = await col.findOne();
             // Print to the console
             console.log(myDoc);
            } catch (err) {
             console.log(err.stack);
         }

         finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});