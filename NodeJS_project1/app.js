
//importing required reference to https API
const https = require('https');

//Functions Declarations
function printMessage(user, badgeCount, totalPoints) {
    const message = `${user} has ${badgeCount} badge(s) and ${totalPoints} points in Javascript`;
    console.log(message);
}

function getProfile(username){
    const httpRequest = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        // READ the data
        let body = " ";
        let profile = "";
        response.on('data', data =>{
            body += data.toString();
        });

        //PARSE the data
        response.on('end', () =>{
            profile = JSON.parse(body);
           // console.dir(profile);

           //PRINT the data
           printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
        })

        

    })
}

//Calling functions
const username = process.argv.slice(2);
username.forEach(getProfile);
