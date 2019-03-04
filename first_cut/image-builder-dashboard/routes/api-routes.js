var AWS = require('aws-sdk');
var path = require('path');

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
  Owners: ['self']
}

var ec2 = new AWS.EC2();
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports = function (app) {
/*   app.get('/viewlist', function (req, res) {
    ec2.describeImages(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        res.render("listtable", data);           // successful response
      }
    });
  }); */

  app.get("/list", function (req, res) {
    ec2.describeImages(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data);
        res.send(data);           // successful response
      }
    });
  });

  app.get("/find", function (req, res) {
    var dbparams = {
      TableName: 'AMI-Build-Table',
      Key: { 'Build': '1' }
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

    docClient.get(dparams, function (err, data) {
      if (err) {
        res.send("Error", err);
      } else {
        res.send(data.Item);
      }
    });
  });
};
