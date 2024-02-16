document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        renderUserItems(data);
    } catch (error) {
        console.error(error);
    }
}

function renderUserItems(data) {
    const EleBox = document.getElementById('box');
    EleBox.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'mx-auto');

    const headerRow = table.createTHead().insertRow();
    const columnNames = ['ID', 'Name', 'Email', 'Username'];

    columnNames.forEach(columnName => {
        const th = document.createElement('th');
        th.textContent = columnName;
        headerRow.appendChild(th);
    });

    data.forEach(user => {
        renderUserItem(user, table);
    });

    EleBox.appendChild(table);
}

function renderUserItem(user, container) {
    const row = container.insertRow();
    row.insertCell(0).textContent = user.id;
    row.insertCell(1).textContent = user.name;
    row.insertCell(2).textContent = user.email;
    row.insertCell(3).textContent = user.username;
}
