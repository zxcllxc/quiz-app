fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
        const categoriesList = document.getElementById("categories");

        categories.forEach(category => {
            const listItem = document.createElement("li");

            listItem.textContent = category.name;

            categoriesList.appendChild(listItem);
        });
    });