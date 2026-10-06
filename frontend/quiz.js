const id = new URLSearchParams(window.location.search).get("id");

let quiz;
let currentQuestion = 0;
let answers = [];
let selectedOption = null;
let timeLeft = 0;
let timer;
let nickname = "";

const startCard = document.getElementById("startCard");
const quizCard = document.getElementById("quizCard");
const result = document.getElementById("result");

const quizTitle = document.getElementById("quizTitle");
const nicknameInput = document.getElementById("nicknameInput");
const startButton = document.getElementById("startButton");

const question = document.getElementById("question");
const answersBox = document.getElementById("answers");
const questionNumber = document.getElementById("questionNumber");

const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("nextButton");
const selectedInfo = document.getElementById("selectedInfo");

const resultScore = document.getElementById("resultScore");
const resultDetails = document.getElementById("resultDetails");

const leaderboardButton = document.getElementById("leaderboardButton");
const homeButton = document.getElementById("homeButton");


async function loadQuiz() {
    const response = await fetch(`/api/quizzes/${id}`);
    quiz = await response.json();

    quizTitle.textContent = quiz.title;
    document.title = quiz.title;

    questionNumber.textContent = `1 / ${quiz.questions.length}`;
    timeLeft = quiz.timeLimitSec;
}


function startQuiz() {
    nickname = nicknameInput.value.trim();

    if (!nickname) {
        nicknameInput.focus();
        return;
    }

    startCard.classList.add("hidden");
    quizCard.classList.remove("hidden");

    currentQuestion = 0;
    answers = [];

    showQuestion();
    startTimer();
}


function showQuestion() {
    const q = quiz.questions[currentQuestion];

    question.textContent = q.text;

    questionNumber.textContent =
        `${currentQuestion + 1} / ${quiz.questions.length}`;

    answersBox.innerHTML = "";
    selectedOption = null;

    nextButton.disabled = true;
    selectedInfo.textContent = "Choose an answer";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = `${index + 1}. ${option}`;

        button.onclick = () => {
            selectedOption = index;

            document.querySelectorAll(".answer").forEach(button => {
                button.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedInfo.textContent = "Answer selected";
            nextButton.disabled = false;
        };

        answersBox.appendChild(button);
    });
}


function saveAnswer() {
    const q = quiz.questions[currentQuestion];

    answers.push({
        questionId: q.id,
        optionIndex: selectedOption
    });
}


function nextQuestion() {
    if (selectedOption === null) {
        return;
    }

    saveAnswer();

    if (currentQuestion < quiz.questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
}


function startTimer() {
    timer = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
}


async function finishQuiz() {
    clearInterval(timer);

    const response = await fetch(`/api/quizzes/${id}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: nickname,
            answers: answers
        })
    });

    const data = await response.json();

    showResult(data);
}


function showResult(data) {
    quizCard.classList.add("hidden");
    result.classList.remove("hidden");

    resultScore.textContent = `${data.score} / ${data.total}`;

    resultDetails.innerHTML = "";

    data.review.forEach((item, index) => {
        const q = quiz.questions.find(q => q.id === item.questionId);

        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>${index + 1}. ${q.text}</strong></p>
            <p>Your answer: ${
                item.yourIndex === null
                    ? "No answer"
                    : q.options[item.yourIndex]
            }</p>
            <p>Correct answer: ${q.options[item.correctIndex]}</p>
        `;

        resultDetails.appendChild(div);
    });
}


startButton.onclick = startQuiz;
nextButton.onclick = nextQuestion;

nicknameInput.onkeydown = event => {
    if (event.key === "Enter") {
        startQuiz();
    }
};

leaderboardButton.onclick = () => {
    window.location.href = `leaderboard.html?quizId=${id}`;
};

homeButton.onclick = () => {
    window.location.href = "index.html";
};


loadQuiz();
