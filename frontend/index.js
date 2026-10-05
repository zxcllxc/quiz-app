const categoriesList = document.getElementById("categories");

function loadCategories() {
    categoriesList.innerHTML = "<p>Loading categories...</p>";

    fetch("/api/categories")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load categories");
            }

            return response.json();
        })
        .then(categories => {
            categoriesList.innerHTML = "";

            if (categories.length === 0) {
                categoriesList.innerHTML = "<p>No categories available yet.</p>";
                return;
            }

            categories.forEach(category => {
                const listItem = document.createElement("li");

                listItem.textContent = category.name;

                listItem.addEventListener("click", () => {
                    loadQuizzes(category.id, category.name);
                });

                categoriesList.appendChild(listItem);
            });
        })
        .catch(() => {
            categoriesList.innerHTML = "<p>Unable to load categories.</p>";
        });
}

function loadQuizzes(categoryId, categoryName) {
    categoriesList.innerHTML = "<p>Loading quizzes...</p>";

    fetch(`/api/quizzes?categoryId=${categoryId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load quizzes");
            }

            return response.json();
        })
        .then(quizzes => {
            categoriesList.innerHTML = "";

            const backButton = document.createElement("button");
            backButton.textContent = "← Back to categories";
            backButton.className = "category-back";
            backButton.addEventListener("click", loadCategories);

            categoriesList.appendChild(backButton);

            if (quizzes.length === 0) {
                const message = document.createElement("p");
                message.textContent = `No quizzes available in ${categoryName} yet.`;
                categoriesList.appendChild(message);
                return;
            }

            quizzes.forEach(quiz => {
                const quizLink = document.createElement("a");

                quizLink.href = `quiz.html?id=${quiz.id}`;
                quizLink.textContent = quiz.title;

                categoriesList.appendChild(quizLink);
            });
        })
        .catch(() => {
            categoriesList.innerHTML = "<p>Unable to load quizzes.</p>";
        });
}

loadCategories();