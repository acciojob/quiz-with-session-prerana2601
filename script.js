document.addEventListener("DOMContentLoaded", () => {
  loadProgress();

  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    radio.addEventListener("change", saveProgress);
  });

  document.getElementById("submit").addEventListener("click", () => {
    const correctAnswers = {
      q1: "B", // Paris
      q2: "C", // 8
      q3: "B", // Einstein
      q4: "A", // H2O
      q5: "B"  // Jupiter
    };

    let score = 0;

    for (let key in correctAnswers) {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === correctAnswers[key]) {
        score++;
      }
    }

    const scoreText = `Your score is ${score} out of 5.`;
    document.getElementById("score").textContent = scoreText;
    localStorage.setItem("score", score);
  });

  // Show previous score if available
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    document.getElementById("score").textContent = `Your previous score is ${savedScore} out of 5.`;
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
