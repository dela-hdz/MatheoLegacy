const textBanner = document.getElementById("title-textBanner")

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

