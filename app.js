
'use strict';
//You can use something like Firebase Cloud Messaging (FCM) to trigger a notification/event.
//If you're relying on the screen of the Android device, you can send a card that includes a URL, 
//and that URL can deep link into your application if you've configured it.

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/json'}));

// we comunicate with arduino with post requests
var request = require('request');
// require basic auth
var auth = require('basic-auth');
// configuration file
var config = require('./configurations/config');

app.post('/', function (req, res) {
  // check autentication
  var user = auth(req)
  if (user.name === config.auth.user && user.pass === config.auth.password) {
    const assistant = new Assistant({request: req, response: res});
    
    // fulfill action business logic
    function responseHandler (assistant) {
      var live = req.body.result.parameters.live-video;
      
      
      switch(live){
        case 'go live on youtube':
            URL = "youtube.com/live"
            request.post(URL);
          break;
        case 'go live on facebook':
            URL = "facebook.com/live"
            request.post(URL);
          break;
      
      }
      assistant.tell('Going live.');
    };
 
    assistant.handleRequest(responseHandler);
    
  
};

if (module === require.main) {
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
}

module.exports = app;