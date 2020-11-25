var User = require('./users.model');
var CryptoJS = require("crypto-js");


exports.listOfUsers = function (req, res) {
  try {
    console.log(req.params);

    User.find({}).skip(Number(req.query.skip)).limit(Number(req.query.limit)).exec((err, result) => {
      if (err) {
        return handleError(err);
      } else {
        res.status(201).json(result)
      }
    })
  } catch {
    res.status(400).send({
      "error": "Something went wrong"
    })
  }
}


exports.createUsers = function (req, res) {
  req.body.password = encrypt(req.body.password);
  User.create(req.body, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(user);
  });
};


function encrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secretkey').toString();
  return ciphertext;
}


function handleError(res, err) {
  return res.status(500).send(err);
}
