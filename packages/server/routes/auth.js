var express = require('express');
var router = express.Router();
// var {convertArrayToCamelCase} = require('../utils')
const { authJwt } = require("../middleware");
// const {singin} = require('../controllers/login')
var jwt = require("jsonwebtoken");
const config = require("../config/config");
 
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});

// login 
router.post('/' , 
function singin(req, res) {
    db.get( `SELECT * FROM users WHERE id=? and name like ? `, [req.body.id, req.body.name], (err, user) => {
    if(err){
        res.status(500).send({ message: err.message });
    } 
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var token = jwt.sign({ id: user.id,  name:user.name }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
     
      res.status(200).send({
          id: user.id,
          name: user.name,
          accessToken: token
        });   
    })
  });

module.exports = router;
