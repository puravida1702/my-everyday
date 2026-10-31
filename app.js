const KEY = "myEverydayTasks", HKEY = "myEverydayHabits";
const CATS = { Personal: "user", Cars: "car", Home: "home", Projects: "pencil", Garden: "leaf", Other: "check" };
const $ = id => document.getElementById(id);
const ymd = d => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
const addDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return ymd(d); };
const today = addDays(0);
const esc = v => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

let tasks = JSON.parse(localStorage.getItem(KEY) || "[]").map((t, i) => ({ ...t, id: t.id || Date.now() + i, date: t.date === "No date" ? "" : t.date }));
const DEFAULT = [
  { icon: "drop", name: "Drink water", goal: 8, done: 0, unit: "glasses", step: 1 },
  { icon: "pulse", name: "Walk", goal: 30, done: 0, unit: "minutes", step: 5 },
  { icon: "timer", name: "Plank", goal: 2, done: 0, unit: "minutes", step: 1 },
  { icon: "dumbbell", name: "Workout", goal: 1, done: 0, unit: "session", step: 1 }
];
let habits = JSON.parse(localStorage.getItem(HKEY) || "null");
if (!habits || habits.date !== today || !habits.items[0].icon) habits = { date: today, items: DEFAULT.map(h => ({ ...h })) };

let popId = null, undo = null, timer, cat = "Personal";
const saveTasks = () => localStorage.setItem(KEY, JSON.stringify(tasks));
const saveHabits = () => localStorage.setItem(HKEY, JSON.stringify(habits));
const icon = n => `<svg class="i"><use href="#i-${n}"/></svg>`;

function label(d) {
  if (!d) return "No date";
  if (d === today) return "Today";
  if (d === addDays(1)) return "Tomorrow";
  if (d < today) return "Overdue";
  return new Date(d + "T12:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function render() {
  const sorted = [...tasks].sort((a, b) => a.done - b.done);
  $("taskList").innerHTML = sorted.length ? sorted.map(t => `
    <div class="task-card ${t.done ? "completed" : ""}">
      <button class="check ${t.id === popId ? "pop" : ""}" onclick="toggle(${t.id})" aria-label="Mark done">${icon("check")}</button>
      <div class="task-details"><strong>${esc(t.name)}</strong>
        <small><span class="dot c-${t.category}"></span>${esc(t.category)} · <em class="${t.date && t.date < today && !t.done ? "late" : ""}">${label(t.date)}</em></small></div>
      <button class="del" onclick="removeTask(${t.id})" aria-label="Delete task">${icon("x")}</button>
    </div>`).join("") : `<div class="task-card"><div class="task-details"><strong>Your day starts here</strong><small>Tap a card below or "Add a task" to begin.</small></div></div>`;

  $("catGrid").innerHTML = Object.keys(CATS).map(c => {
    const n = tasks.filter(t => t.category === c && !t.done).length;
    return `<button class="category-card c-${c}" data-c="${c}">${icon(CATS[c])}<strong>${c}</strong><small>${n ? n + " open" : "&nbsp;"}</small></button>`;
  }).join("");

  const total = tasks.length, done = tasks.filter(t => t.done).length, p = total ? done / total * 100 : 0;
  $("taskProgress").textContent = `${done}/${total}`;
  $("progressCircle").style.background = `conic-gradient(#252729 ${p}%, #e9e1d5 ${p}%)`;
  $("progressMessage").textContent = !total ? "Add a task to begin." : done === total ? "Wonderful! Everything is complete." : `${total - done} left. You've got this!`;
}

function renderHabits() {
  $("habitList").innerHTML = habits.items.map((h, i) => {
    const full = h.done >= h.goal;
    return `<div class="habit-card ${full ? "full" : ""}">${icon(h.icon)}
      <div class="hd"><strong>${esc(h.name)}</strong><small>${h.done}/${h.goal} ${esc(h.unit)}</small>
        <div class="bar"><i style="width:${Math.min(100, h.done / h.goal * 100)}%"></i></div></div>
      <button onclick="habit(${i})" ${full ? "disabled" : ""} aria-label="Add progress">${full ? icon("check") : "+" + h.step}</button></div>`;
  }).join("");
  const c = habits.items.filter(h => h.done >= h.goal).length;
  $("habitProgress").textContent = `Habits: ${c}/${habits.items.length} completed`;
}

function habit(i) { const h = habits.items[i]; h.done = Math.min(h.goal, h.done + h.step); saveHabits(); renderHabits(); }
function toggle(id) { const t = tasks.find(x => x.id === id); t.done = !t.done; popId = t.done ? id : null; saveTasks(); render(); }

function removeTask(id) {
  const i = tasks.findIndex(x => x.id === id);
  undo = { t: tasks[i], i };
  tasks.splice(i, 1); saveTasks(); render();
  $("toastMsg").textContent = "Task deleted";
  $("toast").classList.add("show");
  clearTimeout(timer); timer = setTimeout(() => $("toast").classList.remove("show"), 5000);
}
$("undoBtn").onclick = () => {
  if (!undo) return;
  tasks.splice(undo.i, 0, undo.t); undo = null; saveTasks(); render();
  $("toast").classList.remove("show");
};

function drawCats() { $("catChips").innerHTML = Object.keys(CATS).map(c => `<button class="${c === cat ? "on" : ""}" data-c="${c}">${c}</button>`).join(""); }
function markDate() {
  const v = $("taskDate").value;
  document.querySelectorAll("#dateChips button").forEach(b => b.classList.toggle("on", b.dataset.d === "" ? v === "" : v === addDays(+b.dataset.d)));
}
function setDate(v) { $("taskDate").value = v; markDate(); }
function openSheet(c) {
  cat = c || "Personal"; drawCats(); setDate(today); $("taskName").value = "";
  $("overlay").classList.add("show"); $("sheet").classList.add("show");
  setTimeout(() => $("taskName").focus(), 250);
}
function closeSheet() { $("overlay").classList.remove("show"); $("sheet").classList.remove("show"); }
function saveTask() {
  const name = $("taskName").value.trim();
  if (!name) { $("taskName").focus(); return; }
  tasks.unshift({ id: Date.now(), name, category: cat, date: $("taskDate").value, done: false });
  saveTasks(); render(); closeSheet();
}

$("catChips").onclick = e => { const b = e.target.closest("button"); if (b) { cat = b.dataset.c; drawCats(); } };
$("dateChips").onclick = e => { const b = e.target.closest("button"); if (b) setDate(b.dataset.d === "" ? "" : addDays(+b.dataset.d)); };
$("taskDate").onchange = markDate;
$("taskName").onkeydown = e => { if (e.key === "Enter") saveTask(); };
$("catGrid").onclick = e => { const b = e.target.closest("button"); if (b) openSheet(b.dataset.c); };
$("addTaskBtn").onclick = () => openSheet();
$("saveTask").onclick = saveTask;
$("closeSheet").onclick = closeSheet;
$("overlay").onclick = closeSheet;
document.querySelectorAll(".bottom-nav button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".bottom-nav button").forEach(x => x.classList.toggle("active", x === b));
  $(b.dataset.go).scrollIntoView({ behavior: "smooth", block: "start" });
});

const hr = new Date().getHours();
$("greeting").textContent = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
$("todayDate").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
render(); renderHabits();
