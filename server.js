const express = require('express');
const http = require('http');
const app = express();
const pally = require('pa11y');

let db = require("./db.js")


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
let port = 3000;

app.get('/', (req, res) =>{
    res.sendFile('index.html');
});

app.post('/api/score/', (req, res) =>{
    let url = req.body.url;
    console.log(`URL: ${url}`);
    res.end('done');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

pally('https://www.libertymutual.com/').then((results) => {
    // Do something with the results
    // console.log(results.issues.length);
    db.generateReport(results.issues);
    console.log("FINISHED");
});