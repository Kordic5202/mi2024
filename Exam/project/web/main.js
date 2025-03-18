async function fetchData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/data");
        const result = await response.json();
        const data = result.data || result; // Adjust depending on API response format

        const tableBody = document.querySelector("#data-table tbody");
        tableBody.innerHTML = ""; // Clear table before adding data

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.date}</td>
                <td>${item.location}</td>
                <td>${item.ammo_used}</td>
                <td>${item.enemy_losses_personnel}</td>
                <td>${item.enemy_losses_equipment}</td>
                <td>${item.enemy_losses_tank}</td>
                <td>${item.enemy_losses_apc}</td>
                <td>${item.enemy_losses_artillery}</td>
                <td>${item.enemy_losses_trucks}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchData());