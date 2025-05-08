document.addEventListener("DOMContentLoaded", function () {
  loadProgress();

  // Save answer when changed
  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    radio.addEventListener("change", saveProgress);
  });

  // On submit
  document.getElementById("submit").addEventListener("click", function () {
    const correctAnswers = {
      q1: "B",
      q2: "C",
      q3: "B",
      q4: "A",
      q5: "B"
    };

    let score = 0;
    for (let key in correctAnswers) {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === correctAnswers[key]) {
        score++;
      }
    }

    document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
  });

  // Show last score if exists
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    document.getElementById("score").textContent = `Your previous score is ${lastScore} out of 5.`;
  }
});

function saveProgress() {
  const progress = {};
  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    if (radio.checked) {
      progress[radio.name] = radio.value;
    }
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
  const saved = JSON.parse(sessionStorage.getItem("progress") || "{}");
  for (let name in saved) {
    const radio = document.querySelector(`input[name="${name}"][value="${saved[name]}"]`);
    if (radio) radio.checked = true;
  }
}
