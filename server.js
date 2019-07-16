const express = require('express');
const http = require('http');
const app = express();
const pally = require('pa11y');

let db = require("./db.js")


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
// let port = 3000;

app.get('/', (req, res) =>{
    res.sendFile('index.html');
});

app.post('/api/score/', (req, res) =>{
    let url = req.body.url;
    console.log(url);
    pally(url).then((results) => {
        // Do something with the results

        res.send(db.generateReport(results.issues));
    });
});

let port = process.env.VCAP_APP_PORT || 3001
//
// app.listen(port, () => {
// 		console.log(`Socket & Express Server running on port ${port}`)
// 	})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
