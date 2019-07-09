const express = require('express');
const http = require('http');
const app = express();
const pally = require('pa11y');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let port = 3000;

app.post('/api/score/', (req, res) =>{
    let url = req.body.url;
    console.log(`URL: ${url}`);
    res.end('done');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*pally('https://www.libertymutual.com/').then((results) => {
    // Do something with the results
    console.log(results);
});*/