const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();

  if (!task) {
    showError("⚠️ Please enter a task");
    return;
  }

  if (isTaskExists(task)) {
    showError("⚠️ Task already added. Check the list.");
    return;
  }

  addTask(task);
  saveTask(task);
  taskInput.value = "";
  errorMsg.style.display = "none";
});

taskInput.addEventListener("input", () => {
  errorMsg.style.display = "none";
});

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";

  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
}

function isTaskExists(taskText) {
  const tasks = getTasks();
  return tasks.includes(taskText);
}

function addTask(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.title = "Edit";
  editBtn.onclick = () => enterEditMode(li, taskSpan, taskText);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = "Delete";
  deleteBtn.onclick = () => {
    deleteTask(taskText); // Ensure the correct task is deleted
    li.remove(); // Remove the task from the DOM
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskSpan);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function enterEditMode(li, span, oldTask) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "edit-input";

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = '<i class="fas fa-check"></i>';
  saveBtn.title = "Save";

  const cancelBtn = document.createElement("button");
  cancelBtn.innerHTML = '<i class="fas fa-times"></i>';
  cancelBtn.title = "Cancel";

  const actionDiv = li.querySelector(".task-actions");
  actionDiv.innerHTML = ""; // Clear current buttons
  li.replaceChild(input, span);

  actionDiv.appendChild(saveBtn);
  actionDiv.appendChild(cancelBtn);

  saveBtn.onclick = () => {
    const newTask = input.value.trim();
    if (!newTask) {
      showError("⚠️ Task cannot be empty");
      return;
    }

    updateTask(oldTask, newTask);
    li.replaceChild(createSpan(newTask), input);
    actionDiv.innerHTML = ""; // Clear Save/Cancel buttons
    actionDiv.appendChild(createEditButton(newTask, li));
    actionDiv.appendChild(createDeleteButton(newTask, li));
  };

  cancelBtn.onclick = () => {
    li.replaceChild(createSpan(oldTask), input);
    actionDiv.innerHTML = ""; // Clear Save/Cancel buttons
    actionDiv.appendChild(createEditButton(oldTask, li));
    actionDiv.appendChild(createDeleteButton(oldTask, li));
  };
}

function createSpan(text) {
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;
  return span;
}

function createEditButton(task, li) {
  const btn = document.createElement("button");
  btn.innerHTML = '<i class="fas fa-pen"></i>';
  btn.title = "Edit";
  btn.onclick = () => {
    const span = li.querySelector(".task-text");
    enterEditMode(li, span, task);
  };
  return btn;
}

function createDeleteButton(task, li) {
  const btn = document.createElement("button");
  btn.innerHTML = '<i class="fas fa-trash"></i>';
  btn.title = "Delete";
  btn.onclick = () => {
    deleteTask(task);
    li.remove();
  };
  return btn;
}

function updateTask(oldTask, newTask) {
  const tasks = getTasks();
  const index = tasks.indexOf(oldTask);
  if (index !== -1) {
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function deleteTask(task) {
  let tasks = getTasks();
  tasks = tasks.filter((t) => t !== task); // Remove the task from the list
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach((task) => addTask(task));
}

/////////////////////////////////////////

// particles.js configuration
particlesJS("particles-js", {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "star",
      stroke: {
        width: 3,
        color: "#ffffff",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 300,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 0.1,
    },
    move: {
      enable: true,
      speed: 7,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
