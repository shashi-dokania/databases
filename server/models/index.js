var mysql = require('../db');
var Promise = require('bluebird');
Promise.promisifyAll(module.exports);

module.exports = {

  messages: {

    get: function (req, res) {
      mysql.db.query('select * from messages;')
        .then(function(data) {
          res.json(data);
        })
    }, 

    post: function (json) {
      var self = this;

      this.insertRoom(json.roomname);
      this.insertUser(json.username);

      this.getRoomId(json.roomname)
        .then(function(data) {
          json.roomId = data;
        })

      this.getUserId(json.username)
        .then(function(data) {
          json.userId = data;
        })
        .then(function() {
          self.insertMsg(json);
          console.log(json);
        })
    },

    getRoomId: function(roomName) {
      return mysql.db.query('SELECT `id` FROM `rooms` WHERE `name`="' + roomName + '";')
        .then(function (rows) {
          if (rows.length !== 0) {
            return rows[0].id;
          }
        })
        .catch(function (err) {
          console.log('error in room id get')
        })
    },

    getUserId: function(userName) {
      return mysql.db.query('SELECT `id` FROM `users` WHERE `name`="' + userName + '";')
        .then(function (rows) {
          if (rows.length !== 0) {
            return rows[0].id;
          }
        })
        .catch(function (err) {
          console.log('error in user id get')
        })
    },

    insertRoom: function(roomName) {
      mysql.db.query('insert into rooms set ?', {name: roomName})
        .catch(function(err) {
          console.log('error in room insert');
        })
    },


    insertUser: function(userName) {
      mysql.db.query('insert into users set ?', {name: userName})
        .catch(function(err) {
          console.log('error in user insert');
        })
    },

    insertMsg: function(json) {
      var tmp = {
        text: json.message,
        roomId: json.roomId,
        userId: json.userId
      };

      mysql.db.query('insert into messages set ?', tmp)
        .then(function(data) {
          console.log(data);
        })
        .catch(function(err) {
          console.log('error in message insert');
        })
    }
  },

  users: {
    get: function () {
      return mysql.db.query('select * from users;')
        .then(function (rows) {
          return rows;
        })
        .catch(function(err) {
          console.log('error in users get');
        })
    },
    post: function (json) {
      var tmp = {
        name: json.username
      };
      return mysql.db.query('insert into users set ?', tmp)
        .catch(function(err) {
          console.log('error in user post');
        })
    }
  }
};

