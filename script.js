document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    const btnGo = document.getElementById('BtnGo');
    btnGo.addEventListener('click', handleGoButtonClick);

    const inputText = document.getElementById('inputText');
    inputText.addEventListener('input', () => {
        renderFilteredData(inputText.value);
    });

    const dropDownOptions = document.querySelectorAll('.dropdown-item');
    dropDownOptions.forEach(option => {
        option.addEventListener('click', () => {
            dropDownOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');

            renderFilteredData(inputText.value, option.id);
        });
    });
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
    table.classList.add('table', 'table-bordered');

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

function renderFilteredData(searchText, filterOption) {
    fetchData();
    const inputText = document.getElementById('inputText');
    const dropDownOptionElement = document.querySelector('.dropdown-item.active');
    const dropDownOption = dropDownOptionElement ? dropDownOptionElement.id : '';

    const filteredData = filterUsers(data, searchText, dropDownOption);

    renderUserItems(filteredData);
}

function handleGoButtonClick(event) {
    event.preventDefault();
    const inputText = document.getElementById('inputText');
    const dropDownOptionElement = document.querySelector('.dropdown-item.active');
    const dropDownOption = dropDownOptionElement ? dropDownOptionElement.id : '';

    renderFilteredData(inputText.value, dropDownOption);
}

function filterUsers(data, searchText, filterOption) {
    const lowerSearchText = searchText.toLowerCase();
    return data.filter(user =>
        (filterOption === 'dropName' && user.name.toLowerCase().includes(lowerSearchText)) ||
        (filterOption === 'dropUsername' && user.username.toLowerCase().includes(lowerSearchText)) ||
        (filterOption === 'dropEmail' && user.email.toLowerCase().includes(lowerSearchText)) ||
        (!filterOption && (user.name.toLowerCase().includes(lowerSearchText) ||
            user.email.toLowerCase().includes(lowerSearchText) ||
            user.username.toLowerCase().includes(lowerSearchText)))
    );
}
