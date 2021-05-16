const http = require( 'http');
const {app} = require( './app');
const sqlite3 = require('sqlite3').verbose();

const server = http.createServer(app);
const port = 9000;

server.listen(port)
server.on('listening', async() => {
    console.info(`server connected, listening on port ${port}`)

connectToDB()
})

const connectToDB = () =>  new sqlite3.Database('./db/users.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
  });

module.exports = connectToDB
  