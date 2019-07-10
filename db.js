personaCognitive = ["1_3_1", "1_3_3", "1_4_3", "1_4_6", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_3_1", "2_3_2", "2_4_1", "2_4_2", "2_4_6", "2_4_9", "2_4_10", "3_1_5", "3_2_3"];
personaBlind = ["1_1_1", "1_3_1", "1_3_2", "1_3_3", "1_4_2", "1_4_5", "1_4_7", "1_4_9", "2_1_1", "2_1_2", "2_1_3", "2_2_1", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_4_1", "2_4_2", "2_4_3", "2_4_4", "2_4_5", "2_4_6", "2_4_7", "2_4_8", "2_4_9", "2_4_10", "3_2_1", "3_2_2", "3_2_3", "3_2_4", "3_2_5", "3_3_1", "3_3_2", "3_3_3", "3_3_4", "3_3_5", "3_3_6", "4_1_1", "4_1_2"];
personaColorBlind = ["1_4_1", "1_4_3", "1_4_6", "1_4_8", "3_2_3"];
personaVisuallyImpaired = ["1_1_1", "1_3_1", "1_3_2", "1_3_3", "1_4_2", "1_4_5", "1_4_7", "1_4_9", "2_1_1", "2_1_2", "2_1_3", "2_2_1", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_4_1", "2_4_2", "2_4_3", "2_4_4", "2_4_5", "2_4_6", "2_4_7", "2_4_8", "2_4_9", "2_4_10", "3_2_1", "3_2_2", "3_2_3", "3_2_4", "3_2_5", "3_3_1", "3_3_2", "3_3_3", "3_3_4", "3_3_5", "3_3_6", "4_1_1", "4_1_2"];
personaMotor = ["2_1_1", "2_1_2", "2_1_3", "2_4_1", "2_4_3", "2_4_7"];
parsedJSON = "";

personas_list = {
    'Cognitive': personaCognitive,
    'Blind': personaBlind,
    'Color Blind': personaColorBlind,
    'Visually Impaired': personaVisuallyImpaired,
    'Motor': personaMotor
}

function testJSON(file) {
    for (let i = 0; i < file.length; i++) {
        console.log(file[i]);
    }
}


function calculateScore(persona_arr, criterions_found) {
    total = 0;
    errors = 0;
    persona_errors = [];
    persona_arr.forEach((persona) => {
        total += 1;
        if (criterions_found.includes(persona)) {
            errors += 1
            persona_errors = persona;
        }
    });
    return [errors, persona_errors];
}



function generateReport(results) {
    let found = [];
    let errors_found = [];
    let criterions_found = [];
    for (let i = 0; i < results.length; i++) {
        let new_arr = results[i].code.split(".");
        errors_found.push(results[i].code);
        for (let j = 0; j < new_arr.length; j++) {
            if (new_arr[j].includes("Guideline")) {
                criterions_found.push(new_arr[j + 1]);
                break;
            }
        }

    }
    for (let obj in personas_list) {
        let persona_result = calculateScore(personas_list[obj], criterions_found);
        let entry = {
            "persona": obj,
            "num_errors": persona_result[0],
            "errors": persona_result[1]

        }
        found.push(entry);
    }

    console.log(found);
    return found;

}


module.exports = {
    generateReport
};