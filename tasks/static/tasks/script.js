let tasks = [];
let taskId = 1;
let draggedTask = null;

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const themeText = document.getElementById("theme-text");

  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    themeText.textContent = "☀️ Light Mode";
  } else {
    body.setAttribute("data-theme", "light");
    themeText.textContent = "🌙 Dark Mode";
  }
}

// Form management
function showForm(status) {
  document.getElementById(`form-${status}`).classList.add("active");
}

function hideForm(status) {
  const form = document.getElementById(`form-${status}`);
  form.classList.remove("active");
  document.getElementById(`title-${status}`).value = "";
  document.getElementById(`desc-${status}`).value = "";
}

// Task management
function addTask(status) {
  const title = document.getElementById(`title-${status}`).value.trim();
  const desc = document.getElementById(`desc-${status}`).value.trim();

  if (!title) return;

  const task = {
    id: taskId++,
    title: title,
    description: desc,
    status: status,
  };

  tasks.push(task);
  hideForm(status);
  renderTasks();
}

function changeTaskStatus(taskId, newStatus) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = "task";
  div.draggable = true;
  div.dataset.taskId = task.id;

  div.innerHTML = `
                <button class="delete-btn" onclick="deleteTask(${
                  task.id
                })">×</button>
                <div class="task-title">${task.title}</div>
                ${
                  task.description
                    ? `<div class="task-desc">${task.description}</div>`
                    : ""
                }
                <div class="task-controls">
                    <select class="status-select" onchange="changeTaskStatus(${
                      task.id
                    }, this.value)">
                        <option value="todo" ${
                          task.status === "todo" ? "selected" : ""
                        }>📝 To Do</option>
                        <option value="doing" ${
                          task.status === "doing" ? "selected" : ""
                        }>🔄 Doing</option>
                        <option value="done" ${
                          task.status === "done" ? "selected" : ""
                        }>✅ Done</option>
                    </select>
                    <small style="color: var(--text); opacity: 0.6;">or drag to move</small>
                </div>
            `;

  div.addEventListener("dragstart", function (e) {
    draggedTask = task;
    this.classList.add("dragging");
  });

  div.addEventListener("dragend", function (e) {
    this.classList.remove("dragging");
    draggedTask = null;
  });

  return div;
}

function renderTasks() {
  ["todo", "doing", "done"].forEach((status) => {
      console.log('kkkkkkkkkkkkkkk')

    const container = document.getElementById(`tasks-${status}`);
    const statusTasks = tasks.filter((task) => task.status === status);

    // Keep the drop zone, remove other tasks
    const dropZone = container.querySelector(".drop-zone");
    container.innerHTML = "";
    container.appendChild(dropZone);
      console.log('///////////')

    // Add tasks
    statusTasks.forEach((task) => {
      console.log('cccccccc')

      container.appendChild(createTaskElement(task));
      console.log('zzzzzzzz')
    });
  });
}

// Drag and drop
function allowDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}


function dragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function drop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");

  if (draggedTask) {
    const newStatus = e.currentTarget.closest(".column").dataset.status;
    draggedTask.status = newStatus;
    renderTasks();
  }
}

// Initialize with sample tasks

