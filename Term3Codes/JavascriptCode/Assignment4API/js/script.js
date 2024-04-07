const requirementsInput = document.getElementById("requirements");
const positionInput = document.getElementById("position");
const dateInput = document.getElementById("date_posted");
const jobTitleInput = document.getElementById("jobTitle");
const stateInput = document.getElementById("state");
const countryInput = document.getElementById("country");
const submitButton = document.getElementById("submit");
const paginationSection = document.querySelector(".pagination");

let url = 'https://jsearch.p.rapidapi.com/search?query={title}%20in%20{state}%2C%20{country}&page=1&num_pages=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '02dae4e735mshdbed5dc666ba955p12228bjsn6f9e7711bc2a',
		'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
	}
};

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

submitButton.addEventListener("click", processForm);

//  cleanUpStrings is intended to remove running characters that should only be allowed a single time
//  removes excessive whitespace or single quotes from being passed to the getters
function cleanUpStrings(charToClean, stringInput){
    let doubleFlag = false;
    let newString = "";
    for (i = 0; i < stringInput.length; i++){
        if (stringInput[i] == charToClean){

            if(doubleFlag == false){
                newString += stringInput[i];  //  add the first occurrence of a singly permitted character
            }
            doubleFlag = true;           //  flag that the last char was char we are examining

        } else{
            newString += stringInput[i];        //  if a non-special char is detected, add it to the string and 
            doubleFlag = false;             //  set flag back to false
        }
    }
    return newString;
}

//  remove special characters and remove any problematic double characters to have bedside each other
function sanitize(string){
    string = string.replaceAll("<", "");
    string = string.replaceAll("$", "");
    string = string.replaceAll("*", "");
    string = string.replaceAll('"', "");
    string = string.replaceAll("=", "");
    string = string.replaceAll(">", "");
    string = cleanUpStrings("'", string);
    if(string == "" || string == null || string == undefined){
        throw new TypeError("Sanatize requires a valid string!");
    }
    return string;
}

function buildURL(type, stringInput){
    
    try{
        url = url.replace(type, cleanUpStrings(" ", stringInput.trim()).replaceAll(" ", "%20"));
    }
    catch(err){
        console.log("error in buildURL: " + err.message);
        console.trace();
    }
}

function processForm(event){
    event.preventDefault();
    try{
        buildURL("{title}", sanitize(jobTitleInput.value));
        buildURL("{state}", sanitize(stateInput.value));
        buildURL("{country}", sanitize(countryInput.value));
    }
    catch(err){
        console.log(err.message);
        console.trace();
        return null;
    }

    if (dateInput.value != "none")
        url += "&date_posted=" + dateInput.value;
    if (positionInput.value != "none")
        url += "&employment_types=" + positionInput.value;

    if(requirementsInput.value != "none")
        url += "&job_requirements=" + requirementsInput.value;
    
    document.querySelector("section").classList.add("hidden");
    paginationSection.classList.remove("hidden");
    console.log(url);
}

function buildJobArticles(jobsJson){
    let article = document.createElement("article");
    
}