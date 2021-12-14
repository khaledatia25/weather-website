const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templetes/views');
const partialPath = path.join(__dirname, '../templetes/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serv
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Khaled Waleed'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:'Khaled Waleed'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Khaled Waleed',
        msg: 'Example message for help page.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });   
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, weathr) => {
            if(error){
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: `It is ${weathr.temp_c} degree.It feels like ${weathr.feelslike_c}.`,
                location
            });
        });

    });
    
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
        res.send({
            products:[]
        });
    
    
});

app.get('/help/*', (req, res) => {
    res.render('not_found', {
        title: '404',
        name: 'Khaled Waleed',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('not_found', {
        title: '404',
        name: 'Khaled Waleed',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});