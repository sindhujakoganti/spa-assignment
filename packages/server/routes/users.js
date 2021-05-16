var express = require('express');
var router = express.Router();
var {convertArrayToCamelCase} = require('../utils')
const { authJwt } = require("../middleware");
 
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./db/users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});

  /* GET tasks list. */
router.get('/',
[authJwt.tokenVerification],
 function(req, res) {
   const query = req.query.id ?  `SELECT * from users WHERE id = ? ` : `SELECT * from users `
   const p = req.query.id ? [`${req.query.id}`] : []
  db.serialize(function() {  
    db.all(query, p ,function(err,rows){  
        if(err) 
        {  
            console.log(err);  
        }  
        else{  
          res.send(convertArrayToCamelCase(rows));  
        }  
    });  
});
});

router.post('/', [authJwt.tokenVerification], async function(req, res) {
  const body = req.body;
  db.run(`INSERT INTO users(id,name) VALUES(?,?)`, [body.id,body.name.toString()], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    res.send(`A row has been inserted with rowid ${this.lastID}`);
  });
});

router.put('/:id',[authJwt.tokenVerification], async function(req, res) {
  const body = req.body;
  const params = req.params
  db.run(`UPDATE users SET name=? WHERE id = ?`, [body.name.toString(), params.id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    res.send(`A record has been updated successfully`);
  });
});

router.delete('/:id', [authJwt.tokenVerification],async(req,res)=> {
  const params = req.params;
  db.run(`DELETE FROM users WHERE id = ?;`, [params.id],
  function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send(`A record with id ${params.id} has been deleted successfully`);
  });
});


module.exports = router;
