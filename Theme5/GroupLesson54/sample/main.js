// Додаємо обробник подій для плавної навігації
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll("nav ul li a");
    
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Дані для візуалізації
    const groupsData = {
        labels: ["Група A", "Група B", "Група C", "Група D", "Група E"],
        datasets: [{
            label: "Кількість студентів",
            data: [25, 20, 30, 18, 27],
            backgroundColor: "rgba(54, 162, 235, 0.6)"
        }]
    };

    const ranksData = {
        labels: ["Молодший", "Середній", "Старший"],
        datasets: [{
            label: "Розподіл студентів за рангами",
            data: [50, 40, 30],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
    };

    // Побудова стовпчикового графіка (кількість студентів за групами)
    const barChartCtx = document.getElementById("barChart").getContext("2d");
    new Chart(barChartCtx, {
        type: "bar",
        data: groupsData,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Побудова кругової діаграми (розподіл студентів за званнями)
    const pieChartCtx = document.getElementById("pieChart").getContext("2d");
    new Chart(pieChartCtx, {
        type: "pie",
        data: ranksData,
        options: {
            responsive: true
        }
    });
});
