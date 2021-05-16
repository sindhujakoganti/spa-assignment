var express = require('express');
const moment = require('moment');
var router = express.Router();
var {convertArrayToCamelCase, convertObjToCamelCase} = require('../utils')
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
 [authJwt.tokenVerification] , 
async function(req, res) {
    const query = req.query.taskName?  `SELECT * FROM tasks WHERE task_name LIKE ?` : `SELECT * FROM tasks` 
    const params = req.query.taskName ? [ `%${req.query.taskName}%`] : []
    db.serialize(function () {
    db.all(query, params, function (err, rows) {
     if (err) {
      res.status(500).send({message: err.message})
     }
     else {
      res.send(convertArrayToCamelCase(rows));
     }
   });
 });
});


router.post('/',
 [authJwt.tokenVerification] ,
 async function(req,res) {
 const body = req.body;
 const currentDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
 db.serialize(()=> {
  db.all('SELECT * FROM TASKS  WHERE task_id = ? and user_id = ?', [body.taskId, body.userId], (err, result) => {
    if (err) {
      console.log(err)
      res.status(404).send({message: `record not found with task${body.taskId}/ userId ${body.userId}`})
  } else {
      if(result){ 
        db.run(`INSERT INTO tasks(user_id,task_id,task_name,is_completed,created_date,modifed_date) VALUES(?,?,?,?,?,?)`, [body.userId,body.taskId, body.taskName, body.isCompleted,currentDate, currentDate], 
        function(err) {
          if (err) {
          res.send({status: 500,statusText: 'failure', message: err.message})
        }
   // get the last insterted record
      res.json({status: 'success', 
      message: `A record has been inserted successfully`, 
      data: {... convertObjToCamelCase(body), createdDate: currentDate , modifedDate: currentDate}})
        });
}}
  })
 })
 });

router.put('/:taskId/user/:userId',
 [authJwt.tokenVerification] , 
async function(req,res) {
  const body = req.body;
  const params = req.params
  const modifedDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
  const b = body.taskName ? body.taskName : body.isCompleted
  db.serialize(() => {
    db.all('SELECT * FROM TASKS  WHERE task_id = ? and user_id = ?', [params.taskId, params.userId], (err, result) => {
      if (err) {
        res.status(404).send({message: `record not found with task${params.taskId}/ userId ${params.userId}`})
      } else {
        const query = body.taskName ? `UPDATE tasks SET  modifed_date = ?, task_name=? WHERE task_id = ? and user_id = ?;` :
        `UPDATE tasks SET  modifed_date = ?, is_completed =? WHERE task_id = ? and user_id = ?;`
        if(result){ 
          db.run(query, [ modifedDate, b ,Number(params.taskId), Number(params.userId)],
          function(err) {
            if (err) {
              res.send({status: 500,statusText: 'failure', message: err.message})
            }
      // get the updated record
      res.status(200).json( {status: 'success', 
      message: `A record has been updated successfully`, 
      data: {...convertObjToCamelCase(body), modifedDate}
    })
    });
  }}
    })
  })
})

router.delete('/:taskId/user/:userId',
  [authJwt.tokenVerification] , 
 async(req,res)=> {
  const params = req.params;
  db.serialize(() => {
    db.all('SELECT * FROM TASKS  WHERE task_id = ? and user_id = ?', [params.taskId, params.userId], (err, result) => {
      if (err) {
        res.status(404).send({message: `record not found with task${params.taskId}/ userId ${params.userId}`})
      } else {
        if(result){ 
          db.run(`DELETE FROM tasks WHERE task_id = ? and user_id = ?;`, [params.taskId, params.userId],
          function(err) {
            if (err) {
                            return res.send({status: 500,statusText: 'failure', message: err.message})
    }
      res.status(200).json( {status: 'success', 
      message: `A record has been deleted successfully`})
    });
  }}
    
})
  })
  });




module.exports = router;