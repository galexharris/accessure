const pally = require('pa11y');

pally('https://www.libertymutual.com/').then((results) => {
    // Do something with the results
    console.log(results);
});