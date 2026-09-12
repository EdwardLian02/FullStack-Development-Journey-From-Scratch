
let equation = "";
let displayEl = document.getElementById('js-display');
displayRendering("0");

function clearText(){
    console.log("CLEARRRRR");
    equation = "";

    displayRendering("0");
}
function calculate(){
    const result = eval(equation);
    displayRendering(result)
     console.log(result);
}

function formatEq(value){
    equation += value;
    displayRendering(equation);
    console.log(equation);    
}

function displayRendering(renderText){
    displayEl.innerHTML = renderText;
}
