// Data
const tasks = [
    {text: "", color: "red", isComplete: false}
];
const categories = [
    {
        name: "Priority 1",
        color: "red"
    },
    {
        name: "Priority 2",
        color: "blue"
    },
    {
        name: "Priority 3",
        color: "green"
    }
];

// Page content
const main = document.querySelector("main"); // Parent element of all tasks
const newTask = document.querySelector("#new-task");
const options = document.querySelector("#options");
options.classList.add("hidden"); // Keep menu hidden first

// Set priorities
categories.forEach((item, index) => {
    const category = document.createElement("div");
    category.classList.add("option");
    category.dataset.index = index;
    category.textContent = item.name;
    category.style.color = item.color;
    options.appendChild(category);
});

// Render Tasks
function render(removeIndex) {
    // Save text: Iterate through each "task" element of main
    const taskElement = main.querySelectorAll(".task");
    taskElement.forEach((item, index) => {
        tasks[index].text = item.querySelector("input").value.trim();
    });

    // Remove item from list
    if (removeIndex) {
        tasks.splice(removeIndex, 1);
    }

    // Clear html of tasks 
    main.innerHTML = "";

    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            /* Create smaller elements */
            // Create check off
            const checkOff = document.createElement("div");
            if (item.isComplete) {
                checkOff.classList.add("category");
                checkOff.classList.add("complete");
                checkOff.style.borderColor = item.color;
                checkOff.style.backgroundColor = item.color;
            } else {
                checkOff.classList.add("category");
                checkOff.style.borderColor = item.color;
            }

            // Create text element
            const inputText = document.createElement("input");
            inputText.value = item.text;
            inputText.placeholder = "Task here";

            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            // Create parent task element "item"
            const task = document.createElement("div");
            task.dataset.index = index;
            task.classList.add("task");

            // Merge elements under parent div
            task.appendChild(checkOff);
            task.appendChild(inputText);
            task.appendChild(deleteButton);

            // Add new task to main element
            main.appendChild(task);
        });
    }
}

render();

// Add new task
newTask.addEventListener("click", () => {
    options.classList.toggle("hidden");
});

// Check which option was clicked
options.addEventListener("click", (e) => {
    const optionIndex = e.target.dataset.index;
    tasks.push({text: "", color: categories[optionIndex].color, isComplete: false});
    options.classList.add("hidden");
    render();
});

// Listen for check offs
main.addEventListener("click", (e) => {
    if (e.target.classList.contains("category")) {
        const taskIndex = e.target.parentElement.dataset.index;
        tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
        render();
    }
});

// Listen for deletes
main.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        render(e.target.parentElement.dataset.index);
    }
});