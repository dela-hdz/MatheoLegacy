const textBanner = document.getElementById("title-textBanner")

// TODO: move it putside of main template
textBanner.textContent = "Operación entero con fracción"


// logic for hamMenu
const hamMenu = document.getElementById("hamMenu")
const hamOpen = document.getElementById("hamOpen")
const hamClose = document.getElementById("hamClose")

hamOpen.addEventListener("click", () => {
    hamMenu.classList.add("open");
});

hamClose.addEventListener("click", () => {
    hamMenu.classList.remove("open");
});
// Close when clicking outside
document.addEventListener("click", (event) => {
    const clickedInsideMenu = hamMenu.contains(event.target);
    const clickedOpenButton = hamOpen.contains(event.target);

    if (!clickedInsideMenu && !clickedOpenButton) {
        hamMenu.classList.remove("open");
    }
});


// LIMIT SIZE OF INPUT IN INPUT BOXES
document.querySelectorAll('.input-box').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.length > 4) {
            input.value = input.value.slice(0, 4);
        }
    });
});


// warning msg
function showError(message) {
    const errorDiv = document.querySelector(".error-msg");
    const errorSpan = errorDiv.querySelector("span");

    errorSpan.textContent = `Error: ${message}`;
    // errorDiv.style.display = "block";
    errorDiv.style.visibility = "visible";
}
function hideError() {
    const errorDiv = document.querySelector(".error-msg");
    // errorDiv.style.display = "none";
    errorDiv.style.visibility = "hidden";
}


// HIDE RESULT ZONE TO LOAD CONTENT
// function toggleResultZone(show) {
//     const resultZone = document.querySelector('.RESULT-ZONE');

//     if (!resultZone) return;

//     resultZone.style.display = show ? 'flex' : 'none';
// }
/*
    // Show it
    toggleResultZone(true);

    // Hide it
    toggleResultZone(false);
*/


// SHOW RESULT-ZONE OR EXPLAIN-ZONE
document.addEventListener("DOMContentLoaded", () => {
    const resultRadio = document.getElementById("show-result");
    const operationsRadio = document.getElementById("show-operations");

    const resultZone = document.querySelector(".RESULT-ZONE");
    const explainZone = document.querySelector(".EXPLAIN-ZONE");

    function updateOutput() {
        if (resultRadio.checked) {
            resultZone.style.display = "flex";
            explainZone.style.display = "none";
        }

        if (operationsRadio.checked) {
            resultZone.style.display = "none";
            explainZone.style.display = "flex";
        }
    }

    // Listen for changes
    resultRadio.addEventListener("change", updateOutput);
    operationsRadio.addEventListener("change", updateOutput);
});











// TODO: move as module
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
        showError("Numero entero no valido o vacio.");
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
        showError("Numerador no valido o vacio.");
        return;
    }


    // Validate "denominator"
    if (
        !positiveRegex.test(denominator) ||
        denominator.length > 4 ||
        denominator === "" ||
        Number(denominator) === 0
    ) {
        showError("Denominador no valido o vacio.");
        return;
    }

    
    // hide previous warnings
    hideError();


    // Transform Strings still as numbers
    number = Number(number)
    numerator = Number(numerator)
    denominator = Number(denominator)


    // call functions
    showResult(number, numerator, denominator)

    fillGuideContent(number, numerator, denominator)

    // show result zone
    // toggleResultZone(true);

}










// reorganize later
function showResult(number, numerator, denominator) {

    // Convert values
    // number = Number(number)
    // numerator = Number(numerator)
    // denominator = Number(denominator)

    // Select div
    const resultZone = document.querySelector(".RESULT-ZONE")

    // Create result
    const resultNumerator = (number * denominator) + numerator

    // Write normal HTML text
    resultZone.innerHTML = `
        <p class="math-line">
            <span id="formula1"></span>
        </p>

        <p class="math-line">
            <span id="formula2"></span>
        </p>
    `

    // Render FIRST formula
    katex.render(
        `${number} + \\frac{${numerator}}{${denominator}}
        =
        \\frac{
            (${number} \\times ${denominator}) + ${numerator}
        }{${denominator}}`,
        document.getElementById("formula1"),
        {
            throwOnError: false
        }
    )

    // Render SECOND formula
    katex.render(
        `\\frac{${resultNumerator}}{${denominator}}`,
        document.getElementById("formula2"),
        {
            throwOnError: false
        }
    )
}







