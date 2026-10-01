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

  if (categoryId) {
    const filteredQuizzes = quizzes.filter(
      (quiz) => quiz.categoryId === Number(categoryId),
    );

    return res.json(filteredQuizzes);
  }

  res.json(quizzes);
});

app.get("/api/quizzes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quiz = quizzes.find((quiz) => quiz.id === id);

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  const quizWithoutAnswers = {
    ...quiz,
    questions: quiz.questions.map(({ correctAnswer, ...question }) => question),
  };

  res.json(quizWithoutAnswers);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
