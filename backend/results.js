import express from "express";
import fs from "fs";

const router = express.Router();

const QUIZZES_FILE = "./data/quizzes.json";
const RESULTS_FILE = "./data/results.json";

function readJson(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

router.post("/quizzes/:id/submit", (req, res) => {
  const quizId = Number(req.params.id);
  const { nickname, answers } = req.body;

  if (!nickname || nickname.length > 20) {
    return res.status(400).json({ error: "Nickname must be 1-20 characters" });
  }

  const quiz = readJson(QUIZZES_FILE).find((q) => q.id === quizId);
  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  const userAnswers = answers || [];
  let score = 0;

  const review = quiz.questions.map((question) => {
    const answer = userAnswers.find((a) => a.questionId === question.id);
    const yourIndex = answer ? answer.optionIndex : null;
    if (yourIndex === question.correctIndex) score++;
    return {
      questionId: question.id,
      yourIndex,
      correctIndex: question.correctIndex,
    };
  });

  const total = quiz.questions.length;
  const results = readJson(RESULTS_FILE);
  results.push({
    quizId,
    nickname,
    score,
    total,
    createdAt: new Date().toISOString(),
  });
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));

  res.json({ score, total, review });
});

router.get("/quizzes/:id/leaderboard", (req, res) => {
  const quizId = Number(req.params.id);

  const top = readJson(RESULTS_FILE)
    .filter((r) => r.quizId === quizId)
    .sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt))
    .slice(0, 10)
    .map((r) => ({
      nickname: r.nickname,
      score: r.score,
      total: r.total,
      createdAt: r.createdAt,
    }));

  res.json(top);
});

export default router;
