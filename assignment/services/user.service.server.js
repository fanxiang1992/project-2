
module.exports = function (app, model) {

        app.get('/api/user', findUser);
        app.get('/api/user/:uid', findUserbyId);
        app.post('/api/user',createUser);
        app.put('/api/user/:uid',updateUser);
        app.delete('/api/user/:uid',deleteUser);

        function getAllUser(req, res) {
          model.userModel.getAllUser().then(
            function (users) {
              if(users) {
                res.json(users);
              } else {
                res.send('0');
              }
            },
            function(error){
              res.sendStatus(400).send(error);
            })
        }


        function deleteUser(req, res) {
          var uid = req.params.uid;
          model.userModel.removeUser(uid).then(
            function (status) {
              res.send(200);
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }

        function updateUser(req, res) {
          var user = req.body;
          var uid = req.params.uid;
          model.userModel.updateUser(uid, user).then(
            function (status) {
              res.send(200);
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }

        function createUser(req, res) {
          var user = req.body;
          model.userModel.createUser(user).then(
            function (newUser) {
              res.send(newUser);
            },
            function (error) {
              res.sendStatus(400).sned(error);
            }
            );
        }


        function findUser(req, res) {
          var params = req.params;
          var query = req.query;
          if (query.password && query.username) {
            findUserByCredentials(req, res);
          }
          else if (query.username) {
            findUserByUsername(req, res);
          } else { // This might create some unknow issue or bug later 
            getAllUser(req, res);
          }
        }

        function findUserByUsername(req, res) {
          var username = req.query.username;
          model.userModel.findUserByUsername(username).then(
            function (user) {
              if(user) {
                res.send(user);
              }
              else {
                res.send('0');
              }
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }



        function findUserByCredentials(req, res) {
          var username = req.query.username;
          var password = req.query.password;
          model.userModel.findUserByCredentials(username, password).then(
            function(user){
              if(user){
                res.json(user);
              } else {
                res.send('0');
              }
            },
            function(error){
              res.sendStatus(400).send(error);
            }
            );
        }

        function findUserbyId(req, res) {
          var userId = req.params.uid;
          model.userModel.findUserById(userId).then(
            function (user) {
              if(user) {
                res.send(user);
              }
              else {
                res.send('0');
              }
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }

}