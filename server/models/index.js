var db = require('../db').dbConnection;

module.exports = {

  messages: {

    get: function () {
      db.query('SELECT * FROM `messages`;', function (err, rows, fields) {
        if (err) {
          console.log('error');
        } else {
          console.log(rows);
        }
      });
    }, 


    // var json = {
    //   username: "Valjean",
    //   message: "In mercy's name, three days is all I need.",
    //   roomname: "Hello"
    // }

// db.query('SELECT `id` FROM `rooms` WHERE `name`="' + json.roomname + '";', function (err, rows, fields) {
//   if (err) {
//     console.log('error from room search in messages post');
//   }

//   if (rows.length > 0) {
//     roomId = rows[0]['id'];
//   } else {
//     db.query('INSERT INTO `rooms` (name) VALUES ("' + roomname + '");', function (err, rows, fields) {
//       if (err) {
//         console.log('error from room insert in messages post')
//       }
//       roomId = rows[0]['id'];
//     });
//   }
// });




    getRoomId: function(roomName) {
      return db.query('SELECT `id` FROM `rooms` WHERE `name`="' + roomName + '";')
        .then(function (err, rows, fields) {
          if (rows.length !== 0) {
            return rows[0]['id'];
          }
        })
        .catch(function (err) {
          console.log('error in room id get')
        })
    },

    getUserId: function(username) {
      var self = this;
      db.query('SELECT `id` FROM `users` WHERE `name`="' + username + '";', function (err, rows, fields) {
        if (err) {
          console.log('error from user search in messages post');
        }
        self.userId = rows[0]['id'];
      });
      this.userId = self.userId;
    },

    post: function (json) {
      var roomId = this.getRoomId(json.roomname);

      console.log('before, ' + roomId);
      this.getUserId(json.username);
      console.log(this.userId);
      this.insert(json.message, this.roomId, this.userId);
    },

    insert: function(message, roomId, userId) {
      db.query('INSERT INTO `messages` (text, roomId, userId) VALUES ("' + message + '", ' + roomId + ', ' + userId + ');', function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
        console.log('Successfully inserted message');
      });
    }

  },

  users: {
    get: function () {
      db.connect();
      db.query('SELECT * FROM `users`;', function (err, rows, fields) {
        if (err) {
          console.log('error from users get');
        } else {
          console.log(rows);
        }
      });
      db.end();
    },
    post: function (json) {
      var username = json.username;
      db.query('INSERT INTO `users` (name) VALUES ("' + json.username + '");', function (err, rows, fields) {
        if (err) {
          console.log('error from users post');
        }
      });
    }
  }
};

