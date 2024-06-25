// script.js

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("background-effect-container");
    const spanCount = 50; // Number of spans to generate

    for (let i = 0; i < spanCount; i++) {
        const span = document.createElement("span");
        span.style.setProperty("--i", i);
        container.appendChild(span);
    }
});
