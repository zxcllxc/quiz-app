import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.static("../frontend"));

const quizzesFilePath = new URL("./data/quizzes.json", import.meta.url);
const quizzes = JSON.parse(fs.readFileSync(quizzesFilePath, "utf-8"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/categories", (req, res) => {
  const categories = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "SQL" },
  ];

  res.json(categories);
});

app.get("/api/quizzes", (req, res) => {
  const categoryId = req.query.categoryId;
  let quizzesForList = quizzes;

  if (categoryId) {
    quizzesForList = quizzes.filter(
      (quiz) => quiz.categoryId === Number(categoryId),
    );
  }

  const quizList = quizzesForList.map(
    ({ id, title, categoryId, timeLimitSec }) => ({
      id,
      title,
      categoryId,
      timeLimitSec,
    }),
  );

  res.json(quizList);
});

app.get("/api/quizzes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quiz = quizzes.find((quiz) => quiz.id === id);

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  const quizWithoutAnswers = {
    ...quiz,
    questions: quiz.questions.map(({ correctIndex, ...question }) => question),
  };

  res.json(quizWithoutAnswers);
});

app.post("/api/quizzes/:quizId/submit", (req, res) => {
  const quizId = Number(req.params.quizId);
  const quiz = quizzes.find((quiz) => quiz.id === quizId);

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  const answers = req.body.answers || [];

  for (const answer of answers) {
    const questionId = Number(answer.questionId);
    const question = quiz.questions.find((question) => question.id === questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
  }

  const results = answers.map((answer) => {
    const questionId = Number(answer.questionId);
    const userOptionIndex = Number(answer.optionIndex);
    const question = quiz.questions.find((question) => question.id === questionId);

    return {
      questionId,
      userOptionIndex,
      correctOptionIndex: question.correctIndex,
    };
  });

  const score = results.filter(
    (result) => result.userOptionIndex === result.correctOptionIndex,
  ).length;

  res.json({
    score,
    total: answers.length,
    results,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
