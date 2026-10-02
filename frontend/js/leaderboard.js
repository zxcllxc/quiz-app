const quizButtons = document.getElementById("quiz-buttons");
const leaderboard = document.getElementById("leaderboard");

const params = new URLSearchParams(window.location.search);
let quizId = Number(params.get("quizId")) || 1;

function loadQuizzes() {
    fetch("/api/quizzes")
        .then(response => response.json())
        .then(quizzes => {
            quizButtons.innerHTML = "";

            quizzes.forEach(quiz => {
                const button = document.createElement("button");

                button.textContent = quiz.title;

                if (quiz.id === quizId) {
                    button.classList.add("active");
                }

                button.addEventListener("click", () => {
                    quizId = quiz.id;

                    window.history.pushState(
                        {},
                        "",
                        `leaderboard.html?quizId=${quizId}`
                    );

                    loadQuizzes();
                    loadLeaderboard();
                });

                quizButtons.appendChild(button);
            });
        });
}

function loadLeaderboard() {
    leaderboard.innerHTML = "<p>Loading...</p>";

    fetch(`/api/quizzes/${quizId}/leaderboard`)
        .then(response => response.json())
        .then(results => {
            leaderboard.innerHTML = "";

            if (results.length === 0) {
                leaderboard.innerHTML = "<p>No results yet</p>";
                return;
            }

            results.forEach((result, index) => {
                const row = document.createElement("div");

                row.className = "ranking-row";

                row.innerHTML = `
                    <div class="rank-number">${index + 1}</div>
                    <div class="player">${result.nickname}</div>
                    <div class="score">${result.score}/${result.total}</div>
                `;

                leaderboard.appendChild(row);
            });
        })
        .catch(() => {
            leaderboard.innerHTML = "<p>No results yet</p>";
        });
}

loadQuizzes();
loadLeaderboard();