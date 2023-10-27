"use strict";
let input = document.querySelector(".input");
let calcDiv = document.querySelector("calculator");
let inputBoxDiv = document.querySelector("inputBoxDiv");
let lastA;
let lastB;
let eqxn;
let submitState = 0;

function chooseFunction() { //chooses a basic trignometric function (only sin and cos for now)
    let fns = ['sin', 'cos'];
    return fns[Math.round(Math.random())];
}

function chooseA() { //chooses variable "a" in rose and lemniscate equations
    lastA = Math.round(Math.random()*5);
    if (lastA == 0) {return ""}
    return lastA;
}

function chooseB() { //chooses B (and n) in r=a+bcostheta and r=acosbtheta
    lastB = 1 + Math.round(Math.random()*5);
    return lastB;
}

function chooseSign(onlyNegative) { //returns either + or - (will likely be removed)
    if (Math.random() < 0.5) {return "-"}
    if (onlyNegative) {return ""}
    return "+";
}

function randomLemniscate() { //generates a random polar equation for a lemniscate
    let b = chooseB();
    let a = chooseA();
    if (b == 1 && a == "") {
        return chooseSign(true) + chooseFunction() + "\u03B8";
    }

    if (b == 1) {
        return a + chooseSign() + chooseFunction() + "\u03B8";
    }

    if (a == "") {
        return chooseFunction() + b + "\u03B8";
    }

    return a + chooseSign() + b + chooseFunction() + "\u03B8";
}

function randomRose() { //generates a polar equation for a random rose
    let chooseB1 = chooseB();
    let chooseB2 = chooseB();
    if ((chooseB1 == 1 || chooseB1 == 0) && chooseB2 == 1) {
        return chooseFunction() + "\u03B8";
    }

    if (chooseB1 == 1 || chooseB1 == 0) {
        return chooseFunction() + chooseB2 + "\u03B8";
    }

    if (chooseB2 == 1) {
        return chooseB1 + chooseFunction() + "\u03B8";
    }

    return chooseB1 + chooseFunction() + chooseB2 + "\u03B8";
}

function chooseRandomFn() { //chooses a random polar function (currently roses (r=asinntheta/acosntheta) and lemniscates (r=a+bcostheta/a+bsintheta))
    if (Math.random() > 0.5) {return randomRose()}
    return randomLemniscate();
}

function stringLastX (strng, x) { //returns a substring of the last x characters of a string (e.g stringLastX("hello", 3) = "llo")
    return strng.substring(strng.length - x, strng.length)
}

//theta 12345
function formatInput() { //changes certain keywords (such as theta) to a symbol
    let last5 = stringLastX(input.value, 5);
    if (last5 == 'theta') {
        input.value = input.value.substring(0, input.value.length - 5) + "\u03B8";
    }
}

function writeFunction(inFxn) { //writes function in the syntax that desmos api requires
    let fn = "r=" + inFxn;
    if (fn.includes("cos")) {
        let cosIndex = fn.indexOf('cos');
        fn = fn.substring(0, cosIndex) + "\\" + fn.substring(cosIndex, fn.length);
    }

    if (fn.includes('sin')) {
        let sinIndex = fn.indexOf('sin');
        fn = fn.substring(0, sinIndex) + "\\" + fn.substring(sinIndex, fn.length);
    }

    if (fn.includes("\u03B8")) {
        let thetaIndex = fn.indexOf("\u03B8");
        fn = fn.substring(0, thetaIndex) + "\\theta" + fn.substring(thetaIndex + 1, fn.length);
    }

    while (fn.includes(" ")) {
        if (fn.includes(" ")) {
            let spaceIndex = fn.indexOf(" ");
            fn = fn.substring(0, fn.indexOf(" ")) + fn.substring(fn.indexOf(" ") + 1, fn.length);
        }
    }

    return fn;
}

var elt = document.querySelector('.calculator');
var calculator = Desmos.GraphingCalculator(elt, {keypad: false, expressions: false, polarMode: true, zoomButtons: true, lockViewport: false, autosize: false, settingsMenu: false});

function setCalcExpression() { //resets the desmos graphing calculator object and sets the equation to the equation stored by variable "eqxn"
    calculator.setBlank();
    calculator.setExpression({ id: 'graph1', latex: eqxn });
}

function newEqxn() { //changes the equation currently being graphed by the desmos window
    eqxn = writeFunction(chooseRandomFn());
    setCalcExpression();
    console.log(eqxn);
}
newEqxn();

function evaluateUserAnswer() { //determines whether a users answer is correct or not. if it is correct, it will first turn the equation green. then, when the user presses enter a second time, the graph and equation box will be reset
    if (writeFunction(input.value) == eqxn) {
        if (submitState == 0) {
            console.log("Correct!");
            input.style.color = '#2c8a17';
            submitState++;
        } else {
            input.value = "";
            input.style.color = "#000000";
            newEqxn();
            submitState = 0;
        }
    } else {
        input.style.color = '#fa0505';
    }
}

setCalcExpression();
input.addEventListener("input", formatInput); //detects when the users is typing in/changing the content of the textbox

input.addEventListener("keypress", function (key) { //listens for enter key being pressed 
    if (key.key == "Enter") {
        evaluateUserAnswer();
    } else {
        input.style.color = "#000000";
    }
});