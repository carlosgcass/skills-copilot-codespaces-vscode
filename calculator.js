//Create a calculator app in javascript using html where the user enter two parmeters with the math funtion
//and the result is displayed back to the user

var firstNumber = document.getElementById("firstNumber");
var secondNumber = document.getElementById("secondNumber");
var result = document.getElementById("result");
var add = document.getElementById("add");
var subtract = document.getElementById("subtract");
var multiply = document.getElementById("multiply");
var divide = document.getElementById("divide");

//addition
add.addEventListener("click", function(){
  result.innerHTML = parseInt(firstNumber.value) + parseInt(secondNumber.value);
});

//subtraction
subtract.addEventListener("click", function(){
  result.innerHTML = parseInt(firstNumber.value) - parseInt(secondNumber.value);
});

//multiplication
multiply.addEventListener("click", function(){
  result.innerHTML = parseInt(firstNumber.value) * parseInt(secondNumber.value);
});

//division
divide.addEventListener("click", function(){
  result.innerHTML = parseInt(firstNumber.value) / parseInt(secondNumber.value);
});