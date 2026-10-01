import express from "express";

const app = express();

app.use(express.json());
const quizzes = [
  {
    id: 1,
    categoryId: 1,
    title: "JavaScript Basics",
  },
  {
    id: 2,
    categoryId: 2,
    title: "SQL Basics",
  },
];

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
      (quiz) => quiz.categoryId === Number(categoryId)
    );

    return res.json(filteredQuizzes);
  }

  res.json(quizzes);
});

app.get("/api/quizzes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quiz = quizzes.find((quiz) => quiz.id === id);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  res.json(quiz);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
