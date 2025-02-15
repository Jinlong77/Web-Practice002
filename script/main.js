


const tasks = [];

function addTask() {
    if (!validateForm()) {
        return;
    }

    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('default-datepicker').value;
    const priority = document.getElementById('priority').value;

    const newTask = {
        taskName,
        dueDate,
        priority,
        status: 'Pending'
    };

    tasks.push(newTask);
    renderTasks();
}

function renderTasks() {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        const newRow = document.createElement('tr');
        newRow.classList.add('bg-white');

        let priorityClass = '';
        if (task.priority === 'High') {
            priorityClass = 'text-red-500';
        } else if (task.priority === 'Medium') {
            priorityClass = 'text-yellow-500';
        } else if (task.priority === 'Low') {
            priorityClass = 'text-green-500';
        }

        newRow.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${task.taskName}
            </th>
            <td class="px-6 py-4">${task.dueDate}</td>
            <td class="px-6 py-4 ${priorityClass}">${task.priority}</td>
            <td>
                <div>
                    <button
                        class="p-2 rounded-md text-white font-bold text-sm text-center cursor-pointer ${task.status === 'Pending' ? 'bg-yellow-400 hover:bg-yellow-600 w-24' : 'bg-green-400 hover:bg-green-700 w-32'} transition-all duration-300"
                        style="transition: width 0.4s; width: ${task.status === 'Pending' ? '6rem' : '8rem'};"
                        onclick="toggleStatus(${index})"
                    >
                        ${task.status}
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(newRow);
    }
}

function toggleStatus(index) {
    const task = tasks[index];
    const button = document.querySelectorAll('table tbody tr')[index].querySelector('button');

    if (task.status === "Pending") {
        task.status = "Completed";
        button.style.width = '8rem';
    } else {
        task.status = "Pending";
        button.style.width = '6rem';
    }

    setTimeout(() => {
        renderTasks();
    }, 400);
}

function validateForm() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('default-datepicker').value;
    const priority = document.getElementById('priority').value;
    const errorMessage = document.getElementById('error-message');
    const currentDate = new Date().toISOString().split('T')[0];
    const currentDateFormatted = formatDate(currentDate);
    const dueDateFormatted = formatDate(dueDate);

    let errors = [];

    if (!taskName) {
        errors.push('Task name is required.');
    }

    if (!dueDate) {
        errors.push('Due date is required.');
    } else if (dueDateFormatted < currentDateFormatted) {
        errors.push('Due date cannot be in the past.');
    }

    if (priority === 'Select Priority') {
        errors.push('Priority is required.');
    }

    if (errors.length > 0) {
        errorMessage.innerHTML = errors.join('<br>');
        return false;
    }

    errorMessage.innerHTML = '';
    return true;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}