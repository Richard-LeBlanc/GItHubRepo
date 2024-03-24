const output = document.querySelector('#output');

/* STEP 1: Instead of a constructor function, let's try a JavaScript class called 'Coffee' */
class Coffee {
    size;
    isDecaf;
// create constructor with keyword
    constructor(size, isDecaf){
        this.size = size;
        this.isDecaf = isDecaf;
    }
// add a serveIt method
    serveIt(){
// Generate an IMG of the coffee ordered
        let cup = document.createElement("img")  //  <img />
// Set the src path for the IMG element
        cup.setAttribute("src", "images/coffee-cup.svg")
// Determine caffeine status of the coffee
        if(this.isDecaf){
            cup.setAttribute("src", "images/coffee-cup-green.svg")
        }else {
            cup.setAttribute("src", "images/coffee-cup-purple.svg")
        }
// Set the size of the cup SVG image based on this.size
        switch(this.size){
// Size the IMG in terms of its height based on above number from the switch
            case "large":
                cup.setAttribute("height", 200);
                break;
            case "small":
                cup.setAttribute("height", 100);
                break;
            case "medium":
                cup.setAttribute("height", 150);
                break;
            default:
                cup.setAttribute("height", 150);
        }


// Generate a description of the coffee and put it into the 
//IMG title attribute
        cup.alt = `A ${this.size} sized coffee`;
        cup.title = cup.alt;
// Insert the new IMG element into the paragraph
        output.appendChild(cup);
// Output all object member values

    }
}
/* STEP 2: Instatiate a coffee based on the 
above constructor function */
let myCoffee = new Coffee("medium", false);
let amyCoffee = new Coffee("large", true);
let harrisonCoffee = new Coffee("small", false);
/* STEP 3: Add a method to the Coffee class called serveIt() */
myCoffee.serveIt();
amyCoffee.serveIt();
harrisonCoffee.serveIt();
/* STEP 4: Call up the serveIt() method */

/* STEP 5: Define a subclass of the Coffee class */
class Latte extends Coffee{
    milkType;
    
    constructor(size, isDecaf, milkType){
        super(size, isDecaf);
        this.milkType = milkType;
    };

    latteDesc(){
        alert(`This ${this.size} sized ${this.isDecaf == true ? "decaffeinated":"caffeinated"} Latte with ${this.milkType} milk`);
    }
}
/* STEP 6: Create a new instance of the Latte object */
let myLatte = new Latte("medium", true, "low fat 2%");
myLatte.latteDesc();
myLatte.serveIt();
/* STEP 7: Call up the latteDesc() method for the above created Latte instance */

/* STEP 8: Create yet another instance of Latte using the console, 
and try the latteDesc() method from the subclass, as well as the serveIt() method 
from the parent class */

/* Class Exercise: Using the coffee.html file, create a new constructor for a different type of coffee (like an Americano, Espresso or ???). 
Based on this new coffee on the Coffee object. 
Use the steps we followed to create Latte as your guide.*/

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript

// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG