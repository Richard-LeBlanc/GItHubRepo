class Pizza{
    //  dough will equal one type of dough offered
    dough;
    //  sauce - veggies will become an object with types chosen as keys and 
    //  their values as amounts.
    sauce;
    cheese;
    meat;
    premiumMeat;
    vegetable;

    //  Price is a calculated field based on the fields above
    //  paragraph describes the base of the pizza before cheese and toppings
    price;
    paragraph;

    constructor(dough, sauce, cheese, meat, premiumMeat, vegetable) {
        this.dough = dough;
        this.sauce = this.verifyQuantities(2, sauce);
        this.cheese = this.verifyQuantities(3, cheese);
        this.meat = this.verifyQuantities(3, meat);
        this.premiumMeat = this.verifyQuantities(3, premiumMeat);
        this.vegetable = this.verifyQuantities(3, vegetable);
        this.paragraph = this.createParagraph();
        this.price = Math.round(this.calculatePrice() * 100) / 100;
    };

    //  ensure max number is in line with store policies
    verifyQuantities(max, selection){
        const keys = Object.keys(selection);
        keys.forEach(x => {
            if (selection[x] > max){
                selection[x] = max;
            }
        });
        return selection;
    }

    calculatePrice(){
        //  Pan dough is 2 dollars more thick crust is 1 dollar more
        const doughCharge = (this.dough == 'Pan' ? 2 : (this.dough == 'Thick' ? 1 : 0))

        //  Sauce is 1 dollar for every serving past one
        const sauceCharge = (this.getToppingQuantity(this.sauce) > 1 ? (this.getToppingQuantity(this.sauce) - 1): 0);

        //  Cheese is 2.75 dollars more for each serving past one
        const cheeseCharge = (this.getToppingQuantity(this.cheese) > 1 ? 
            (2.75 * (this.getToppingQuantity(this.cheese) - 1)) : 0);

        //  Meats are 1.5 each no inclusions Premium meats are 2.5
        const meatCharge = this.getToppingQuantity(this.meat) * 1.5;
        const premiumMeatCharge = this.getToppingQuantity(this.premiumMeat) * 2.5;

        //  Veggies are 1 each
        const vegetableCharge = this.getToppingQuantity(this.vegetable)

        return 19.99 + sauceCharge + doughCharge + cheeseCharge 
                    + meatCharge + premiumMeatCharge + vegetableCharge;                     
    }

    //  creates a string that describes the dough and sauce
    createParagraph(){
        let message = (`${this.dough} ${(this.dough == 'Pan') ? "pizza" : "crust pizza"} `);
        if (Object.keys(this.sauce).length > 0){
            Object.keys(this.sauce).forEach(x =>{
                if (Object.keys(this.sauce)[0] == x){
                    message += (`${this.sauce[x] > 1 ? "with double" : "with"} ${x} sauce.`);
                } else{
                    message += (`${this.sauce[x] > 1 ? " and double" : " and"} ${x} sauce.`);
                }
            });
        } else{
            message += "with no sauce.";
        }
        return message;
    }

    //  accepts objects, and returns a list of the toppings
    //  implemented to accept the cheese, meat/premiumMeat and vegetable fields
    selectionStrings(selection){
        let message = "";
        const keys = Object.keys(selection);
        if (keys.length > 1){
            keys.forEach(x =>{
                if (keys[keys.length - 1] != x){
                    message += (`${selection[x] == 1 ? "" : selection[x] == 2 ? "double " : "triple "}${x}, `); //  add comma
                } else{
                    message += (`${selection[x] == 1 ? "and " : selection[x] == 2 ? "and double " : " and triple "}${x}`);//  no comma
                }
            })
        } else if (keys.length == 0){
            message += `None`;
        }else if (keys.length == 1){
            message += (`${selection[keys[0]] == 1 ? "" : selection[keys[0]] == 2 ? "Double " : "Triple "}${keys[0]}`); //  no comma, no ands
        }
        message += ".";
        return message;
    }

    //  output the total quantity of selected items in a section.
    //  only useful for the toppings and sauce, not dough
    getToppingQuantity(selection){
        let quantity = 0;
        const keys = Object.keys(selection);
        if (keys.length > 0){
            keys.forEach(x =>{
                quantity +=  Number(selection[x]);
            })
        }
        return quantity;
    }
};

//  define the sections of data in the form and create a list to hold each object for debugging
let pizzas = [];
const cartButton = document.body.querySelector("button#addPizza");
const sauces = document.body.querySelectorAll("div.sauce input");
const cheeses = document.body.querySelectorAll("div.cheese input");
const meats = document.body.querySelectorAll("div.regularMeats input");
const premiumMeats = document.body.querySelectorAll("div.premiumMeats input");
const veggies = document.body.querySelectorAll("div.veggies input");


//  returns the value of the selected dough
function doughChoice(){
    const doughSelectors = document.body.querySelector("input[name='dough']:checked");
    return doughSelectors.value;
};

//  returns an object that contains 0 to many choices
function getSelections(choice){
    let choices = {};
    choice.forEach(selection => {
        if(selection.value > 0){
            choices[selection.name] = selection.value;
        }
    });
    return choices;
};

//  append to the body a description of their current order.
function createView(pizza){
    //  create a div to hold each part of each order name its class cartItems for styling
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "cartItems");


    //  create a figure and append that to the main div
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    

    //  the image will take be focused around the dough selected; default is for debugging 
    img.setAttribute("alt", pizza.paragraph);
    switch(pizza.dough){
        case 'Pan':
            img.setAttribute("src", "./img/dough1.jpeg");
            break;
        case 'Thin':
            img.setAttribute("src", "./img/dough.jpeg");
            break;
        case 'Thick':
            img.setAttribute("src", "./img/dough3.jpeg");
            break;
        case 'Classic':
            img.setAttribute("src", "./img/dough2.jpeg");
            break;
        default:
            img.setAttribute("src", "./img/no-image.png");
    }
    
    figcaption.textContent = pizza.paragraph;

    //  put the figure together and append it to the main div
    figure.appendChild(img);
    figure.appendChild(figcaption);
    itemDiv.appendChild(figure);


    //  Capitalize the first letter of the string
    let cheese = pizza.selectionStrings(pizza.cheese)[0].toUpperCase();
    cheese += pizza.selectionStrings(pizza.cheese).substring(1);

    let meat = pizza.selectionStrings(pizza.meat)[0].toUpperCase();
    meat += pizza.selectionStrings(pizza.meat).substring(1);

    let premiumMeat = pizza.selectionStrings(pizza.premiumMeat)[0].toUpperCase();
    premiumMeat += pizza.selectionStrings(pizza.premiumMeat).substring(1);

    let vegetable = pizza.selectionStrings(pizza.vegetable)[0].toUpperCase();
    vegetable += pizza.selectionStrings(pizza.vegetable).substring(1);


    const toppings = ["Cheese: " + cheese,
        "Meat: " + meat,
        "Premium meats: " + premiumMeat, 
        "Vegetables: " + vegetable];

    const paragraphContainer = document.createElement("div")
    toppings.forEach(x => {
        const toppingParagraph = document.createElement("p");
        toppingParagraph.textContent = x;
        paragraphContainer.appendChild(toppingParagraph);
    })
    itemDiv.appendChild(paragraphContainer);


    //  create and element to hold the price of the ordered pizza
    const tagDiv = document.createElement("div");
    const priceTag = document.createElement("p");    

    priceTag.textContent = pizza.price;
    tagDiv.appendChild(priceTag);

    itemDiv.appendChild(tagDiv);
    document.body.querySelector(".cart").appendChild(itemDiv);
}

function addToCart(){

    //  get the contents of items into a form that can be passed into our object constructor
    const dough = doughChoice();
    const sauce = getSelections(sauces);
    const cheese = getSelections(cheeses);
    const meat = getSelections(meats);
    const premiumMeat = getSelections(premiumMeats);
    const vegetable = getSelections(veggies);


    let myPizza = new Pizza(dough, sauce, cheese, meat, premiumMeat, vegetable);
    pizzas.push(myPizza);
    createView(myPizza); 
    document.getElementById("output").textContent = "Richard LeBlanc 200 182 873"
}

cartButton.addEventListener("click", addToCart);
