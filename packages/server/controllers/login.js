
const sqlite3 = require('sqlite3').verbose();
var jwt = require("jsonwebtoken");
const config = require("../config/config");

var db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});


function singin(req, res) {
    db.get( `SELECT * FROM users WHERE id=? and name like ? `, [req.body.id, req.body.name], (err) => {
    if(err){
        res.status(500).send({message: err.message})
    }    
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        // var token = jwt.sign({ id: user.id }, config.secret, {
        //   expiresIn: 86400 // 24 hours
        // });
       
        res.status(200).send({
            id: user.id,
            name: user.name,
           // accessToken: token,
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }

  module.exports = singin;