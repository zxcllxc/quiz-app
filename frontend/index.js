    fetch('/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categoriesList = document.getElementById("categories");

            categories.forEach(category => {
                const listItem = document.createElement("li");

                listItem.textContent = category.name;

                listItem.addEventListener("click", () => {
                    fetch(`/api/quizzes?categoryId=${category.id}`)
                        .then(response => response.json())
                        .then(quizzes => {
                            categoriesList.innerHTML = "";

                            quizzes.forEach(quiz => {
                                const quizLink = document.createElement("a");

                                quizLink.href = `quiz.html?id=${quiz.id}`;
                                quizLink.textContent = quiz.title;

                                categoriesList.appendChild(quizLink);
                            });
                        });
                });

                categoriesList.appendChild(listItem);
            });
        });