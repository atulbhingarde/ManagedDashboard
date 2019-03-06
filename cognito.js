const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

AWS.config.region = 'us-east-1'
const poolData = {    
    UserPoolId : "XXXXXXX", // Your user pool id here    
    ClientId : "XXXXXXX" // Your client id here
    }; 

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:b6b629-er73-9969-91eb-0dfffff445d'
// });
var idToken = "";
exports.login = function Login() {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : 'XXXXXXXXX',
        Password : 'XXXXXXXXX',
    });

    var userData = {
        Username : 'XXXXXXXXX',
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
            idToken = result.getIdToken().getJwtToken();
        },
        onFailure: function(err) {
            console.log(err);
        },

    });
}


exports.accessAPI = function accessAPI() {
    var URL = "https://p489ufw7ta.execute-api.us-east-1.amazonaws.com/dev/mc-infra-request/05da0fe0-a23a-11e8-bdef-bbb320136187/status";

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ idToken
    }
    var options = {
        url: URL,
        method: "GET",
        headers: headers
    }

    request.get(URL,options, function(error, data){
        console.log("data   "+ JSON.stringify(data));
        console.log("error   "+ JSON.stringify(error))

    })

}