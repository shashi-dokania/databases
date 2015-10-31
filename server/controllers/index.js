var models = require('../models');
var db = require('../db/index').dbConnection;

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res);
    },
    post: function (req, res) {
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body);
      res.send('Success');
    }
  }
};

