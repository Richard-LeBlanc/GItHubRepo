const requirementsInput = document.getElementById("requirements");
const positionInput = document.getElementById("position");
const dateInput = document.getElementById("date_posted");
const jobTitleInput = document.getElementById("jobTitle");
const stateInput = document.getElementById("state");
const countryInput = document.getElementById("country");
const submitButton = document.getElementById("submit");
const paginationSection = document.querySelector(".pagination");
const closeModal = document.querySelector(".closeModal");

closeModal.addEventListener("click", hideModal);

function hideModal(event){
    event.target.parentNode.classList.add("hidden");
}

//  This was the recommendation from rapid api, I tried to get it to work through get properties like in class, but didn't understand how to format it, so I used the options as the second value in the fetch method.
let url = 'https://jsearch.p.rapidapi.com/search?query={title}%20in%20{state}%2C%20{country}&page=1&num_pages=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '02dae4e735mshdbed5dc666ba955p12228bjsn6f9e7711bc2a',
		'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
	}
};


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
        throw new TypeError("Sanitize requires a valid string!");
    }
    return string;
}

//  process the forms information, replace multiple whitespaces with single whitespaces and turn those whitespaces into %20 to parse
//  sentences.
function buildURL(type, stringInput){
    
    try{
        url = url.replace(type, cleanUpStrings(" ", stringInput.trim()).replaceAll(" ", "%20"));
    }
    catch(err){
        console.log("error in buildURL: " + err.message);
        console.trace();
    }
}

//  run text fields through sanitizer functions and append them to the url,
//  choice fields we just use the value of the selections.
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
    
    paginationSection.classList.remove("hidden");

    //  fetch data and await the response, when we receive it, call the buildJobArticles function.
    fetch(url, options).then(response => {
        return response.json();
    }).then(json => buildJobArticles(json));
    console.log(url);
}

let pageNumber = 0;

//  hide each article, then figures out which one to show based on the current pageNumber
function showArticle(number){
    hideAllArticles();
    const show_value = number;
    let found = false;

    const jobs = document.querySelectorAll(".pagination article");

    //  for each article
    for (i = 0; i < jobs.length; i++){
        const classes = jobs[i].classList;
        //  locate the job className and extract the job number
        for(j = 0; j < classes.length; j++){
            if(classes[j].slice(0,3) == "job"){
                if (classes[j].slice(-1) == show_value || (classes[j].slice(-1) == 0 && show_value == 10)){
                    jobs[i].classList.remove("hidden");     // when we find the correct job remove the hidden tag
                    found = true;                           // and leave the for loops by checking flag value
                    console.log("foundJob")//  for debugging
                    break;
                }
            }
        }
        if (found){
            break;
        }
        console.log(classes[0].slice(-1))
        console.log("job number: " + number + " not found on pass " + (i + 1))
    }
}

