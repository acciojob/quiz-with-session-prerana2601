document.addEventListener("DOMContentLoaded", function() {
    loadProgress();

    const questions = document.querySelectorAll('input[type="radio"]');
    questions.forEach(question => {
        question.addEventListener('change', saveProgress);
    });

    document.getElementById('submit').addEventListener('click', function() {
        const score = calculateScore();
        document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem('score', score);
    });
});

function saveProgress() {
    const progress = {};
    const questions = document.querySelectorAll('input[type="radio"]');
    questions.forEach(question => {
        if (question.checked) {
            progress[question.name] = question.value;
        }
    });
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = JSON.parse(sessionStorage.getItem('progress') || '{}');
    const questions = document.querySelectorAll('input[type="radio"]');
    questions.forEach(question => {
        if (progress[question.name] === question.value) {
            question.checked = true;
        }
    });
}

function calculateScore() {
    const answers = {
        "q1": "B", // Paris
        "q2": "C", // 8
        "q3": "B", // Einstein
        "q4": "A", // H2O
        "q5": "B"  // Jupiter
    };

    let score = 0;
    const questions = document.querySelectorAll('input[type="radio"]');
    questions.forEach(question => {
        if (question.checked && question.value === answers[question.name]) {
            score++;
        }
    });
    return score;
}

// Display previous score on page load
if (localStorage.getItem('score')) {
    document.getElementById('score').textContent = `Your previous score is ${localStorage.getItem('score')} out of 5.`;
}