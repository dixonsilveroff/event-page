let time = document.getElementById("current-time");
let counter = 0;
let form = document.getElementById("registrationForm");
let submissionCounter = document.getElementById("submissionCounter");
let modal = document.getElementById("modal");

let updateTime = () => {
  const now = new Date();
  const utcTime = now.toUTCString();

  time.textContent = `${utcTime}`;
};

setInterval(updateTime, 1000);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());
  fetch(
    "https://script.google.com/macros/s/AKfycbz13rH1ZbXY8no_TKSsDlju2xcB818D8a9_QVTZc9rgKbfuFS5d7qL036nkmrLxvBe7/exec",
    {
      method: "POST",
      body: JSON.stringify(value),
    }
  )
    .then((response) => response.json())
    .then(() => {
      modal.setAttribute("class", "modal");
      modal.textContent = "Success, You're registered!";
      setTimeout(() => {
        modal.setAttribute("class", "modal-hidden");
      }, 7000);
      counter++;
      submissionCounter.innerText = `${counter} Going`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
