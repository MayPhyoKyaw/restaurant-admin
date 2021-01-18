/*server.js*/

// include all required modules
var http = require('http');
const express = require('express');
var bodyParser = require('body-parser');

// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").MongoClient;
const { MongoClient, ObjectId } = require("mongodb");
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const { data } = require('jquery');
// const { response } = require('express');

// server details
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/assets', express.static(__dirname + 'public/assets'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


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

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`))

// add a document to the DB collection recording the click event
app.post('/dishMenu.html', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "resturant"

    async function CreateRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for creating....");
            const db = client.db(dbName);
            // Use the collection "people"
            const col = db.collection("dish");
            // Construct a document
            let personDocument = {
                _id: (new ObjectId).toString(),
                dishName: req.body.dish_name,
                langName: req.body.lang_name,
                // smallDishPrice: req.body.small_dish_price,
                // largeDishPrice: req.body.large_dish_price,
                dishMenu: req.body.dish_menu,
                meat: req.body.meat,
                // size: req.body.size,
                created_at: req.body.created_at,
            };
            // Insert a single document, wait for promise so we can read it back
            const p = await col.insertOne(personDocument);
        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    }
    CreateRun().catch(console.dir);
});

// add a document to the DB collection recording the click event
app.post('/dishMenu.html/edit', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "resturant"

    async function EditRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for editting....");
            const database = client.db(dbName);
            const collection = database.collection("dish");
            console.log(req.body.edit_dish_id)
            // create a filter for a movie to update
            const filter = {
                _id: req.body.edit_dish_id,
            };
            // update a document
            const updateDoc = {
                $set: {
                    dishName: req.body.edit_dish_name,
                    langName: req.body.edit_lang_name,
                    // smallDishPrice: req.body.edit_small_dish_price,
                    // largeDishPrice: req.body.edit_large_dish_price,
                    dishMenu: req.body.edit_dish_menu,
                    meat: req.body.edit_meat,
                    // size: req.body.edit_size,
                    updated_at: req.body.updated_at,
                },
            };
            // for update many
            const result = await collection.updateMany(filter, updateDoc);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
        } finally {
            await client.close();
        }
    }
    EditRun().catch(console.dir);
});

// get the click data from the database
app.get('/selectDish', async (req, res) => {
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    // const client = new MongoClient(url);
    const dbName = "resturant";
    // connect to your cluster
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const dbRes = client.db(dbName);
    console.log("Connected correctly to server for selecting....");
    dbRes.collection('dish').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

// add a document to the DB collection recording the click event
app.post('/dishMenu.html/delete', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "resturant"

    async function DeleteRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for deleting....");
            const database = client.db(dbName);
            const collection = database.collection("dish");
            console.log(req.body.delete_dish_id)
            // create a filter for a movie to update
            const filter = {
                _id: req.body.delete_dish_id,
            };
            // for update many
            const result = await collection.deleteOne(filter);
            if (result.deletedCount === 1) {
                console.dir("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        } finally {
            await client.close();
        }
    }
    DeleteRun().catch(console.dir);
});

// add a document to the DB collection recording the click event
app.post('/dishMenu.html/copy', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "resturant"

    async function CopyRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for copying....");
            const database = client.db(dbName);
            const collection = database.collection("dish");
            console.log(req.body.created_at)
            // Construct a document
            let personDocument = {
                _id: (new ObjectId).toString(),
                dishName: req.body.copy_dish_name,
                langName: req.body.copy_lang_name,
                // smallDishPrice: req.body.copy_small_dish_price,
                // largeDishPrice: req.body.copy_large_dish_price,
                dishMenu: req.body.copy_dish_menu,
                meat: req.body.copy_meat,
                // size: req.body.copy_size,
                created_at: req.body.created_at,
            };
            // Insert a single document, wait for promise so we can read it back
            const result = await collection.insertOne(personDocument);
        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    }
    CopyRun().catch(console.dir);
});

app.post('/dishMenu.html/deleteMul', (req, res) => {
    console.log(req.body)
    const url = 'mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/testinggg?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
    const client = new MongoClient(url);
    const dbName = "resturant"

    async function DeleteRun() {
        try {
            await client.connect();
            console.log("Connected correctly to server for deleting....");
            const database = client.db(dbName);
            const collection = database.collection("dish");
            console.log(req.body.delete_dish_id)
            // create a filter for a movie to update
            const filter = { _id: { $in: req.body.delete_mul_dish_id } };
            // for update many
            const result = await collection.deleteMany(filter);
            if (result.deletedCount === 1) {
                console.dir("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        } finally {
            await client.close();
        }
    }
    DeleteRun().catch(console.dir);
});