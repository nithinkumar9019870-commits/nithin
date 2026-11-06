const form = document.querySelector("#marriage-form");
const firstNameInput = document.querySelector("#first-name");
const secondNameInput = document.querySelector("#second-name");
const result = document.querySelector("#result");
const scoreOutput = document.querySelector("#score");
const meter = document.querySelector(".meter");
const meterFill = document.querySelector("#meter-fill");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");
const tryAgainButton = document.querySelector("#try-again");

function getPredictionScore(firstName, secondName) {
  const names = [firstName.trim().toLocaleLowerCase(), secondName.trim().toLocaleLowerCase()].sort();
  const pair = `${names[0]}|${names[1]}`;
  let hash = 2166136261;

  for (const character of pair) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) % 100 + 1;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  firstNameInput.value = firstNameInput.value.trim();
  secondNameInput.value = secondNameInput.value.trim();

  if (!form.reportValidity()) {
    return;
  }

  const score = getPredictionScore(firstNameInput.value, secondNameInput.value);
  const isPromising = score >= 50;

  scoreOutput.textContent = score;
  meter.setAttribute("aria-valuenow", score);
  resultTitle.textContent = isPromising ? "Looks like a YES! 💍" : "Not fixed just yet…";
  resultMessage.textContent = isPromising
    ? "The wedding vibes are looking bright! Remember, the best plans are made together."
    : "Maybe the story is still unfolding. The real answer is yours to discover together.";
  result.hidden = false;
  meterFill.style.width = `${score}%`;
});

for (const input of [firstNameInput, secondNameInput]) {
  input.addEventListener("input", () => {
    input.setCustomValidity(input.value.trim() ? "" : "Please enter a name.");
  });
}

tryAgainButton.addEventListener("click", () => {
  result.hidden = true;
  meterFill.style.width = "0";
  meter.removeAttribute("aria-valuenow");
  firstNameInput.value = "";
  secondNameInput.value = "";
  firstNameInput.focus();
});
