// LOAD dependencies
var AWS = require('aws-sdk');
var myarr = ['self'];
exports.myarr = myarr;


console.log("ha ha "+myarr);
var credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
AWS.config.credentials = credentials ;
// console.log("this is credentials 1 " + AWS.config.credentials);
AWS.config.credentials.accessKeyId = process.env.myid ;
AWS.config.credentials.secretAccessKey = process.env.key ;

// console.log("This is id" + AWS.config.credentials.secretAccessKey );
// console.log("here port1 is " + process.env.PORT1);
// AWS Config details 
AWS.config.apiVersions = {
    ec2: '2016-11-15',
    dynamodb: '2012-08-10'
};

AWS.config.update({
    region: 'us-east-1'
});
var params = {
    DryRun: false,
    // Owners: ['amazon','self','aws-marketplace','microsoft'],
    // Owners: ['amazon','self'],

    // Owners: ['self'],
    Owners: myarr 

};

var ec2 = new AWS.EC2() ;
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

var dbparams = {
    TableName: 'AMI-Build-Table',
    Key: { 'Build': '1' }
};

var scanparams = {
    TableName: 'AMI-Build-Table',
    Select: 'COUNT'
};

var dparams = {
    ExpressionAttributeValues: {
        ':a': "Arch",
        ':k': "3"
    },
    KeyConditionExpression: 'BaseOs = :a and Build = :k',
    Key: { build: '3' },
    TableName: 'AMI-Build-Table'
};

// Routing
module.exports = function (app) {

    // API GET Requests - outputs json
    app.get("/api/list", function (req, res) {
        ec2.describeImages(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                res.send(data);           // successful response
                // console.log("here I am ",data);
                console.log(data.Images[1].Tags[0]);
                // alert(data);
                
            }
        });
    });

    app.get("/api/find", function (req, res) {
        docClient.get(dparams, function (err, data) {
            if (err) {
                res.status("Error").send(err);
            } else {
                res.send(data.Item);
            }
        });
    });

    app.get("/api/count", function (req, res) {
        docClient.scan(scanparams, function (err, data) {
            if (err) {
                res.status("Error").send(err);
            } else {
                console.log(data);
                res.send(data);
            }
        });
    });
};

