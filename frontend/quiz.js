const questions = [
    {
        question: "Which language is mainly used to style web pages?",

        answers: [
            "HTML",
            "CSS",
            "Python",
            "SQL"
        ]
    },

    {
        question: "Which language adds interactivity to web pages?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ]
    },

    {
        question: "Which technology is used to store data?",

        answers: [
            "HTML",
            "CSS",
            "PostgreSQL",
            "Figma"
        ]
    }
];


let currentQuestionIndex = 0;

let selectedAnswers = [];

let selectedAnswer = null;


// HTML elements

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextButton =
    document.getElementById("nextBtn");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const selectedInfo =
    document.getElementById("selectedInfo");

const quizCard =
    document.querySelector(".quiz-card");

const resultCard =
    document.getElementById("result");

const resultAnswers =
    document.getElementById("resultAnswers");

const restartButton =
    document.getElementById("restartBtn");


// Total questions

totalQuestions.textContent = questions.length;


// Show question

function renderQuestion() {

    const question =
        questions[currentQuestionIndex];


    questionElement.textContent =
        question.question;


    questionNumber.textContent =
        currentQuestionIndex + 1;


    answersElement.innerHTML = "";


    selectedAnswer =
        selectedAnswers[currentQuestionIndex] ?? null;


    if (selectedAnswer !== null) {

        selectedInfo.textContent =
            `Selected answer: ${selectedAnswer + 1}`;

        nextButton.disabled = false;

    } else {

        selectedInfo.textContent =
            "Choose an answer";

        nextButton.disabled = true;
    }


    question.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");


        button.className = "answer";


        button.innerHTML = `
            <span class="answer-number">
                ${index + 1}
            </span>

            <span>
                ${answer}
            </span>
        `;


        // Если ответ уже был выбран

        if (selectedAnswer === index) {

            button.classList.add("selected");
        }


        // Click answer

        button.addEventListener("click", function () {

            const allAnswers =
                document.querySelectorAll(".answer");


            allAnswers.forEach(function (item) {

                item.classList.remove("selected");
            });


            button.classList.add("selected");


            selectedAnswer = index;


            selectedAnswers[currentQuestionIndex] =
                index;


            selectedInfo.textContent =
                `Selected answer: ${index + 1}`;


            nextButton.disabled = false;


            console.log(
                "Selected answer:",
                index + 1
            );


            console.log(
                "Answers array:",
                selectedAnswers
            );
        });


        answersElement.appendChild(button);
    });
}


// Next button

nextButton.addEventListener("click", function () {

    if (selectedAnswer === null) {
        return;
    }


    if (currentQuestionIndex < questions.length - 1) {

        currentQuestionIndex++;

        renderQuestion();

    } else {

        showResult();
    }

});


// Result

function showResult() {

    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");


    resultAnswers.textContent =
        selectedAnswers.length;


    console.log(
        "Quiz finished!"
    );


    console.log(
        "Final answers:",
        selectedAnswers
    );
}


// Restart

restartButton.addEventListener("click", function () {

    currentQuestionIndex = 0;

    selectedAnswers = [];

    selectedAnswer = null;


    quizCard.classList.remove("hidden");

    resultCard.classList.add("hidden");


    renderQuestion();
});


// Start quiz

renderQuestion();
