/*
    Main function, this evaluates the inputs before, then call other functions to
*/

function validateInputs() {
    // Get values from HTML inputs by ID
    let number = document.getElementById("number").value;
    let numerator = document.getElementById("numerator").value;
    let denominator = document.getElementById("denominator").value;

    // Convert to strings
    number = String(number);
    numerator = String(numerator);
    denominator = String(denominator);


    // Validate "number"
    const numberRegex = /^-?\d+$/;

    if (
        !numberRegex.test(number) ||
        number.length > 4 ||
        number === "" ||
        Number(number) === 0
    ) {
        showError("Numero entero no valido.");
        return;
    }


    // Validate "numerator"
    const positiveRegex = /^\d+$/;

    if (
        !positiveRegex.test(numerator) ||
        numerator.length > 4 ||
        numerator === "" ||
        Number(numerator) === 0
    ) {
        showError("Numerador no valido.");
        return;
    }


    // Validate "denominator"
    if (
        !positiveRegex.test(denominator) ||
        denominator.length > 4 ||
        denominator === "" ||
        Number(denominator) === 0
    ) {
        showError("Denominador no valido.");
        return;
    }

    
    // hide previous warnings
    hideError();


    // Transform Strings still as numbers

}