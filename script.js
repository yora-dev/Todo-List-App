const addIcon = document.querySelector('.add-icon');
const taskInput = document.getElementById('input');
const card = document.querySelector('.card');
let themeIconSun = document.querySelector('.sun');
let themeIconMoon = document.querySelector('.moon');

// --- Load tasks and theme from localStorage on page load ---
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadTheme();
});

// --- Add task ---
function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue === '') {
    alert('Please enter a task');
    return;
  }

  const taskObj = {
    id: Date.now(),       // unique id
    text: taskValue,
    completed: false
  };

  let tasks = getTasksFromStorage();
  tasks.push(taskObj);
  saveTasksToStorage(tasks);

  renderTask(taskObj);
  taskInput.value = '';
  taskInput.focus();
}

// --- Render a single task in the DOM ---
function renderTask(taskObj) {
  const taskContainer = document.createElement('div');
  taskContainer.className = 'task-container';
  taskContainer.dataset.id = taskObj.id;

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.id = 'check';
  radio.checked = taskObj.completed;

  const taskText = document.createElement('p');
  taskText.className = 'task';
  taskText.textContent = taskObj.text;
  taskText.style.textDecoration = taskObj.completed ? 'line-through' : 'none';
  taskText.style.color = taskObj.completed ? 'var(--Purple-600)' : 'var(--task-color)';

  const cross = document.createElement('img');
  cross.src = 'images/icon-cross.svg';
  cross.alt = 'Delete';
  cross.className = 'cross';

  // Add elements to container
  taskContainer.appendChild(radio);
  taskContainer.appendChild(taskText);
  taskContainer.appendChild(cross);
  card.appendChild(taskContainer);

  // Event listeners
  cross.addEventListener('click', () => removeTask(taskObj.id));
  radio.addEventListener('click', () => toggleComplete(taskObj.id, radio, taskText));
}

// --- Remove task ---
function removeTask(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToStorage(tasks);

  const taskEl = card.querySelector(`.task-container[data-id='${id}']`);
  if (taskEl) taskEl.remove();
}

// --- Toggle completion ---
function toggleComplete(id, radioEl, taskTextEl) {
  let tasks = getTasksFromStorage();
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  saveTasksToStorage(tasks);

  if (task.completed) {
    // Replace radio with check image
    const checkImg = document.createElement('img');
    checkImg.src = 'images/icon-check.svg';
    checkImg.className = 'check';
    checkImg.addEventListener('click', () => toggleComplete(id, checkImg, taskTextEl));
    radioEl.parentNode.replaceChild(checkImg, radioEl);

    taskTextEl.style.textDecoration = 'line-through';
    taskTextEl.style.color = 'var(--Purple-600)';
  } else {
    // Replace check image with radio
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = 'check';
    radio.addEventListener('click', () => toggleComplete(id, radio, taskTextEl));
    if (radioEl.tagName.toLowerCase() === 'img') {
      radioEl.parentNode.replaceChild(radio, radioEl);
    }
    taskTextEl.style.textDecoration = 'none';
    taskTextEl.style.color = 'var(--task-color)';
  }
}

// --- Get tasks from localStorage ---
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// --- Save tasks to localStorage ---
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- Load tasks on page load ---
function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => renderTask(task));
}

// --- Theme toggle ---
themeIconSun.addEventListener('click', themeToggle);
themeIconMoon.addEventListener('click', themeToggle);

function themeToggle() {
  document.body.classList.toggle('dark-theme');
  themeIconSun.classList.toggle('sunh');
  themeIconMoon.classList.toggle('moonh');

  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// --- Load theme from localStorage ---
function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIconSun.classList.add('sunh');
    themeIconMoon.classList.add('moonh');
  } else {
    document.body.classList.remove('dark-theme');
    themeIconSun.classList.remove('sunh');
    themeIconMoon.classList.remove('moonh');
  }
}

// --- Event listeners for adding tasks ---
addIcon.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