// Load generic explaination
const exampleContent = document.getElementById("EXAMPLE-CONTENT");

// with a protection of a double loaded
if (!exampleContent.dataset.loaded) {

    exampleContent.innerHTML = `
		<p>
			Para sumar un número entero con una fracción, necesitamos multiplicar el número entero por el denominador y después sumarle el numerador:
		</p>

        <br>
		<p>Disección:</p>

		<p class="math-line">
			<span id="formula1"></span>
		</p>

        <br>
		<p>
			Imaginemos que tenemos una operación:
		</p>

		<p class="math-line">
			<span id="formula2"></span>
		</p>

		<p>
			Lo que tenemos que hacer es multiplicar 
			<span id="formulaA"></span>
			con 
			<span id="formulaC"></span>
			para después sumar el resultado con 
			<span id="formulaB"></span>:
		</p>

		<p class="math-line">
			<span id="formula3"></span>
		</p>
	`;

    katex.render("Entero + \\frac{Numerador}{denominador}", document.getElementById("formula1"));

    katex.render("A + \\frac{B}{C}", document.getElementById("formula2"));

    katex.render("A", document.getElementById("formulaA"));

    katex.render("C", document.getElementById("formulaC"));

    katex.render("B", document.getElementById("formulaB"));

    katex.render("A + \\frac{B}{C} = \\frac{(A \\cdot C) + B}{C}",document.getElementById("formula3"));

    exampleContent.dataset.loaded = "true";
}


// Load guide content
// const guideContent = document.getElementById("GUIDE-CONTENT");

// call to rewrite
function fillGuideContent(var1, var2, var3) {
    const number = Number(var1);
    const numerator = Number(var2);
    const denominator = Number(var3);

    // Select id
    const guideContent = document.getElementById("GUIDE-CONTENT");

    // Write HTML text
    guideContent.innerHTML = `
		<p class="math-line">
			<span id="guideFormula1"></span>
		</p>

		<p class="math-line">
			<span id="guideFormula2"></span>
		</p>

		<p class="math-line">
			<span id="guideFormula3"></span>
		</p>
	`;

    // Formulas
    katex.render(
        `${number} + \\frac{${numerator}}{${denominator}} = \\frac{(${number} \\cdot ${denominator}) + ${numerator}}{${denominator}}`,
        document.getElementById("guideFormula1")
    );

    katex.render(
        `= \\frac{${number * denominator} + ${numerator}}{${denominator}}`,
        document.getElementById("guideFormula2")
    );

    katex.render(
        `= \\frac{${(number * denominator) + numerator}}{${denominator}}`,
        document.getElementById("guideFormula3")
    );
}


// hide or show EXAMPLE-CONTEN GUIDE-CONTENT
document.addEventListener("DOMContentLoaded", () => {

    // EXAMPLE-CONTENT toggle
    const exampleBtn = document.querySelector(".toggle-explain-zone");
    const exampleContent = document.getElementById("EXAMPLE-CONTENT");
    const exampleArrow = exampleBtn.querySelector("img");

    exampleBtn.addEventListener("click", () => {
        if (exampleContent.style.display === "none" || exampleContent.style.display === "") {
            exampleContent.style.display = "block";
            exampleArrow.style.transform = "rotate(180deg)";
        } else {
            exampleContent.style.display = "none";
            exampleArrow.style.transform = "rotate(0deg)";
        }
    });


    // GUIDE-CONTENT toggle
    const guideBtn = document.querySelector(".toggle-guide-zone");
    const guideContent = document.getElementById("GUIDE-CONTENT");
    const guideArrow = guideBtn.querySelector("img");

    guideBtn.addEventListener("click", () => {
        if (guideContent.style.display === "none" || guideContent.style.display === "") {
            guideContent.style.display = "block";
            guideArrow.style.transform = "rotate(180deg)";
        } else {
            guideContent.style.display = "none";
            guideArrow.style.transform = "rotate(0deg)";
        }
    });

});
