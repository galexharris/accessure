file = {
    "category": {
        "success_criterions": ["SC x.x.x"]
    },
    "perceivable": {
        "success_criterions": ["SC 1.3.1"]
    },
    "operable": {
        "success_criterions": ["SC 2.4.1"]
    },
    "readable": {
        "success_criterions": [""]
    },
    "robust": {
        "success_criterions": [""]
    }
}
parsedJSON = "";

example_profile = {


}


function loadPersonas() {
    if (file != null){
        JSON.parse
    }
}

function testJSON(file) {
    for (let i = 0; i < file.length; i++) {
        console.log(file[i]);
    }
}

function addPersona() {

}

function checkAgainstPersona() {

}

function checkAllPersonas(){

}
function generateReport(results){
    let errors_found = [];
    console.log("LEGNTH:" , results.length);
    for (let i = 0; i < results.length; i++){
        errors_found.push(results[i].code);
        // console.log(results[i].code);
    }

}


module.exports= {generateReport};

loadPersonas();
