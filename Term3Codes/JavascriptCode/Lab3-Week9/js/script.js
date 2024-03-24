const output = document.getElementById('output');
const output2 = document.getElementById('output2');

/* STEP 1a: Create a new object using a regular function */
function createNewPerson(firstName, lastName, age, interests){
    let obj = {};
    obj.name={};
    obj.name.firstName = firstName;
    obj.name.lastName = lastName;
    obj.age = age;
    obj.interests = interests;

    obj.greeting = function() {
        output.textContent = `Hello, I am ${this.name.firstName}`
    }
    return obj;
}

/* STEP 1b: Use the console to create a new person, and then invoke the function represented by .greeting() */
let person1 = createNewPerson("Phill", "Franko", 32, ["Streaming", "Current affairs", "Badminton"]);
let person2 = createNewPerson("Donny", "Darkco", 38, ["Philosophy", "walks", "zoning out"]);


/* STEP 2a: In order to be a bit more concise, JavaScript allows us to use constructor functions - 
rewrite the above function, without returning anything. Capitalize the name of the function. */

function Person(firstName, lastName, age, interests){
    this.name = {
        "firstName": firstName,
        "lastName": lastName
    }
    this.age = age;
    this.interests = interests;
    this.greetings = function() {
        output.textContent = `Hello, I am ${this.name.firstName}`
    };
}

/* STEP 2b: Use the console to create a couple of different people, using the 'new' keyword, 
and again invoking the .greeting() method for each person */
let person3 = new Person("Phill", "Darko", 35, ["Swimming", "Zoning Out", "Streaming"]);


/* STEP 3a: Build the complete constructor for the object Person (comment out the above function first).
 Include name (first and last), age, gender, interests, bio (function), and greeting (function). */

/* STEP 3b: Instantiate a new Person based on the above constructor */

/* STEP 3c: Attempt to access the various properties of person1 using the console. */
// person1['age']
// person1.interests[1]
// person1.bio()

/* STEP 4a: Alternatively, you can use the Object() constructor to create an object. eg. car*/
let car = new Object();

/* STEP 4b: Once 'car' is created, add various properties and methods… */
car.brand = "Ford";
car.model = "F150";
car.AWD = "Fuck Ya!";
car.fun = function () {
    console.log(this.brand + " " + this.model);
};

/* STEP 4c: Change some of the properties of 'car' in the console, then invoke the car.fun() function */

/* STEP 5a: Yet another approach is to use the create() method. 
Let's see how the above car object can be used to create another object */
let anotherCar = Object.create(car);
anotherCar.brand = "Hyundai";
anotherCar.model = "Kona";

/* STEP 5b: Output to the paragraph anotherCar.brand - you will see that it has retained the properties of the original object. */

// That's it! Now on to Lab 3...
// Create a JavaScript function that permits the creation of a hamburger object
// Consider that a hamburger has many options – that might include
/*
    different types of buns,
    vegetable garnishes, 
    assortments of cheeses, 
    specialty sauces, 
    different meat patties(beef, chicken, vegetarian), 
    single, double, or triple patty, 
    Pickles, hot peppers, olives etc.
*/
// add some extra if you want
// Make sure that the function allows for the output of a sentence that describes the hamburger, too

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS


function Hamburger(bun, garnish, cheese, sauce, protein, numOfProtein, extras){
    this.bun = bun;
    this.garnish = garnish;
    this.cheese = cheese;
    this.sauce = sauce;
    this.protein = protein;
    this.numOfProtein = numOfProtein;
    this.extras = extras;
    this.description = function(){
        let extraList = ''
        for (let i = 0; i < extras.length; i++){
            extraList += extras[i] + ', ';
        }

        output2.textContent = `Your ${this.numOfProtein} ${this.protein} patties, with ${extraList} and 
            ${garnish} sounds really good, especially with ${cheese} cheese on a ${bun} bun!`
    };
}

let hamburger = new Hamburger("sesame-seed", "lettuce", "swiss", "garlic aioli", "beef", 3, ["onions", "pickles", "sauerkraut"])