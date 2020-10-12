const request = require('request')
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmF2ZWVuazIxIiwiYSI6ImNrZXpuOGM4azA2ODEyeXFhN2xzYjBlaDAifQ.UvpBYfTz5YvC7_5LJjenqg'
    request({ url, json: true }, (error, { body }) =>{
            if(error){
                    callback('Unable to coonect!', undefined)
            }else if(body.features.length === 0){
                callback('Unable to find location!', undefined)
            }
            else{
                callback(undefined ,{
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
    })
}




module.exports = geocode