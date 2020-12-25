/*server.js*/

// include all required modules
var http = require ('http');
const express = require('express');

// server details
const app = express();
const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css' , express.static(__dirname + 'public/css'))
app.use('/js' , express.static(__dirname + 'public/js'))
app.use('/assets' , express.static(__dirname + 'public/assets'))

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
app.listen(port , () => console.info(`Listening on port ${port}`))