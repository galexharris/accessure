personaEx = ["1_3_1", "2_4_1"];
personaCognitive
personaBlind = ["1_1_1", "1_3_1", "1_3_2", "1_3_3", "1_4_2", "1_4_5", "1_4_7", "1_4_9", "2_1_1", "2_1_2", "2_1_3", "2_2_1", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_4_1", "2_4_2", "2_4_3", "2_4_4", "2_4_5", "2_4_6", "2_4_7", "2_4_8", "2_4_9", "2_4_10", "3_2_1", "3_2_2", "3_2_3", "3_2_4", "3_2_5", "3_3_1", "3_3_2", "3_3_3", "3_3_4", "3_3_5", "3_3_6", "4_1_1", "4_1_2" ];
parsedJSON = "";

personas = [];

function testJSON(file) {
    for (let i = 0; i < file.length; i++) {
        console.log(file[i]);
    }
}


function calculateScore(persona_arr, criterions_found) {
    total = 0;
    errors = 0;
    persona_arr.forEach((persona) => {
        total += 1;
        console.log("PERSONA SC:", persona);
        console.log(criterions_found);
        if (criterions_found.includes(persona)) {
            errors += 1
        }
    });
    console.log('ERRORS', errors);
}

function generateReport(results) {

    let errors_found = [];
    let criterions_found = [];
    console.log("LEGNTH:", results.length);
    for (let i = 0; i < results.length; i++) {
        let new_arr = results[i].code.split(".");
        errors_found.push(results[i].code);
        // console.log(new_arr);
        for (let j = 0; j < new_arr.length; j++) {
            if (new_arr[j].includes("Guideline")) {
                // console.log("TRUE", j);
                criterions_found.push(new_arr[j + 1]);
                break;
            }
        }

    }
    return calculateScore(personaBlind, criterions_found);



}


module.exports = {
    generateReport
};