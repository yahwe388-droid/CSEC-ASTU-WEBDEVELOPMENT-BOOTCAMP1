const statusText = document.querySelector("#status")
const toggleButton = document.querySelector("#toggleBtn")
let state = "OFF"

toggleButton.addEventListener("click", () => {
state = state === "OFF" ? "ON" : "OFF"
statusText.textContent = state
})
