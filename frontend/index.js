const categories = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "SQL" }
];

const categoriesList = document.getElementById("categories");

categories.forEach(category => {
    const listItem = document.createElement("li");

    listItem.textContent = category.name;

    categoriesList.appendChild(listItem);
});