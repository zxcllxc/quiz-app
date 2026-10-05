const quizButtons = document.getElementById("quiz-buttons");
const leaderboard = document.getElementById("leaderboard");
const topPlayers = document.getElementById("top-players");

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
    topPlayers.innerHTML = "";

    fetch(`/api/quizzes/${quizId}/leaderboard`)
        .then(response => response.json())
        .then(results => {
            leaderboard.innerHTML = "";

            if (results.length === 0) {
                leaderboard.innerHTML = "<p>No results yet</p>";
                return;
            }

            results.slice(0, 3).forEach((result, index) => {
                const player = document.createElement("div");

                player.className = "top-player";

                player.innerHTML = `
                    <div class="top-place">${index + 1} PLACE</div>
                    <h3>${result.nickname}</h3>
                    <div class="top-score">
                        <strong>${result.score}</strong> / ${result.total}
                    </div>
                `;

                topPlayers.appendChild(player);
            });

            results.slice(3).forEach((result, index) => {
                const row = document.createElement("div");

                row.className = "ranking-row";

                row.innerHTML = `
                    <div class="rank-number">${index + 4}</div>
                    <div class="player">${result.nickname}</div>
                    <div class="score">${result.score}/${result.total}</div>
                `;

                leaderboard.appendChild(row);
            });
        })
        .catch(() => {
            topPlayers.innerHTML = "";
            leaderboard.innerHTML = "<p>No results yet</p>";
        });
}

loadQuizzes();
loadLeaderboard();