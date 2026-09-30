# Quiz App — API Contract (v1)

Base URL: `http://localhost:3000/api`
All bodies are JSON. Errors: `{ "error": "message" }` with 400 / 401 / 404 / 500.

## Public

### GET /categories
200 → `[{ "id": 1, "name": "JavaScript" }]`

### GET /quizzes?categoryId=1
200 → `[{ "id": 3, "title": "JS Basics", "categoryId": 1, "timeLimitSec": 120 }]`

### GET /quizzes/:id
Correct answers are NOT included.
200 →
```json
{
  "id": 3, "title": "JS Basics", "timeLimitSec": 120,
  "questions": [
    { "id": 10, "text": "typeof null?", "options": ["null", "object", "undefined", "number"] }
  ]
}
```

### POST /quizzes/:id/submit
Body:
```json
{ "nickname": "Doni", "answers": [{ "questionId": 10, "optionIndex": 1 }] }
```
Unanswered question → omit it or send `"optionIndex": null`.
200 →
```json
{
  "score": 4, "total": 5,
  "review": [{ "questionId": 10, "yourIndex": 1, "correctIndex": 1 }]
}
```
400 if nickname is empty or longer than 20 chars.

### GET /quizzes/:id/leaderboard
Top 10, sorted by score DESC, then earliest first.
200 → `[{ "nickname": "Doni", "score": 4, "total": 5, "createdAt": "2026-10-01T10:00:00Z" }]`

## Admin (header `x-admin-key: <ADMIN_KEY>`, otherwise 401)

### POST /categories
Body `{ "name": "SQL" }` → 201 `{ "id": 2, "name": "SQL" }`

### POST /quizzes
Body `{ "title": "SQL Basics", "categoryId": 2, "timeLimitSec": 90 }` → 201 `{ "id": 4, ... }`

### POST /quizzes/:id/questions
Body `{ "text": "...", "options": ["a","b","c","d"], "correctIndex": 2 }` → 201 `{ "id": 11 }`
400 if options.length !== 4 or correctIndex not in 0..3.
