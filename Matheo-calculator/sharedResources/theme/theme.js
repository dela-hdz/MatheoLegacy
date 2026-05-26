document.addEventListener("DOMContentLoaded", () => {
    const light = document.getElementById("mode-light");
    const dark = document.getElementById("mode-dark");

    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === "dark") {
            root.classList.add("darkmode");
        } else {
            root.classList.remove("darkmode");
        }
        localStorage.setItem("theme", theme);
    }

    const saved = localStorage.getItem("theme") || "light";

    if (dark && light) {
        dark.checked = saved === "dark";
        light.checked = saved === "light";

        light.addEventListener("change", () => applyTheme("light"));
        dark.addEventListener("change", () => applyTheme("dark"));
    }

    applyTheme(saved);
});