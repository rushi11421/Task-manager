document.addEventListener('DOMContentLoaded', function() {
    // Initialize FullCalendar
    var calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth'
        });
        calendar.render();
    }

    updateCompletionMessage();

    // Event listeners for project and task management
    document.getElementById('project-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            removeProject(e.target);
        }
    });

    document.getElementById('task-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            removeTask(e.target);
        } else if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            completeTask(e.target);
        }
    });
});

function addProject() {
    const projectList = document.getElementById('project-list');
    const newProject = document.getElementById('new-project').value;
    if (newProject.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `${newProject} <button onclick="removeProject(this)">Remove</button>`;
        projectList.appendChild(li);
        document.getElementById('new-project').value = '';
    }
}

function removeProject(button) {
    const li = button.parentElement;
    li.remove();
}

function addTask() {
    const taskList = document.getElementById('task-list');
    const newTask = document.getElementById('new-task').value;
    if (newTask.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" onclick="completeTask(this)"> ${newTask} <button onclick="removeTask(this)">Remove</button>`;
        taskList.appendChild(li);
        document.getElementById('new-task').value = '';
        updateCompletionMessage();
    }
}

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
    updateCompletionMessage();
}

function completeTask(checkbox) {
    const task = checkbox.parentElement;
    if (checkbox.checked) {
        task.style.textDecoration = 'line-through';
    } else {
        task.style.textDecoration = 'none';
    }
    updateCompletionMessage();
}

function updateCompletionMessage() {
    const tasks = document.querySelectorAll('#task-list li');
    const completedTasks = document.querySelectorAll('#task-list li input:checked').length;
    const pendingTasks = tasks.length - completedTasks;
    const completionPercentage = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

    const message = `Completed Tasks: ${completedTasks}, Pending Tasks: ${pendingTasks}, Completion: ${completionPercentage}%`;
    document.getElementById('completion-message').innerText = message;
}
