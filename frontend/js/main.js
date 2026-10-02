const difficultyButtons = document.querySelectorAll(".difficulty-options .option");
const questionButtons = document.querySelectorAll(".criteria-group:nth-child(2) .option");

const topicInput = document.getElementById("topic");
const startButton = document.querySelector(".generate-button");

let selectedDifficulty = "Easy";
let selectedQuestions = 5;

difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        difficultyButtons.forEach(button => {
            button.classList.remove("active");
        });

        button.classList.add("active");
        selectedDifficulty = button.textContent;
    });
});

questionButtons.forEach(button => {
    button.addEventListener("click", () => {
        questionButtons.forEach(button => {
            button.classList.remove("active");
        });

        button.classList.add("active");
        selectedQuestions = Number(button.textContent);
    });
});

startButton.addEventListener("click", () => {
    const topic = topicInput.value.trim();

    if (topic === "") {
        alert("Please enter a quiz topic.");
        return;
    }

    console.log("Topic:", topic);
    console.log("Difficulty:", selectedDifficulty);
    console.log("Questions:", selectedQuestions);
});