//  add the hidden tag to every article
function hideAllArticles() {
    const jobs = document.querySelectorAll(".pagination article");


    for (i = 0; i < jobs.length; i++){
        jobs[i].classList.add("hidden");
    }
}
function buildJobArticles(jobsJson){

    //  an array of the items retrieved from the web-search is accessed through jobs
    const jobs = jobsJson.data;
    document.getElementById("studentNumber").textContent = `Richard LeBlanc: 200 182 873`

    //  generate an article for each result returned from the api's data
    //  each article will have a unique class = "job" + (1+i);
    if(jobs == undefined || jobs.length == 0){
        document.querySelector(".pagination h3").textContent = "No Results!";
    }else{
        for (i = 0; i < jobs.length; i++){

            //  set up the appropriate elements to hold data from the retrieved Json file
            const employer_name = document.createElement("h4");
            const employer_logo = document.createElement("img");
            const employer_website = document.createElement("a");
            const job_title = document.createElement("p");
            const job_description = document.createElement("p");
            const job_apply_link = document.createElement("a");


            employer_name.textContent = jobs[i].employer_name;
            employer_logo.src = jobs[i].employer_logo;
            employer_logo.alt = employer_name.textContent + "'s logo";
            employer_website.href = jobs[i].employer_website;
            employer_website.target = "_blank";  //open links in another tab
            job_title.textContent = jobs[i].job_title;
            job_description.textContent = jobs[i].job_description;
            job_apply_link.href = jobs[i].job_apply_link;
            job_apply_link.target = "_blank";


            const job_article = document.createElement("article");

            //  append each element to the article, verify the links and logo, which may be null.
            job_article.classList.add("job" + (1+i));
            job_article.classList.add("hidden");

            job_article.appendChild(employer_name);
            if (!(employer_logo.src == null)){
                job_article.appendChild(employer_logo);
            }else{
                const replacement = document.createElement("p");
                replacement.textContent = "Employer's logo is unavailable"
                job_article.appendChild(replacement);
            }

            if(!(employer_website == null)){
                employer_website.textContent = employer_name.textContent + "'s Website";
                job_article.appendChild(employer_website);
            }else{
                const replacement = document.createElement("p");
                replacement.textContent = "Employer's website is unavailable"
                job_article.appendChild(replacement);
            }

            job_article.appendChild(job_title);
            job_article.appendChild(job_description);

            if(!(job_apply_link == null)){
                job_apply_link.textContent = employer_name.textContent + "'s application website.";
                job_article.appendChild(employer_website);
            }else{
                const replacement = document.createElement("p");
                replacement.textContent = "Application link is unavailable"
                job_article.appendChild(replacement);
            }

            //  article is added to the modal displaying the information
            paginationSection.appendChild(job_article);
        }

        //Create the pagination mechanism
        const paginationMenu = document.createElement("menu");

        const firstItem = document.createElement("p");
        const lastItem = document.createElement("p");
        const previous = document.createElement("p");
        const next = document.createElement("p");
        
        firstItem.textContent = "<<";
        firstItem.addEventListener("click", paginationManager);
        previous.textContent = "<";  
        previous.addEventListener("click", paginationManager);    

        paginationMenu.appendChild(firstItem);
        paginationMenu.appendChild(previous);

        for (i = 0; i < jobs.length; i++){
            const numbered_titles = document.createElement("p");
            numbered_titles.textContent = i + 1;
            numbered_titles.addEventListener("click", paginationManager)
            paginationMenu.appendChild(numbered_titles);
        }

        
        lastItem.textContent = ">>";
        lastItem.addEventListener("click", paginationManager);
        next.textContent = ">";
        next.addEventListener("click", paginationManager);

        paginationMenu.appendChild(next);
        paginationMenu.appendChild(lastItem);

        paginationSection.appendChild(paginationMenu);
        showArticle(1);
    }
}

//  determines which page number to move to
function paginationManager(event){
    const jobs = document.querySelectorAll(".pagination article");
    switch(event.target.textContent){
        case "<<":
            pageNumber = 1;
            break;
        case "<":
            pageNumber -= (pageNumber > 1) ? 1 : 0;
            break;
        case "0":
            pageNumber = 10;
            break;
        case "1":
            pageNumber = 1;
            break;
        case "2":
            pageNumber = 2;
            break;
        case "3":
            pageNumber = 3;
            break;
        case "4":
            pageNumber = 4;
            break;
        case "5":
            pageNumber = 5;
            break;
        case "6":
            pageNumber = 6;
            break;
        case "7":
            pageNumber = 7;
            break;
        case "8":
            pageNumber = 8;
            break;
        case "9":
            pageNumber = 9;
            break;
        case ">":
            pageNumber = (pageNumber + 1 <= jobs.length) ? pageNumber + 1 : jobs.length;
            break;
        case ">>":
            pageNumber = jobs.length;
            break;
    }
    console.log("showing " + pageNumber); //  for debugging
    showArticle(pageNumber);
}