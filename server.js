/* server.js - Express server*/
'use strict';
const log = console.log
log('Express server')

const express = require('express')
const app = express();

const path = require('path');

/*** Webpage routes below **********************************/
/// We only allow specific parts of our public directory to be access, rather than giving
/// access to the entire directory.

// static js directory
app.use("/js", express.static(path.join(__dirname, '/pub/js')))

// static css directory
app.use("/css", express.static(path.join(__dirname, '/pub/css')))

// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/browkit.html'))
})


// will use an 'environmental variable', process.env.PORT, for deployment.
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})  // localhost development port 5000  (http://localhost:5000)
   // We've bound that port to localhost to go to our express server.
   // Must restart web server when you make changes to route handlers.

