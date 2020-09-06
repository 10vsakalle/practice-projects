//API requirements

const https = require('https');
//let nodeGeocoder = require('node-geocoder');

//Variable declaration
let place = process.argv[2];
//let latitude;
//let longitude;
const key = "2b9c9ec152d3753d475ae2c1efcba592"
 
/*//Extrating given place's latitude and longitute
let options = {
  provider: 'openstreetmap'
};
 
let geoCoder = nodeGeocoder(options);

geoCoder.geocode(place)
  .then((res)=> {
   // console.log(res);
    latitude = res[0].latitude;
    longitude = res[0].longitude;
   // console.log(`${latitude}, ${longitude}`);

  })
  .catch((err)=> {
    console.log(err);
  });

  console.log(latitude, longitude);
// creating https request to fetch weather forecast for given place*/
//console.log(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}`);

const httpsREquest = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}&units=metric`, response => {
       //console.log(response);
       let body = " ";
       let weather ="";

        response.on('data', data => {
            
           body += data.toString();
           // console.log(data);
       })

        response.on('end', () => {
            weather = JSON.parse(body);
           // console.log(weather);
            console.log(`${place}'s Weather : ${weather.main.temp}°C (feels like ${weather.main.feels_like}°C), ${weather.weather[0].main} `);
        })

})