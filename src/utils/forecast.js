const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=52b77d19769e41fcb05200802211112&q=${latitude},${longitude}`;
    request({
        url, 
        json: true
    }, (error, { body }) => {
        if(error){
            callback('Unable to connect the server.', undefined);
        }else if(body.error){
            callback('Unable to find location. Try again.', undefined);
        }else{
            callback(undefined, body.current);
        }
    });
}

module.exports = forecast;