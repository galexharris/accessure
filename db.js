
// Add a persona here. Personas are based around a set of criterions, stored as an array.
 
let personaCognitive = ["1_3_1", "1_3_3", "1_4_3", "1_4_6", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_3_1", "2_3_2", "2_4_1", 
"2_4_2", "2_4_6", "2_4_9", "2_4_10", "3_1_5", "3_2_3"];
let personaBlind = ["1_1_1", "1_3_1", "1_3_2", "1_3_3", "1_4_2", "1_4_5", "1_4_7", "1_4_9", "2_1_1", "2_1_2",
 "2_1_3", "2_2_1", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_4_1", "2_4_2", "2_4_3", "2_4_4", "2_4_5", 
 "2_4_6", "2_4_7", "2_4_8", "2_4_9", "2_4_10", "3_2_1", "3_2_2", "3_2_3", "3_2_4", "3_2_5", "3_3_1",
  "3_3_2", "3_3_3", "3_3_4", "3_3_5", "3_3_6", "4_1_1", "4_1_2"];
let personaColorBlind = ["1_4_1", "1_4_3", "1_4_6", "1_4_8", "3_2_3"];
let personaVisuallyImpaired = ["1_1_1", "1_3_1", "1_3_2", "1_3_3", "1_4_2", "1_4_5", "1_4_7", "1_4_9", "2_1_1",
 "2_1_2", "2_1_3", "2_2_1", "2_2_2", "2_2_3", "2_2_4", "2_2_5", "2_4_1", "2_4_2", "2_4_3", "2_4_4", "2_4_5", 
 "2_4_6", "2_4_7", "2_4_8", "2_4_9", "2_4_10", "3_2_1", "3_2_2", "3_2_3", "3_2_4", "3_2_5", "3_3_1", "3_3_2", "3_3_3", "3_3_4", "3_3_5", "3_3_6", "4_1_1", "4_1_2"];
let personaMotor = ["2_1_1", "2_1_2", "2_1_3", "2_4_1", "2_4_3", "2_4_7"];

//Once a Persona has been created, add it to the personas_list so that it would be included when scanning the site.

personas_list = {
    'Cognitive': personaCognitive,
    'Blind': personaBlind,
    'Color Blind': personaColorBlind,
    'Visually Impaired': personaVisuallyImpaired,
    'Motor': personaMotor
}

/**
 * @name calculateScore
 * 
 * @description Given an array of error_objects, an arr that contains all errors found for a page,
 * we check against a particular persona for any errors within the page that fit its category. We calculate
 * the total persona errors as well as create an array that contains the errors found for that persona
 *
 * @param {*} criterion_arr
 * 
 * @param {*} error_objects
 * 
 * @returns An array in which index 0 contains the total issues (integer) and index 1 contains errors found (json objects)
 */
function calculateScore(criterion_arr, error_objects) {
    total_issues = 0;
    errors = [];
    criterion_arr.forEach((criterion) => {
        result = error_objects.find(item => item.guideline === criterion);
        if (result != null) {
            total_issues += 1;
            errors.push(result);
        }
    });
    return [total_issues, errors];
}

/**
 * @name generateReport
 * 
 * @description Parses the results json generated by the Pa11y API
 *  for a given page and creates individual json objects for each error on the page.
 *  After all errors are stored, we call checkPersonas on the error_objects array, the result of which we return.
 *
 * @param {*} results A JSON Pa11y report
 * 
 * @returns a JSON array that contains:
     {
         persona: current persona being checked against, a String
         num_errors: total errors found
             for that persona, an Integer
        errors: JSON object array of errors
            {
                guideline: the criterion that was not met, String
                selector: the css selector in which the issue is found, String
                message: the error message, String 
            }
     }
 */
function generateReport(results) {
    let error_objects = [];
    for (let i = 0; i < results.length; i++) {
        curr_err = "";
        code_split = results[i].code.split(".");
        //Because of the way Pa11y formats its reports, we split on each error code so
        //that we can easily find which criterion is not met
        for (let j = 0; j < code_split.length; j++) {
            if (code_split[j].includes("Guideline")) {
                curr_err = code_split[j + 1];
                break;
            }
        }
        //After pruning the error report, we a create a more condensed error message and store that 
        let error = {
            "guideline": curr_err,
            "selector": results[i].selector,
            "message": results[i].message
        }
        console.log(error);
        error_objects.push(error);
    }
    return checkPersonas(error_objects);
}

/** 
 * @name checkPersonas
 * 
 * @description Given the errors for particular page, we iterate through stored personas in
 *  personas_list and check against each one for which errors fall under it. Each result
 *  is formatted as a JSON object and that object is added to a list that is sent to the front end.
 *
 * @param {*} error_objects All errors found for a page, an array of JSON objects.
 * 
 * @returns A JSON array that contains:
    {
        persona: the persona checked against, a String
        num_errors: total errors found, an Integer
        errors: JSON object array of errors, see generateReport() for format of each error object
    }
 */
function checkPersonas(error_objects) {
    results = []
    for (let obj in personas_list) {
        let persona_result = calculateScore(personas_list[obj], error_objects);
        let entry = {
            "persona": obj,
            "num_errors": persona_result[0],
            "errors": persona_result[1],
        }
        results.push(entry);
    }
    //Results on backend
    console.log(results);
    return results;
}

//Add functions to this if you want to use functions within this class in other classes
module.exports = {
    generateReport
}