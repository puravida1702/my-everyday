
const STORAGE_KEY = "myEverydayTasks";
const HABIT_KEY = "myEverydayHabits";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const today = new Date().toISOString().slice(0, 10);

let habits = JSON.parse(localStorage.getItem(HABIT_KEY) || "null");

if (!habits || habits.date !== today) {
  habits = {
    date: today,
    items: [
      { name: "💧 Drink water", goal: 8, done: 0, unit: "glasses" },
      { name: "🚶 Walk", goal: 30, done: 0, unit: "minutes" },
      { name: "💪 Plank", goal: 2, done: 0, unit: "minutes" },
      { name: "🏋️ Workout", goal: 1, done: 0, unit: "session" }
    ]
  };
}

const categories = [
  "Personal", "Cars", "Home", "Projects", "Garden", "Other"
];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function saveHabits() {
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
}

function renderTasks() {
  const list = document.getElementById("taskList");

  if (!tasks.length) {
    list.innerHTML = `
      <div class="task-card">
        <div class="task-details">
          <strong>Your day starts here ✨</strong>
          <small>Add your first task to get organized.</small>
        </div>
      </div>`;
  } else {
    list.innerHTML = tasks.map((task, index) => `
      <div class="task-card ${task.done ? "completed" : ""}">
        <input type="checkbox"
          ${task.done ? "checked" : ""}
          onchange="toggleTask(${index})">
        <div class="task-details">
          <strong>${escapeHTML(task.name)}</strong>
          <small>${escapeHTML(task.category)} · ${task.date}</small>
        </div>
        <button onclick="deleteTask(${index})"
          aria-label="Delete task">×</button>
      </div>
    `).join("");
  }

  updateProgress();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function addTask() {
  const name = prompt("What do you need to do?");
  if (!name || !name.trim()) return;

  const category = prompt(
    "Choose a category:\n" + categories.join(", "),
    "Personal"
  );

  if (category === null) return;

  const selected = categories.find(
    item => item.toLowerCase() === category.trim().toLowerCase()
  ) || "Other";

  const date = prompt(
    "Due date (YYYY-MM-DD), or leave blank:",
    today
  );

  if (date === null) return;

  const dueDate = date.trim() || "No date";

  if (dueDate !== "No date" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    alert("Please use YYYY-MM-DD format.");
    return;
  }

  tasks.unshift({
    name: name.trim(),
    category: selected,
    date: dueDate,
    done: false
  });

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (!confirm("Delete this task?")) return;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.done).length;

  document.getElementById("taskProgress").textContent =
    `${completed}/${total}`;

  const percentage = total ? completed / total * 100 : 0;

  document.getElementById("progressCircle").style.background =
    `conic-gradient(#b5b5ae ${percentage}%, #eee9df ${percentage}%)`;

  document.getElementById("progressMessage").textContent =
    total && completed === total
      ? "Wonderful! Everything is complete."
      : "One step at a time. You've got this!";
}

function renderHabits() {
  const list = document.getElementById("habitList");

  list.innerHTML = habits.items.map((habit, index) => `
    <div class="habit-card">
      <div>
        <strong>${escapeHTML(habit.name)}</strong>
        <small>${habit.done}/${habit.goal} ${escapeHTML(habit.unit)}</small>
      </div>
      <button onclick="addHabitProgress(${index})"
        aria-label="Add habit progress">+1</button>
    </div>
  `).join("");

  const completed = habits.items.filter(
    habit => habit.done >= habit.goal
  ).length;

  document.getElementById("habitProgress").textContent =
    `Habits: ${completed}/${habits.items.length} completed`;
}

function addHabitProgress(index) {
  const habit = habits.items[index];

  if (habit.done >= habit.goal) return;

  habit.done++;
  saveHabits();
  renderHabits();
}

document.getElementById("addTaskBtn")
  .addEventListener("click", addTask);

document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

renderTasks();
renderHabits();
