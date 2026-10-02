const questionForm = document.querySelector("#question-form");

const questionInput = document.querySelector("#question");
const categoryInput = document.querySelector("#category");
const difficultyInput = document.querySelector("#difficulty");

const answerInputs = document.querySelectorAll(".answer-option input[type='text']");
const correctAnswerInputs = document.querySelectorAll("input[name='correct-answer']");

questionForm.addEventListener("submit", event => {
    event.preventDefault();

    const question = questionInput.value.trim();
    const category = categoryInput.value;
    const difficulty = difficultyInput.value;

    const answers = [];

    answerInputs.forEach(input => {
        answers.push(input.value.trim());
    });

    let correctAnswer = "";

    correctAnswerInputs.forEach(input => {
        if (input.checked) {
            correctAnswer = input.value;
        }
    });

    if (question === "") {
        alert("Please enter a question.");
        return;
    }

    if (category === "") {
        alert("Please select a category.");
        return;
    }

    if (difficulty === "") {
        alert("Please select a difficulty.");
        return;
    }

    if (answers.some(answer => answer === "")) {
        alert("Please fill in all answer options.");
        return;
    }

    if (correctAnswer === "") {
        alert("Please select the correct answer.");
        return;
    }

    console.log("Question:", question);
    console.log("Category:", category);
    console.log("Difficulty:", difficulty);
    console.log("Answers:", answers);
    console.log("Correct answer:", correctAnswer);

    questionForm.reset();

    alert("Question is ready to be added!");
});
