const url = require('../helpers/get-url');
const MongoClient = require('../helpers/mongodb');


exports.register = function (data, callback) {

  var insertData = function (db, callback) {
    const collection = db.collection('clothes');
    collection.insert(data, function (err, result) {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  };

  var selectData = function (db, callback) {
    const collection = db.collection('clothes');
    collection.find({userName: data.userName}).toArray(function (err, result) {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  };

  MongoClient.connect(url, function (err, db) {

    selectData(db, function (result) {
      if (result.length === 0) {
        insertData(db, function (result) {
          callback(result);
        });
      }
      else {
        callback('fail');
      }
    });
  });
};