/* STEP 2: Bind the HEADER and the SECTION elements above to variables */
const header = document.querySelector("header");
const section = document.querySelector("section");

// STEP 3a: Create the asynchronous function populate()
async function populate(){


// Introducing JavaScript Object Notation (JSON): https://json.org/
// STEP 4a: Create i-scream.json file with companyName, headOffice, established, active, topFlavors(name, calories, type, ingredients, image) */
// STEP 4b: Store the URL of a JSON file in a variable */
    const url = "js/i-scream.json";
// STEP 5: Use the new URL to create a new request object
    const request = new Request(url);
// STEP 6: Make a network request with the fetch() function, which returns a Response object
    const response = await fetch(request);
// STEP 7: Capture the returned Response object and covert to a JSON object using json()    
    const responseJSON = await response.json();
// STEP 8: Output the iScream JSON object to the console 

// STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(responseJSON);
// STEP 10a: Invoke the showTopFlavors function here, then build it below
    populateFlavors(responseJSON);
    showTopFlavors(responseJSON);

}
// STEP 3b: Call the populate() function
populate();
/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonData){
// Create the H1 element
    let h1 = document.createElement("h1");
// Grab the company name from the JSON object and use it for the text node
    h1.textContent = jsonData.companyName;
// Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1);
}
/* STEP 10b: Assemble the showTopFlavors() function */

// STEP 10c: Bind the JSON topFlavors object to a var
function showTopFlavors(responseJSON){


// STEP 10d: Loop through the topFlavors object

// STEP 10e: build HTML elements for the content: article, h2, image, p1, p2, list

// STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content

// STEP 10g: Build a loop for the ingredients array in the JSON

// STEP 10i: Append each complete ARTICLE element to the SECTION element

}
// STEP 11: Add a 3rd flavour of ice cream to the local JSON file, making use of the /images/strawberry-sprinkle.svg image

// Lab: Extend the JavaScript application built in class to include two more flavors of ice cream.

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations