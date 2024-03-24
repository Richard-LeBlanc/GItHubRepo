var output = document.querySelector("p");
output.textContent = 10;
/* STEP 1: Creating Strings */
var string1 = "Hello! How are you?";
output.textContent = string1;
// Note - whether you use 'single' or "double" quotes is a personal preference - try to be consistent

/* STEP 2: Escaping Characters */
var string2 = "He said \"It's cold outside\"";

output.textContent = string2;
/* STEP 3: Concatenation */
output.textContent = string1 + " " + string2;
output.textContent = 20 + "20";

/* STEP 4: Numbers and Strings */
output.textContent = "ABC" + 30;

// numbers can be converted to strings
var num1 = 40;
var num2 = 50;
output.textContent = String(num1) + num2.toString() + 10;

// strings can be converted to numbers, too
var num3 = "20";
var num4 = Number(num3);
// and back again, if we want
num4 = String(num4);
output.textContent = typeof(num4);