async function loadPersonnel() {
    let response = await fetch("/personnel/");
    let personnel = await response.json();
    let table = document.getElementById("personnelTable");

    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Rank</th>
            <th>Birth Date</th>
            <th>Actions</th>
        </tr>
    `;

    let rankCounts = {};

    personnel.forEach(person => {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${person.id}</td>
            <td><input type="text" value="${person.full_name}" id="name-${person.id}"></td>
            <td><input type="text" value="${person.rank}" id="rank-${person.id}"></td>
            <td><input type="date" value="${person.birth_date}" id="birth-${person.id}"></td>
            <td>
                <button onclick="updatePersonnel(${person.id})">Update</button>
                <button onclick="deletePersonnel(${person.id})">Delete</button>
            </td>
        `;

        rankCounts[person.rank] = (rankCounts[person.rank] || 0) + 1;
    });

    renderChart(rankCounts);
}

async function addPersonnel() {
    let fullName = document.getElementById("fullName").value;
    let rank = document.getElementById("rank").value;
    let birthDate = document.getElementById("birthDate").value;

    await fetch("/personnel/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, rank: rank, birth_date: birthDate })
    });

    loadPersonnel();
}

async function updatePersonnel(id) {
    let fullName = document.getElementById(`name-${id}`).value;
    let rank = document.getElementById(`rank-${id}`).value;
    let birthDate = document.getElementById(`birth-${id}`).value;

    await fetch(`/personnel/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, rank: rank, birth_date: birthDate })
    });

    loadPersonnel();
}

async function deletePersonnel(id) {
    await fetch(`/personnel/${id}/`, { method: "DELETE" });
    loadPersonnel();
}

function renderChart(rankCounts) {
    let ctx = document.getElementById('rankChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(rankCounts),
            datasets: [{ label: "Personnel Count", data: Object.values(rankCounts), backgroundColor: "blue" }]
        }
    });
}

loadPersonnel();
