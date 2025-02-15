const tasks = [];

function addTask() {
    if (!validateForm()) {
        return;
    }

    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('default-datepicker').value;
    const priority = document.getElementById('priority').value;

    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');
    newRow.classList.add('bg-white');

    let priorityClass = '';
    if (priority === 'High') {
        priorityClass = 'text-red-500';
    } else if (priority === 'Medium') {
        priorityClass = 'text-yellow-500';
    } else if (priority === 'Low') {
        priorityClass = 'text-green-500';
    }

    newRow.innerHTML = `
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${taskName}
        </th>
        <td class="px-6 py-4">${dueDate}</td>
        <td class="px-6 py-4 ${priorityClass}">${priority}</td>
        <td>
            <div>
                <button
                    class="bg-yellow-400 w-24 p-2 rounded-md text-white font-bold text-sm text-center hover:bg-yellow-300 cursor-pointer transition-all duration-300"
                    onclick="toggleStatus(this)"
                >
                    Pending
                </button>
            </div>
        </td>
    `;

    tableBody.appendChild(newRow);
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

    if (!dueDateFormatted) {
        errors.push('Due date is required.');
    } else if (dueDateFormatted < currentDateFormatted) {
        errors.push('Due date cannot be in the past.');
    }

    if (!priority) {
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

function toggleStatus(button) {
    if (button.innerText === "Pending") {
        button.innerText = "Completed";
        button.classList.remove("bg-yellow-400", "hover:bg-yellow-300", "w-24");
        button.classList.add("bg-green-500", "hover:bg-green-300", "w-26");
    } else {
        button.innerText = "Pending";
        button.classList.remove("bg-green-500", "hover:bg-green-300", "w-26");
        button.classList.add("bg-yellow-400", "hover:bg-yellow-300", "w-24");
    }
}