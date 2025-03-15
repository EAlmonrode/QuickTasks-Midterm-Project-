const API_URL = "http://127.0.0.1:8000/tasks";

// Fetch and display tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
}

// Add a new task
async function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    if (!taskInput) return;

    const newTask = { id: Date.now(), title: taskInput, completed: false };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
    });

    document.getElementById("taskInput").value = "";
    fetchTasks();
}

// Delete a task
async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    fetchTasks();
}

// Toggle complete status
async function toggleComplete(taskId, title, completed) {
    await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, title, completed: !completed })
    });

    fetchTasks();
}

// Render the tasks list
function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.title}
            </span>
            <button onclick="toggleComplete(${task.id}, '${task.title}', ${task.completed})">
                ${task.completed ? "Undo" : "Complete"}
            </button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Load tasks when the page loads
fetchTasks();
