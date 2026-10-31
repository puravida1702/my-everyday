(() => {
  "use strict";

  const STORAGE_KEY = "myEverydayTasks";
  const HABIT_KEY = "myEverydayHabits";
  const PROJECT_KEY = "myEverydayProjects";
  const LANG_KEY = "myEverydayLanguage";
  const THEME_KEY = "myEverydayTheme";
  const REMIND_KEY = "myEverydayReminders";
  const REMIND_LAST_KEY = "myEverydayRemindedOn";
  const BACKUP_KEY = "myEverydayLastBackup";
  const CATEGORIES = ["Personal", "Cars", "Home", "Kitchen", "Projects", "Garden", "Other"];
  const CATEGORY_ICONS = {Personal:"☑",Cars:"🚗",Home:"⌂",Kitchen:"♨",Projects:"✎",Garden:"❀",Other:"＋"};

  const translations = {
    en: {
      tagline:"A little more organized.", makeToday:"Make today count.", oneStep:"One step at a time.", tasksDone:"Tasks done",
      dailyProgress:"Your daily progress", focusToday:"YOUR FOCUS", todaysTasks:"Today's tasks", viewAll:"View all →",
      organizeLife:"MAKE SPACE FOR WHAT MATTERS", everydayLife:"Your everyday life", littleByLittle:"LITTLE BY LITTLE",
      dailyHabits:"Daily habits", editGoals:"Edit goals", addTask:"Add a task", getThingsDone:"GET THINGS DONE",
      yourTasks:"Your tasks", oneThingAtTime:"One thing at a time.", allTasks:"All tasks", seeAhead:"SEE WHAT'S AHEAD",
      calendar:"Calendar", yourUpcoming:"Your upcoming tasks, at a glance.", chooseDate:"Choose a date",
      makeItYours:"MAKE IT YOURS", organize:"Organize", buildYourRoutine:"Build routines that work for you.",
      dailyGoals:"Daily goals", addHabit:"＋ Add habit", yourProjects:"Your projects", newProject:"＋ New project",
      categories:"Categories", yourSpace:"YOUR SPACE", more:"More", simpleAndPersonal:"Simple, personal, and yours.",
      language:"Language", chooseLanguage:"Choose your app language.", dataOnDevice:"Your data",
      dataOnDeviceDesc:"Your tasks and habits are saved on this device.", savedLocally:"Saved locally",
      slogan:"A little more organized. A lot more freedom.", home:"Home", tasks:"Tasks", taskName:"What needs to be done?",
      category:"Category", dueDate:"Due date", projectOptional:"Project (optional)", cancel:"Cancel", saveTask:"Save task",
      dailyRoutine:"DAILY ROUTINE", habitGoal:"Habit goal", habitName:"Habit name", dailyTarget:"Daily target",
      unit:"Unit", save:"Save", planSomething:"PLAN SOMETHING", projectName:"Project name", createProject:"Create project",
      noTasks:"Nothing planned here yet.", noHabits:"No habits yet. Add one to start a routine.",
      noProjects:"No projects yet. Create one for something you're working on.", today:"Today",
      done:"Done", left:"left", completed:"Completed", deleteConfirm:"Delete this item?", edit:"Edit",
      addTaskTitle:"Add a task", editTaskTitle:"Edit task", english:"English", spanish:"Español",
      taskSaved:"Task saved.", habitSaved:"Habit saved.", projectCreated:"Project created.", habitAdded:"Habit added.",
      all:"All", overdue:"Overdue", noDate:"No date", tasksFor:"Tasks for", progress:"Progress",
      taskDeleted:"Task deleted.", habitDeleted:"Habit deleted.", projectDeleted:"Project deleted.",
      habitAlreadyDone:"You've reached today's goal.", projectTasks:"tasks",
      taskEyebrow:"TASK", showMore:"Show more", showLess:"Show less",
      attention:"NEEDS ATTENTION", comingUp:"COMING UP", next7:"Next 7 days",
      repeat:"Repeat", repeatNone:"Does not repeat", repeatDaily:"Daily", repeatWeekly:"Weekly", repeatMonthly:"Monthly",
      nextScheduled:"Next one scheduled for", undo:"Undo", searchPlaceholder:"Search tasks…",
      streak:"Streak", best:"Best",
      backup:"Backup", backupDesc:"Save your data to a file, or restore it from one.", exportBtn:"Export", importBtn:"Import",
      lastBackup:"Last backup", never:"Never", exported:"Backup saved.", importConfirm:"Replace all current data with this backup?",
      importDone:"Backup restored.", importBad:"That file isn't a valid backup.",
      reminders:"Reminders", remindersDesc:"Get a notification about today's and overdue tasks when you open the app.",
      on:"On", off:"Off", notifUnsupported:"Notifications aren't supported here.", notifDenied:"Notifications are blocked in your browser settings.",
      appearance:"Appearance", appearanceDesc:"Light, dark, or match your phone.", themeAuto:"Auto", themeLight:"Light", themeDark:"Dark",
      taskPlaceholder:"e.g. Check car oil", projectPlaceholder:"e.g. House renovation", unitPlaceholder:"minutes",
      addTaskOnDate:"＋ Add a task for this day"
    },
    es: {
      tagline:"Un poco más organizado.", makeToday:"Haz que hoy cuente.", oneStep:"Un paso a la vez.", tasksDone:"Tareas hechas",
      dailyProgress:"Tu progreso diario", focusToday:"TU ENFOQUE", todaysTasks:"Tareas de hoy", viewAll:"Ver todas →",
      organizeLife:"HAZ ESPACIO PARA LO IMPORTANTE", everydayLife:"Tu vida cotidiana", littleByLittle:"POCO A POCO",
      dailyHabits:"Hábitos diarios", editGoals:"Editar metas", addTask:"Añadir tarea", getThingsDone:"PONTE EN MARCHA",
      yourTasks:"Tus tareas", oneThingAtTime:"Una cosa a la vez.", allTasks:"Todas las tareas", seeAhead:"MIRA LO QUE VIENE",
      calendar:"Calendario", yourUpcoming:"Tus próximas tareas, de un vistazo.", chooseDate:"Elige una fecha",
      makeItYours:"HAZLO TUYO", organize:"Organizar", buildYourRoutine:"Crea rutinas que funcionen para ti.",
      dailyGoals:"Metas diarias", addHabit:"＋ Añadir hábito", yourProjects:"Tus proyectos", newProject:"＋ Nuevo proyecto",
      categories:"Categorías", yourSpace:"TU ESPACIO", more:"Más", simpleAndPersonal:"Simple, personal y tuyo.",
      language:"Idioma", chooseLanguage:"Elige el idioma de la aplicación.", dataOnDevice:"Tus datos",
      dataOnDeviceDesc:"Tus tareas y hábitos se guardan en este dispositivo.", savedLocally:"Guardado localmente",
      slogan:"Un poco más organizado. Mucha más libertad.", home:"Inicio", tasks:"Tareas", taskName:"¿Qué necesitas hacer?",
      category:"Categoría", dueDate:"Fecha límite", projectOptional:"Proyecto (opcional)", cancel:"Cancelar", saveTask:"Guardar tarea",
      dailyRoutine:"RUTINA DIARIA", habitGoal:"Meta del hábito", habitName:"Nombre del hábito", dailyTarget:"Meta diaria",
      unit:"Unidad", save:"Guardar", planSomething:"PLANIFICA ALGO", projectName:"Nombre del proyecto", createProject:"Crear proyecto",
      noTasks:"Todavía no hay tareas aquí.", noHabits:"Todavía no hay hábitos. Añade uno para comenzar.",
      noProjects:"Todavía no hay proyectos. Crea uno para algo que estés haciendo.", today:"Hoy",
      done:"Hechas", left:"pendientes", completed:"Completada", deleteConfirm:"¿Eliminar este elemento?", edit:"Editar",
      addTaskTitle:"Añadir tarea", editTaskTitle:"Editar tarea", english:"English", spanish:"Español",
      taskSaved:"Tarea guardada.", habitSaved:"Hábito guardado.", projectCreated:"Proyecto creado.", habitAdded:"Hábito añadido.",
      all:"Todas", overdue:"Atrasadas", noDate:"Sin fecha", tasksFor:"Tareas para", progress:"Progreso",
      taskDeleted:"Tarea eliminada.", habitDeleted:"Hábito eliminado.", projectDeleted:"Proyecto eliminado.",
      habitAlreadyDone:"Ya alcanzaste tu meta de hoy.", projectTasks:"tareas",
      taskEyebrow:"TAREA", showMore:"Ver más", showLess:"Ver menos",
      attention:"REQUIERE ATENCIÓN", comingUp:"LO QUE VIENE", next7:"Próximos 7 días",
      repeat:"Repetir", repeatNone:"No se repite", repeatDaily:"Diaria", repeatWeekly:"Semanal", repeatMonthly:"Mensual",
      nextScheduled:"Siguiente programada para", undo:"Deshacer", searchPlaceholder:"Buscar tareas…",
      streak:"Racha", best:"Mejor",
      backup:"Copia de seguridad", backupDesc:"Guarda tus datos en un archivo o restáuralos desde uno.", exportBtn:"Exportar", importBtn:"Importar",
      lastBackup:"Última copia", never:"Nunca", exported:"Copia guardada.", importConfirm:"¿Reemplazar todos los datos actuales con esta copia?",
      importDone:"Copia restaurada.", importBad:"Ese archivo no es una copia válida.",
      reminders:"Recordatorios", remindersDesc:"Recibe una notificación de las tareas de hoy y atrasadas al abrir la app.",
      on:"Activado", off:"Desactivado", notifUnsupported:"Las notificaciones no están disponibles aquí.", notifDenied:"Las notificaciones están bloqueadas en los ajustes del navegador.",
      appearance:"Apariencia", appearanceDesc:"Claro, oscuro o igual que tu teléfono.", themeAuto:"Automático", themeLight:"Claro", themeDark:"Oscuro",
      taskPlaceholder:"p. ej. Revisar el aceite del carro", projectPlaceholder:"p. ej. Remodelación de la casa", unitPlaceholder:"minutos",
      addTaskOnDate:"＋ Añadir tarea para este día"
    }
  };

  /* ---------- helpers ---------- */
  const $ = id => document.getElementById(id);
  const safeParse = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  };
  const pad = n => String(n).padStart(2, "0");
  const toISO = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const todayISO = () => toISO(new Date());
  const parseISO = iso => new Date(`${iso}T12:00:00`);
  const addDaysISO = (iso, n) => { const d = parseISO(iso); d.setDate(d.getDate()+n); return toISO(d); };
  const addMonthsISO = (iso, n) => {
    const d = parseISO(iso); const day = d.getDate();
    d.setDate(1); d.setMonth(d.getMonth()+n);
    const last = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
    d.setDate(Math.min(day, last));
    return toISO(d);
  };
  const nextDate = (iso, repeat) => repeat === "daily" ? addDaysISO(iso,1) : repeat === "weekly" ? addDaysISO(iso,7) : addMonthsISO(iso,1);
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;
  const hasDate = task => task.date && task.date !== "No date";
  const isOverdue = task => hasDate(task) && task.date < todayISO() && !task.done;

  /* ---------- data ---------- */
  function normalizeTasks(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(x => x && typeof x === "object").map(x => ({...x, id: x.id || uid(), done: x.done === true, name: String(x.name ?? "")}));
  }
  function normalizeProjects(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(x => x && typeof x === "object" && x.name).map(x => ({...x, id: x.id || uid(), name: String(x.name)}));
  }
  function defaultHabits() {
    return {date: todayISO(), items: [
      {id:uid(),name:"💧 Drink water",goal:8,done:0,unit:"glasses",days:[]},
      {id:uid(),name:"🚶 Walk",goal:30,done:0,unit:"minutes",days:[]},
      {id:uid(),name:"💪 Plank",goal:2,done:0,unit:"minutes",days:[]},
      {id:uid(),name:"🏋️ Workout",goal:1,done:0,unit:"session",days:[]}
    ]};
  }
  function normalizeHabits(h) {
    if (!h || !Array.isArray(h.items)) h = defaultHabits();
    const today = todayISO();
    h.items = h.items.filter(x => x && typeof x === "object").map(x => {
      const goal = Number(x.goal);
      return {
        id: x.id || uid(), name: String(x.name ?? ""),
        goal: Number.isFinite(goal) && goal >= 1 ? goal : 1,
        done: Number(x.done) || 0, unit: x.unit || "",
        days: Array.isArray(x.days) ? x.days.filter(d => typeof d === "string").slice(-400) : []
      };
    });
    if (h.date !== today) { h.date = today; h.items.forEach(x => x.done = 0); }
    h.items.forEach(x => { if (x.done >= x.goal && !x.days.includes(today)) x.days.push(today); });
    return h;
  }

  let tasks = normalizeTasks(safeParse(STORAGE_KEY, []));
  let habits = normalizeHabits(safeParse(HABIT_KEY, null));
  let projects = normalizeProjects(safeParse(PROJECT_KEY, []));
  let language = localStorage.getItem(LANG_KEY) || "en";
  let themePref = localStorage.getItem(THEME_KEY) || "auto";
  let currentPage = "home";
  let currentFilter = "All";
  let currentProject = null;
  let searchQuery = "";
  let homeExpanded = false;
  let calView = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let toastTimer;

  const t = key => (translations[language] && translations[language][key]) || translations.en[key] || key;
  const saveTasks = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  const saveHabits = () => localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
  const saveProjects = () => localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
  const saveAll = () => { saveTasks(); saveHabits(); saveProjects(); };
  const locale = () => language === "es" ? "es-CR" : "en-US";

  function ensureToday() {
    if (habits.date !== todayISO()) {
      habits.date = todayISO();
      habits.items.forEach(h => h.done = 0);
      saveHabits();
    }
  }

  /* ---------- theme ---------- */
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function applyTheme() {
    const dark = themePref === "dark" || (themePref === "auto" && media && media.matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#1a1b1d" : "#f7f2e9");
  }
  if (media && media.addEventListener) media.addEventListener("change", () => { if (themePref === "auto") applyTheme(); });

  /* ---------- toast ---------- */
  const hideToast = () => $("toast").classList.remove("show");
  function showToast(message, undoFn = null) {
    const el = $("toast");
    el.textContent = "";
    const span = document.createElement("span");
    span.textContent = message;
    el.appendChild(span);
    el.classList.toggle("has-action", !!undoFn);
    if (undoFn) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "toast-undo"; b.textContent = t("undo");
      b.addEventListener("click", () => { undoFn(); hideToast(); });
      el.appendChild(b);
    }
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, undoFn ? 5500 : 2200);
  }

  const formatDate = value => {
    if (!value || value === "No date") return t("noDate");
    return parseISO(value).toLocaleDateString(locale(), {month:"short",day:"numeric",year:"numeric"});
  };
  const taskCategory = task => CATEGORIES.includes(task.category) ? task.category : "Other";
  const repeatLabel = r => ({daily:t("repeatDaily"),weekly:t("repeatWeekly"),monthly:t("repeatMonthly")})[r] || "";

  /* ---------- translations / settings ---------- */
  function renderDate() {
    $("todayDate").textContent = new Date().toLocaleDateString(locale(), {weekday:"long",month:"long",day:"numeric"});
  }
  function notifGranted() { return "Notification" in window && Notification.permission === "granted"; }
  function renderSettings() {
    $("languageSetting").textContent = language === "en" ? t("english") : t("spanish");
    $("themeSetting").textContent = t({auto:"themeAuto",light:"themeLight",dark:"themeDark"}[themePref] || "themeAuto");
    $("reminderSetting").textContent = localStorage.getItem(REMIND_KEY) === "on" && notifGranted() ? t("on") : t("off");
    const last = localStorage.getItem(BACKUP_KEY);
    $("lastBackup").textContent = `${t("lastBackup")}: ${last ? formatDate(last) : t("never")}`;
  }
  function applyTranslations() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[language][key]) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $("languageBtn").textContent = language === "en" ? "EN / ES" : "ES / EN";
    renderDate();
    renderSettings();
    renderAll();
  }

  function navigate(page) {
    currentPage = page;
    document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === `page-${page}`));
    document.querySelectorAll(".nav-button").forEach(b => b.classList.toggle("active", b.dataset.page === page));
    renderAll();
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function goToTasks(filter = "All", project = null) {
    currentFilter = filter; currentProject = project; searchQuery = ""; $("taskSearch").value = "";
    navigate("tasks");
  }

  /* ---------- categories ---------- */
  function categoryLabel(category) {
    if (language !== "es") return category;
    return ({Personal:"Personal",Cars:"Autos",Home:"Hogar",Kitchen:"Cocina",Projects:"Proyectos",Garden:"Jardín",Other:"Otros"})[category] || category;
  }
  function categoryMarkup(category) {
    const count = tasks.filter(x => taskCategory(x) === category && !x.done).length;
    return `<button type="button" class="category-card" data-action="filter-category" data-category="${category}">
      <span>${CATEGORY_ICONS[category]}</span><strong>${categoryLabel(category)}</strong>
      <small>${count} ${language==="es"?"pendientes":"open"}</small>
    </button>`;
  }
  function renderCategories() {
    const html = CATEGORIES.map(categoryMarkup).join("");
    $("homeCategories").innerHTML = html;
    $("organizeCategories").innerHTML = html;
  }

  /* ---------- tasks ---------- */
  function taskCard(task) {
    const dateText = task.date ? formatDate(task.date) : t("noDate");
    const late = isOverdue(task);
    return `<article class="task-card ${task.done?"completed":""}">
      <input type="checkbox" aria-label="${t("completed")}" data-action="toggle-task" data-id="${escapeHTML(task.id)}" ${task.done?"checked":""}>
      <div class="task-details"><strong>${escapeHTML(task.name)}</strong><small>${escapeHTML(categoryLabel(taskCategory(task)))} · ${escapeHTML(dateText)}${late?` · <span class="late">${t("overdue")}</span>`:""}${task.project?` · ${escapeHTML(task.project)}`:""}${task.repeat?` · ↻ ${escapeHTML(repeatLabel(task.repeat))}`:""}</small></div>
      <div class="task-actions"><button class="icon-action" data-action="edit-task" data-id="${escapeHTML(task.id)}" aria-label="${t("edit")}">✎</button><button class="icon-action delete" data-action="delete-task" data-id="${escapeHTML(task.id)}" aria-label="Delete">×</button></div>
    </article>`;
  }
  const emptyState = () => `<div class="empty-state">${t("noTasks")}</div>`;

  function spawnNext(task) {
    const today = todayISO();
    let next = nextDate(hasDate(task) ? task.date : today, task.repeat);
    let guard = 0;
    while (next <= today && guard++ < 400) next = nextDate(next, task.repeat);
    tasks.unshift({id:uid(),name:task.name,category:task.category,date:next,done:false,project:task.project||"",repeat:task.repeat,spawned:false});
    task.spawned = true;
    return next;
  }

  function renderHome() {
    const today = todayISO();
    const overdue = tasks.filter(isOverdue).sort((a,b) => a.date.localeCompare(b.date));
    const todaysAll = tasks.filter(x => !hasDate(x) || x.date === today);
    const shown = homeExpanded ? todaysAll : todaysAll.slice(0,5);
    const moreBtn = todaysAll.length > 5
      ? `<button type="button" class="text-button more-toggle" data-action="toggle-home-more">${homeExpanded ? t("showLess") : `${t("showMore")} (${todaysAll.length-5})`}</button>` : "";
    $("homeTaskList").innerHTML = (shown.length ? shown.map(taskCard).join("") : emptyState()) + moreBtn;

    $("homeOverdueSection").hidden = !overdue.length;
    $("homeOverdueList").innerHTML = overdue.slice(0,5).map(taskCard).join("");

    const end = addDaysISO(today, 7);
    const upcoming = tasks.filter(x => hasDate(x) && !x.done && x.date > today && x.date <= end).sort((a,b) => a.date.localeCompare(b.date));
    $("homeUpcomingSection").hidden = !upcoming.length;
    $("homeUpcomingList").innerHTML = upcoming.slice(0,5).map(taskCard).join("");

    renderCategories();
    $("homeHabits").innerHTML = habits.items.map((h,i) => habitCard(h,i,false)).join("") || `<div class="empty-state">${t("noHabits")}</div>`;

    const total = todaysAll.length, done = todaysAll.filter(x => x.done).length, pct = total ? Math.round(done/total*100) : 0;
    $("taskProgress").textContent = `${done}/${total}`;
    $("progressRing").style.background = `conic-gradient(var(--ring) ${pct}%,var(--ring-bg) ${pct}%)`;
    $("progressMessage").textContent = total && done === total
      ? (language==="es" ? "¡Todo terminado!" : "Wonderful! Everything is complete.")
      : (language==="es" ? "Un paso a la vez. ¡Tú puedes!" : "One step at a time. You've got this!");
    const habitsDone = habits.items.filter(h => h.done >= h.goal).length;
    $("habitProgress").textContent = `${t("dailyHabits")}: ${habitsDone}/${habits.items.length}`;
  }

  const filterLabel = f => f === "All" ? t("all") : f === "Overdue" ? t("overdue") : categoryLabel(f);
  function renderFilters() {
    const options = ["All","Overdue",...CATEGORIES];
    $("taskFilters").innerHTML = options.map(c => `<button class="filter-chip ${currentFilter===c?"active":""}" data-action="set-filter" data-filter="${c}">${filterLabel(c)}</button>`).join("");
  }
  function matchesFilter(task) {
    if (currentFilter === "Overdue" && !isOverdue(task)) return false;
    if (currentFilter !== "All" && currentFilter !== "Overdue" && taskCategory(task) !== currentFilter) return false;
    if (currentProject && task.project !== currentProject) return false;
    if (searchQuery) {
      const hay = `${task.name} ${task.project||""} ${categoryLabel(taskCategory(task))}`.toLowerCase();
      if (!hay.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  }
  function renderTasksPage() {
    renderFilters();
    const filtered = tasks.filter(matchesFilter);
    $("taskSectionTitle").textContent = currentProject || (currentFilter === "All" ? t("allTasks") : filterLabel(currentFilter));
    $("taskCount").textContent = String(filtered.length);
    $("allTaskList").innerHTML = filtered.length
      ? filtered.slice().sort((a,b) => (a.done-b.done) || String(a.date||"9999").localeCompare(String(b.date||"9999"))).map(taskCard).join("")
      : emptyState();
  }

  /* ---------- calendar ---------- */
  function renderMonthGrid(selected) {
    const y = calView.getFullYear(), m = calView.getMonth();
    const weekStart = language === "es" ? 1 : 0;
    const first = new Date(y, m, 1);
    const lead = (first.getDay() - weekStart + 7) % 7;
    const daysInMonth = new Date(y, m+1, 0).getDate();
    const today = todayISO();
    const counts = {};
    tasks.forEach(x => { if (hasDate(x)) { const c = counts[x.date] || (counts[x.date] = {open:0,done:0}); x.done ? c.done++ : c.open++; } });
    const names = [0,1,2,3,4,5,6].map(i => new Date(2023,0,1+((i+weekStart)%7)).toLocaleDateString(locale(), {weekday:"narrow"}));
    let cells = "";
    for (let i = 0; i < lead; i++) cells += `<span class="cal-empty"></span>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${y}-${pad(m+1)}-${pad(d)}`;
      const c = counts[iso];
      const dot = c ? (c.open ? "open" : "done") : "";
      cells += `<button type="button" class="cal-day ${iso===today?"today":""} ${iso===selected?"selected":""}" data-action="cal-pick" data-date="${iso}">${d}<i class="cal-dot ${dot}"></i></button>`;
    }
    $("calendarGrid").innerHTML = `
      <div class="cal-head">
        <button type="button" class="cal-nav" data-action="cal-prev" aria-label="Previous month">‹</button>
        <strong>${first.toLocaleDateString(locale(), {month:"long",year:"numeric"})}</strong>
        <button type="button" class="text-button" data-action="cal-today">${t("today")}</button>
        <button type="button" class="cal-nav" data-action="cal-next" aria-label="Next month">›</button>
      </div>
      <div class="cal-weekdays">${names.map(n => `<span>${n}</span>`).join("")}</div>
      <div class="cal-days">${cells}</div>`;
  }
  function renderCalendar() {
    const input = $("calendarDate");
    if (!input.value) input.value = todayISO();
    const date = input.value;
    $("calendarTitle").textContent = `${t("tasksFor")} ${formatDate(date)}`;
    renderMonthGrid(date);
    const list = tasks.filter(x => x.date === date);
    $("calendarTaskList").innerHTML = list.length ? list.map(taskCard).join("") : emptyState();
  }

  /* ---------- habits ---------- */
  function streakInfo(h) {
    const days = [...new Set(h.days || [])].sort();
    const set = new Set(days);
    const today = todayISO();
    let current = 0, d = set.has(today) ? today : addDaysISO(today, -1);
    while (set.has(d)) { current++; d = addDaysISO(d, -1); }
    let best = 0, run = 0, prev = null;
    days.forEach(day => { run = prev && addDaysISO(prev,1) === day ? run+1 : 1; if (run > best) best = run; prev = day; });
    const last7 = [6,5,4,3,2,1,0].map(i => set.has(addDaysISO(today, -i)));
    return {current, best, last7};
  }
  function syncHabitDay(h) {
    const today = todayISO();
    const has = h.days.includes(today);
    if (h.done >= h.goal && !has) h.days.push(today);
    else if (h.done < h.goal && has) h.days = h.days.filter(d => d !== today);
    h.days = h.days.slice(-400);
  }
  function habitCard(h, index, manage) {
    const pct = Math.min(100, Math.round((h.done/h.goal)*100));
    const s = streakInfo(h);
    let meta = `${h.done}/${h.goal} ${escapeHTML(h.unit||"")}`;
    if (s.current > 0 || manage) meta += ` · 🔥 ${t("streak")}: ${s.current}`;
    if (manage) meta += ` · ${t("best")}: ${s.best}`;
    return `<div class="habit-card"><div><strong>${escapeHTML(h.name)}</strong><small>${meta}</small><div class="habit-meter"><span style="width:${pct}%"></span></div><div class="habit-dots" aria-hidden="true">${s.last7.map(on => `<i class="${on?"on":""}"></i>`).join("")}</div></div>
      <div class="habit-controls"><button class="minus" data-action="habit-minus" data-index="${index}" aria-label="-1">−</button><button class="plus" data-action="habit-plus" data-index="${index}" aria-label="+1">+</button>${manage?`<button data-action="edit-habit" data-index="${index}" aria-label="${t("edit")}">✎</button><button data-action="delete-habit" data-index="${index}" aria-label="Delete">×</button>`:""}</div></div>`;
  }
  function renderOrganize() {
    $("manageHabits").innerHTML = habits.items.map((h,i) => habitCard(h,i,true)).join("") || `<div class="empty-state">${t("noHabits")}</div>`;
    $("projectList").innerHTML = projects.length ? projects.map(p => {
      const count = tasks.filter(x => x.project === p.name).length;
      return `<div class="project-card"><div><strong>${escapeHTML(p.name)}</strong><small>${count} ${t("projectTasks")}</small></div><div class="project-actions"><button class="icon-action" data-action="project-tasks" data-name="${escapeHTML(p.name)}">→</button><button class="icon-action delete" data-action="delete-project" data-id="${escapeHTML(p.id)}">×</button></div></div>`;
    }).join("") : `<div class="empty-state">${t("noProjects")}</div>`;
    renderCategories();
  }

  function renderAll() {
    renderHome();
    if (currentPage === "tasks") renderTasksPage();
    if (currentPage === "calendar") renderCalendar();
    if (currentPage === "organize") renderOrganize();
  }

  /* ---------- dialogs ---------- */
  function openTaskDialog(task = null, presetCategory = null, presetDate = null) {
    $("taskForm").reset();
    $("taskId").value = task?.id || "";
    $("taskDialogTitle").textContent = task ? t("editTaskTitle") : t("addTaskTitle");
    $("taskName").value = task?.name || "";
    $("taskDate").value = task ? (hasDate(task) ? task.date : "") : (presetDate || todayISO());
    $("taskCategory").innerHTML = CATEGORIES.map(c => `<option value="${c}">${categoryLabel(c)}</option>`).join("");
    $("taskCategory").value = task ? taskCategory(task) : (presetCategory || "Personal");
    $("taskProject").innerHTML = `<option value="">—</option>` + projects.map(p => `<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)}</option>`).join("");
    $("taskProject").value = task?.project || "";
    $("taskRepeat").innerHTML = [["",t("repeatNone")],["daily",t("repeatDaily")],["weekly",t("repeatWeekly")],["monthly",t("repeatMonthly")]]
      .map(([v,l]) => `<option value="${v}">${l}</option>`).join("");
    $("taskRepeat").value = task?.repeat || "";
    $("taskDialog").showModal();
    $("taskName").focus();
  }
  function openHabitDialog(index = null) {
    $("habitForm").reset();
    $("habitIndex").value = index === null ? "" : String(index);
    const h = index === null ? null : habits.items[index];
    $("habitName").value = h?.name || "";
    $("habitGoalValue").value = h?.goal || 1;
    $("habitUnit").value = h?.unit || "";
    $("habitDialog").showModal();
  }
  function openProjectDialog() { $("projectForm").reset(); $("projectDialog").showModal(); }

  /* ---------- backup ---------- */
  function exportData() {
    const payload = {app:"my-everyday",version:2,exportedAt:new Date().toISOString(),tasks,habits,projects,language,theme:themePref};
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `my-everyday-backup-${todayISO()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    localStorage.setItem(BACKUP_KEY, todayISO());
    renderSettings();
    showToast(t("exported"));
  }
  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.tasks) || !data.habits || !Array.isArray(data.habits.items) || !Array.isArray(data.projects)) throw new Error("invalid");
        if (!confirm(t("importConfirm"))) return;
        tasks = normalizeTasks(data.tasks);
        habits = normalizeHabits(data.habits);
        projects = normalizeProjects(data.projects);
        saveAll();
        renderAll();
        showToast(t("importDone"));
      } catch { showToast(t("importBad")); }
    };
    reader.onerror = () => showToast(t("importBad"));
    reader.readAsText(file);
  }

  /* ---------- reminders ---------- */
  function checkReminders() {
    if (localStorage.getItem(REMIND_KEY) !== "on" || !notifGranted() || !("serviceWorker" in navigator)) return;
    const today = todayISO();
    if (localStorage.getItem(REMIND_LAST_KEY) === today) return;
    const n = tasks.filter(x => !x.done && (isOverdue(x) || x.date === today)).length;
    if (!n) return;
    const body = language === "es"
      ? `${n} ${n===1?"tarea requiere":"tareas requieren"} tu atención hoy.`
      : `${n} ${n===1?"task needs":"tasks need"} your attention today.`;
    navigator.serviceWorker.ready
      .then(reg => reg.showNotification("My Everyday", {body, icon:"icon-192.png", badge:"icon-192.png", tag:"my-everyday-daily"}))
      .then(() => localStorage.setItem(REMIND_LAST_KEY, today))
      .catch(() => {});
  }
  async function toggleReminders() {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) { showToast(t("notifUnsupported")); return; }
    if (localStorage.getItem(REMIND_KEY) === "on") { localStorage.setItem(REMIND_KEY, "off"); renderSettings(); return; }
    let perm = Notification.permission;
    if (perm === "default") perm = await Notification.requestPermission();
    if (perm !== "granted") { showToast(t("notifDenied")); renderSettings(); return; }
    localStorage.setItem(REMIND_KEY, "on");
    localStorage.removeItem(REMIND_LAST_KEY);
    renderSettings();
    checkReminders();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) { navigate(pageButton.dataset.page); return; }
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;

    if (action === "go-home") { event.preventDefault(); navigate("home"); }
    if (action === "go-organize") navigate("organize");
    if (action === "show-all-tasks") goToTasks("All");
    if (action === "show-overdue") goToTasks("Overdue");
    if (action === "toggle-home-more") { homeExpanded = !homeExpanded; renderHome(); }
    if (action === "add-task") openTaskDialog();
    if (action === "add-task-date") openTaskDialog(null, null, $("calendarDate").value || todayISO());
    if (action === "close-dialog") button.closest("dialog")?.close();
    if (action === "toggle-language") { language = language === "en" ? "es" : "en"; localStorage.setItem(LANG_KEY, language); applyTranslations(); }
    if (action === "cycle-theme") {
      themePref = themePref === "auto" ? "light" : themePref === "light" ? "dark" : "auto";
      localStorage.setItem(THEME_KEY, themePref); applyTheme(); renderSettings();
    }
    if (action === "toggle-reminders") toggleReminders();
    if (action === "export-data") exportData();
    if (action === "import-data") $("importFile").click();

    if (action === "filter-category") goToTasks(button.dataset.category);
    if (action === "set-filter") { currentFilter = button.dataset.filter; currentProject = null; renderTasksPage(); }
    if (action === "project-tasks") goToTasks("All", button.dataset.name);

    if (action === "edit-task") { const task = tasks.find(x => x.id === button.dataset.id); if (task) openTaskDialog(task); }
    if (action === "delete-task") {
      const idx = tasks.findIndex(x => x.id === button.dataset.id);
      if (idx >= 0) {
        const [removed] = tasks.splice(idx, 1);
        saveTasks(); renderAll();
        showToast(t("taskDeleted"), () => { tasks.splice(Math.min(idx, tasks.length), 0, removed); saveTasks(); renderAll(); });
      }
    }

    if (action === "add-habit") openHabitDialog();
    if (action === "edit-habit") openHabitDialog(Number(button.dataset.index));
    if (action === "delete-habit") {
      const idx = Number(button.dataset.index);
      if (habits.items[idx]) {
        const [removed] = habits.items.splice(idx, 1);
        saveHabits(); renderAll();
        showToast(t("habitDeleted"), () => { habits.items.splice(Math.min(idx, habits.items.length), 0, removed); saveHabits(); renderAll(); });
      }
    }
    if (action === "habit-plus") {
      ensureToday();
      const h = habits.items[Number(button.dataset.index)];
      if (!h) return;
      if (h.done >= h.goal) { showToast(t("habitAlreadyDone")); return; }
      h.done++; syncHabitDay(h); saveHabits(); renderAll();
    }
    if (action === "habit-minus") {
      ensureToday();
      const h = habits.items[Number(button.dataset.index)];
      if (!h || h.done <= 0) return;
      h.done--; syncHabitDay(h); saveHabits(); renderAll();
    }

    if (action === "add-project") openProjectDialog();
    if (action === "delete-project") {
      const idx = projects.findIndex(p => p.id === button.dataset.id);
      if (idx >= 0) {
        const [removed] = projects.splice(idx, 1);
        saveProjects(); renderAll();
        showToast(t("projectDeleted"), () => { projects.splice(Math.min(idx, projects.length), 0, removed); saveProjects(); renderAll(); });
      }
    }

    if (action === "cal-prev") { calView = new Date(calView.getFullYear(), calView.getMonth()-1, 1); renderCalendar(); }
    if (action === "cal-next") { calView = new Date(calView.getFullYear(), calView.getMonth()+1, 1); renderCalendar(); }
    if (action === "cal-today") { const n = new Date(); calView = new Date(n.getFullYear(), n.getMonth(), 1); $("calendarDate").value = todayISO(); renderCalendar(); }
    if (action === "cal-pick") { $("calendarDate").value = button.dataset.date; renderCalendar(); }
  });

  document.addEventListener("change", event => {
    if (event.target.matches('[data-action="toggle-task"]')) {
      const task = tasks.find(x => x.id === event.target.dataset.id);
      if (task) {
        task.done = event.target.checked;
        let message = null;
        if (task.done && task.repeat && !task.spawned) message = `${t("nextScheduled")} ${formatDate(spawnNext(task))}`;
        saveTasks(); renderAll();
        if (message) showToast(message);
      }
    }
    if (event.target.id === "calendarDate") {
      if (event.target.value) { const d = parseISO(event.target.value); calView = new Date(d.getFullYear(), d.getMonth(), 1); }
      renderCalendar();
    }
    if (event.target.id === "importFile") {
      const file = event.target.files && event.target.files[0];
      if (file) importData(file);
      event.target.value = "";
    }
  });

  $("taskSearch").addEventListener("input", event => { searchQuery = event.target.value.trim(); renderTasksPage(); });

  $("taskForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("taskName").value.trim();
    if (!name) return;
    const id = $("taskId").value;
    const existing = tasks.find(x => x.id === id);
    const record = {id:id||uid(),name,category:$("taskCategory").value,date:$("taskDate").value||"No date",done:existing?.done||false,project:$("taskProject").value,repeat:$("taskRepeat").value};
    if (existing) Object.assign(existing, record); else tasks.unshift(record);
    saveTasks(); $("taskDialog").close(); renderAll(); showToast(t("taskSaved"));
  });
  $("habitForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("habitName").value.trim();
    if (!name) return;
    const index = $("habitIndex").value;
    const old = index !== "" ? habits.items[Number(index)] : null;
    const goal = Math.max(1, Number($("habitGoalValue").value) || 1);
    const record = {id:old?.id||uid(),name,goal,done:old?Math.min(old.done,goal):0,unit:$("habitUnit").value.trim(),days:old?old.days:[]};
    syncHabitDay(record);
    if (old) habits.items[Number(index)] = record; else habits.items.push(record);
    saveHabits(); $("habitDialog").close(); renderAll(); showToast(t("habitSaved"));
  });
  $("projectForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("projectName").value.trim();
    if (!name) return;
    if (projects.some(p => p.name.toLowerCase() === name.toLowerCase())) { showToast(language==="es"?"Ese proyecto ya existe.":"That project already exists."); return; }
    projects.push({id:uid(),name}); saveProjects(); $("projectDialog").close(); renderAll(); showToast(t("projectCreated"));
  });
  $("languageBtn").addEventListener("click", () => { language = language === "en" ? "es" : "en"; localStorage.setItem(LANG_KEY, language); applyTranslations(); });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") { ensureToday(); renderDate(); renderAll(); checkReminders(); }
  });

  /* ---------- start ---------- */
  applyTheme();
  saveAll();
  $("calendarDate").value = todayISO();
  applyTranslations();
  checkReminders();
})();
