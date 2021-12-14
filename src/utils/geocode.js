const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2hhbGVkYXRpYTEiLCJhIjoiY2t4MHZwNjc2MHZyaTJybDQ4ZnBvNWc4YSJ9.Ie22xlOtd-eU7P0wvMYY2Q&limit=1`;
    
    request({
        url,
        json: true
    },(error, { body }) => {
        if(error || body.features.length === 0){
            callback('Unable to connect to location server', undefined);
        }else if(body.features === 0) {
            callback('Unable to find location. Try another search', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });

};

module.exports = geocode;