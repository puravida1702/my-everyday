(() => {
  "use strict";

  const STORAGE_KEY = "myEverydayTasks";
  const HABIT_KEY = "myEverydayHabits";
  const PROJECT_KEY = "myEverydayProjects";
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
      habitAlreadyDone:"You've reached today's goal.", projectTasks:"tasks"
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
      habitAlreadyDone:"Ya alcanzaste tu meta de hoy.", projectTasks:"tareas"
    }
  };

  const $ = id => document.getElementById(id);
  const safeParse = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  };
  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;

  let tasks = safeParse(STORAGE_KEY, []);
  if (!Array.isArray(tasks)) tasks = [];
  // Preserve existing task data and add IDs only when needed.
  tasks.forEach(t => { if (!t.id) t.id = uid(); if (typeof t.done !== "boolean") t.done = false; });
  let habits = safeParse(HABIT_KEY, null);
  if (!habits || !Array.isArray(habits.items)) {
    habits = {date:todayISO(),items:[
      {name:"💧 Drink water",goal:8,done:0,unit:"glasses"},
      {name:"🚶 Walk",goal:30,done:0,unit:"minutes"},
      {name:"💪 Plank",goal:2,done:0,unit:"minutes"},
      {name:"🏋️ Workout",goal:1,done:0,unit:"session"}
    ]};
  }
  if (habits.date !== todayISO()) {
    habits.date = todayISO();
    habits.items.forEach(h => h.done = 0);
  }
  habits.items.forEach(h => { if (!Number.isFinite(Number(h.goal)) || Number(h.goal)<1) h.goal=1; h.done=Number(h.done)||0; });
  let projects = safeParse(PROJECT_KEY, []);
  if (!Array.isArray(projects)) projects = [];
  let language = localStorage.getItem("myEverydayLanguage") || "en";
  let currentPage = "home";
  let currentFilter = "All";
  let currentProject = null;
  let toastTimer;

  const t = key => (translations[language] && translations[language][key]) || translations.en[key] || key;
  const saveTasks = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  const saveHabits = () => localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
  const saveProjects = () => localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
  const showToast = message => {
    const el = $("toast"); el.textContent = message; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  };
  const formatDate = value => {
    if (!value || value === "No date") return t("noDate");
    const d = new Date(`${value}T12:00:00`);
    return d.toLocaleDateString(language === "es" ? "es-CR" : "en-US",{month:"short",day:"numeric",year:"numeric"});
  };
  const taskCategory = task => CATEGORIES.includes(task.category) ? task.category : "Other";

  function applyTranslations() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[language][key]) el.textContent = t(key);
    });
    $("languageSetting").textContent = language === "en" ? t("english") : t("spanish");
    $("languageBtn").textContent = language === "en" ? "EN / ES" : "ES / EN";
    $("todayDate").textContent = new Date().toLocaleDateString(language === "es" ? "es-CR" : "en-US",{weekday:"long",month:"long",day:"numeric"});
    renderAll();
  }

  function navigate(page) {
    currentPage = page;
    document.querySelectorAll(".page").forEach(p => p.classList.toggle("active",p.id === `page-${page}`));
    document.querySelectorAll(".nav-button").forEach(b => b.classList.toggle("active",b.dataset.page === page));
    renderAll();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function categoryMarkup(category) {
    const count = tasks.filter(x => taskCategory(x) === category && !x.done).length;
    return `<button type="button" class="category-card" data-action="filter-category" data-category="${category}">
      <span>${CATEGORY_ICONS[category]}</span><strong>${t(category) === category ? category : categoryLabel(category)}</strong>
      <small>${count} ${language==="es"?"pendientes":"open"}</small>
    </button>`;
  }
  function categoryLabel(category) {
    if (language !== "es") return category;
    return ({Personal:"Personal",Cars:"Autos",Home:"Hogar",Kitchen:"Cocina",Projects:"Proyectos",Garden:"Jardín",Other:"Otros"})[category] || category;
  }
  function renderCategories() {
    const html = CATEGORIES.map(categoryMarkup).join("");
    $("homeCategories").innerHTML = html;
    $("organizeCategories").innerHTML = html;
  }

  function taskCard(task) {
    const dateText = task.date ? formatDate(task.date) : t("noDate");
    const isLate = task.date && task.date !== "No date" && task.date < todayISO() && !task.done;
    return `<article class="task-card ${task.done?"completed":""}">
      <input type="checkbox" aria-label="${t("completed")}" data-action="toggle-task" data-id="${escapeHTML(task.id)}" ${task.done?"checked":""}>
      <div class="task-details"><strong>${escapeHTML(task.name)}</strong><small>${escapeHTML(categoryLabel(taskCategory(task)))} · ${escapeHTML(dateText)}${isLate?` · ${t("overdue")}`:""}${task.project?` · ${escapeHTML(task.project)}`:""}</small></div>
      <div class="task-actions"><button class="icon-action" data-action="edit-task" data-id="${escapeHTML(task.id)}" aria-label="${t("edit")}">✎</button><button class="icon-action delete" data-action="delete-task" data-id="${escapeHTML(task.id)}" aria-label="Delete">×</button></div>
    </article>`;
  }
  function emptyState() { return `<div class="empty-state">${t("noTasks")}</div>`; }

  function renderHome() {
    const todaysAll = tasks.filter(x => !x.date || x.date === "No date" || x.date === todayISO());
    const todays = todaysAll.slice(0,4);
    $("homeTaskList").innerHTML = todays.length ? todays.map(taskCard).join("") : emptyState();
    renderCategories();
    $("homeHabits").innerHTML = habits.items.slice(0,4).map((h,i)=>habitCard(h,i,false)).join("") || `<div class="empty-state">${t("noHabits")}</div>`;
    const total=todaysAll.length, done=todaysAll.filter(x=>x.done).length, pct=total?Math.round(done/total*100):0;
    $("taskProgress").textContent=`${done}/${total}`;
    $("progressRing").style.background=`conic-gradient(#aeb6ad ${pct}%,#eee9df ${pct}%)`;
    $("progressMessage").textContent = total && done===total ? (language==="es"?"¡Todo terminado!":"Wonderful! Everything is complete.") : (language==="es"?"Un paso a la vez. ¡Tú puedes!":"One step at a time. You've got this!");
    const habitsDone=habits.items.filter(h=>h.done>=h.goal).length;
    $("habitProgress").textContent=`${t("dailyHabits")}: ${habitsDone}/${habits.items.length}`;
  }

  function renderFilters() {
    const options = ["All",...CATEGORIES];
    $("taskFilters").innerHTML = options.map(c=>`<button class="filter-chip ${currentFilter===c?"active":""}" data-action="set-filter" data-filter="${c}">${c==="All"?t("all"):categoryLabel(c)}</button>`).join("");
  }
  function renderTasksPage() {
    renderFilters();
    const filtered = tasks.filter(task=>(currentFilter==="All" || taskCategory(task)===currentFilter) && (!currentProject || task.project===currentProject));
    $("taskSectionTitle").textContent=currentProject || (currentFilter==="All"?t("allTasks"):categoryLabel(currentFilter));
    $("taskCount").textContent=String(filtered.length);
    $("allTaskList").innerHTML=filtered.length?filtered.slice().sort((a,b)=>(a.done-b.done)||String(a.date||"9999").localeCompare(String(b.date||"9999"))).map(taskCard).join(""):emptyState();
  }
  function renderCalendar() {
    const dateInput=$("calendarDate");
    if (!dateInput.value) dateInput.value=todayISO();
    const date=dateInput.value;
    $("calendarTitle").textContent=`${t("tasksFor")} ${formatDate(date)}`;
    const list=tasks.filter(x=>x.date===date);
    $("calendarTaskList").innerHTML=list.length?list.map(taskCard).join(""):emptyState();
  }

  function habitCard(h,index,manage) {
    const pct=Math.min(100,Math.round((h.done/h.goal)*100));
    return `<div class="habit-card"><div><strong>${escapeHTML(h.name)}</strong><small>${h.done}/${h.goal} ${escapeHTML(h.unit||"")}</small><div class="habit-meter"><span style="width:${pct}%"></span></div></div>
      <div class="habit-controls"><button class="plus" data-action="habit-plus" data-index="${index}" aria-label="+1">+</button>${manage?`<button data-action="edit-habit" data-index="${index}" aria-label="${t("edit")}">✎</button><button data-action="delete-habit" data-index="${index}" aria-label="Delete">×</button>`:""}</div></div>`;
  }
  function renderOrganize() {
    $("manageHabits").innerHTML=habits.items.map((h,i)=>habitCard(h,i,true)).join("")||`<div class="empty-state">${t("noHabits")}</div>`;
    $("projectList").innerHTML=projects.length?projects.map(p=>{
      const count=tasks.filter(x=>x.project===p.name).length;
      return `<div class="project-card"><div><strong>${escapeHTML(p.name)}</strong><small>${count} ${t("projectTasks")}</small></div><div class="project-actions"><button class="icon-action" data-action="project-tasks" data-name="${escapeHTML(p.name)}">→</button><button class="icon-action delete" data-action="delete-project" data-id="${escapeHTML(p.id)}">×</button></div></div>`;
    }).join(""):`<div class="empty-state">${t("noProjects")}</div>`;
    renderCategories();
  }

  function renderAll() {
    renderHome();
    if(currentPage==="tasks") renderTasksPage();
    if(currentPage==="calendar") renderCalendar();
    if(currentPage==="organize") renderOrganize();
  }

  function openTaskDialog(task=null, presetCategory=null) {
    $("taskForm").reset();
    $("taskId").value=task?.id||"";
    $("taskDialogTitle").textContent=task?t("editTaskTitle"):t("addTaskTitle");
    $("taskName").value=task?.name||"";
    $("taskDate").value=task?.date && task.date!=="No date" ? task.date : todayISO();
    $("taskCategory").innerHTML=CATEGORIES.map(c=>`<option value="${c}">${categoryLabel(c)}</option>`).join("");
    $("taskCategory").value=task?taskCategory(task):(presetCategory||"Personal");
    $("taskProject").innerHTML=`<option value="">—</option>`+projects.map(p=>`<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)}</option>`).join("");
    $("taskProject").value=task?.project||"";
    $("taskDialog").showModal();
    $("taskName").focus();
  }
  function openHabitDialog(index=null) {
    $("habitForm").reset();
    $("habitIndex").value=index===null?"":String(index);
    const h=index===null?null:habits.items[index];
    $("habitName").value=h?.name||"";
    $("habitGoalValue").value=h?.goal||1;
    $("habitUnit").value=h?.unit||"";
    $("habitDialog").showModal();
  }
  function openProjectDialog() { $("projectForm").reset(); $("projectDialog").showModal(); }

  document.addEventListener("click", event => {
    const pageButton=event.target.closest("[data-page]");
    if(pageButton){navigate(pageButton.dataset.page);return;}
    const button=event.target.closest("[data-action]");
    if(!button)return;
    const action=button.dataset.action;
    if(action==="go-home") {event.preventDefault();navigate("home");}
    if(action==="go-organize") navigate("organize");
    if(action==="show-all-tasks") {currentFilter="All";currentProject=null;navigate("tasks");}
    if(action==="add-task") openTaskDialog();
    if(action==="close-dialog") button.closest("dialog")?.close();
    if(action==="toggle-language") {language=language==="en"?"es":"en";localStorage.setItem("myEverydayLanguage",language);applyTranslations();}
    if(action==="filter-category") {currentFilter=button.dataset.category;currentProject=null;navigate("tasks");}
    if(action==="set-filter") {currentFilter=button.dataset.filter;currentProject=null;renderTasksPage();}
    if(action==="edit-task") {const task=tasks.find(x=>x.id===button.dataset.id);if(task)openTaskDialog(task);}
    if(action==="delete-task") {
      if(confirm(t("deleteConfirm"))){tasks=tasks.filter(x=>x.id!==button.dataset.id);saveTasks();renderAll();showToast(t("taskDeleted"));}
    }
    if(action==="add-habit") openHabitDialog();
    if(action==="edit-habit") openHabitDialog(Number(button.dataset.index));
    if(action==="delete-habit") {
      if(confirm(t("deleteConfirm"))){habits.items.splice(Number(button.dataset.index),1);saveHabits();renderAll();showToast(t("habitDeleted"));}
    }
    if(action==="habit-plus") {
      const h=habits.items[Number(button.dataset.index)];
      if(!h)return;
      if(h.done>=h.goal){showToast(t("habitAlreadyDone"));return;}
      h.done++;saveHabits();renderAll();
    }
    if(action==="add-project") openProjectDialog();
    if(action==="delete-project") {
      if(confirm(t("deleteConfirm"))){projects=projects.filter(p=>p.id!==button.dataset.id);saveProjects();renderAll();showToast(t("projectDeleted"));}
    }
    if(action==="project-tasks") {currentFilter="All";currentProject=button.dataset.name;navigate("tasks");}
  });

  document.addEventListener("change", event => {
    if(event.target.matches('[data-action="toggle-task"]')){
      const task=tasks.find(x=>x.id===event.target.dataset.id);
      if(task){task.done=event.target.checked;saveTasks();renderAll();}
    }
    if(event.target.id==="calendarDate") renderCalendar();
  });

  $("taskForm").addEventListener("submit", event => {
    event.preventDefault();
    const name=$("taskName").value.trim();
    if(!name)return;
    const id=$("taskId").value;
    const existing=tasks.find(x=>x.id===id);
    const record={id:id||uid(),name,category:$("taskCategory").value,date:$("taskDate").value||"No date",done:existing?.done||false,project:$("taskProject").value};
    if(existing) Object.assign(existing,record); else tasks.unshift(record);
    saveTasks();$("taskDialog").close();renderAll();showToast(t("taskSaved"));
  });
  $("habitForm").addEventListener("submit", event => {
    event.preventDefault();
    const index=$("habitIndex").value;
    const record={name:$("habitName").value.trim(),goal:Math.max(1,Number($("habitGoalValue").value)||1),done:0,unit:$("habitUnit").value.trim()};
    if(index!==""){const old=habits.items[Number(index)];record.done=Math.min(old.done,record.goal);habits.items[Number(index)]=record;}
    else habits.items.push(record);
    saveHabits();$("habitDialog").close();renderAll();showToast(t("habitSaved"));
  });
  $("projectForm").addEventListener("submit", event => {
    event.preventDefault();
    const name=$("projectName").value.trim();
    if(!name)return;
    if(projects.some(p=>p.name.toLowerCase()===name.toLowerCase())){showToast(language==="es"?"Ese proyecto ya existe.":"That project already exists.");return;}
    projects.push({id:uid(),name});saveProjects();$("projectDialog").close();renderAll();showToast(t("projectCreated"));
  });
  $("languageBtn").addEventListener("click",()=>{language=language==="en"?"es":"en";localStorage.setItem("myEverydayLanguage",language);applyTranslations();});

  // One-time migration: preserve all existing tasks and habit progress.
  saveTasks();saveHabits();
  $("calendarDate").value=todayISO();
  applyTranslations();
})();
