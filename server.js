const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

PORT=8080;

/////////////////////////////////////////////
// connect to db

let db;
(async () => {
	db = await open({
		filename: 'midterm.sqlite',
		driver: sqlite3.Database
	});
})();

/////////////////////////////////////////////
// express and middleware setup

app = express();

// support POST data encodings
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

/////////////////////////////////////////////
// routes

app.get('/midterm', async (req, res) => {
	const words = await db.all('select * from words');
	// console.log(words);
	res.render('midterm', {words: words});
})

app.get('/instructors', async (req, res) => {
	const inst = await db.all('select name, awesomeness from instructors');
	res.json(inst);
})

/////////////////////////////////////////////
// start up server

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
