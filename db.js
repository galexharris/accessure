personaOne = {
    "category": {
        "success_criterions": ["x_x_x"]
    },
    "perceivable": {
        "success_criterions": ["1_3_1"]
    },
    "operable": {
        "success_criterions": ["2_4_1"]
    },
    "readable": {
        "success_criterions": [""]
    },
    "robust": {
        "success_criterions": [""]
    }
}
parsedJSON = "";

personas = [];


// function loadPersonas() {
//     if (file != null){
//         JSON.parse
//     }
// }

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
    let criterions_found = [];
    console.log("LEGNTH:" , results.length);
    for (let i = 0; i < results.length; i++){
        let new_arr = results[i].code.split(".");
        errors_found.push(results[i].code);
        // console.log(new_arr);
        for (let j = 0; j < new_arr.length; j++){
            if (new_arr[j].includes("Guideline")){
                // console.log("TRUE", j);
                criterions_found.push(new_arr[j+1]);
                break;
            }
        }
        
    }
    console.log(criterions_found);



}


module.exports= {generateReport};

