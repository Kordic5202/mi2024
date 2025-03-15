let my_data = [30, 40, 20];

document.addEventListener("DOMContentLoaded", function () {
    const ctxLine = document.getElementById("lineChart").getContext("2d");
    new Chart(ctxLine, {
        type: "line",
        data: {
            labels: ["Січень", "Лютий", "Березень", "Квітень", "Травень"],
            datasets: [{
                label: "Продажі",
                data: [10, 20, 15, 25, 30],
                borderColor: "#007bff",
                fill: false
            }]
        }
    });

    const ctxBar = document.getElementById("barChart").getContext("2d");
    new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: ["A", "B", "C", "D", "E"],
            datasets: [{
                label: "Студенти",
                data: [25, 20, 30, 18, 27],
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        }
    });

    const ctxPie = document.getElementById("pieChart").getContext("2d");
    new Chart(ctxPie, {
        type: "pie",
        data: {
            labels: ["Молодший", "Середній", "Старший"],
            datasets: [{
                data: my_data,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }]
        }
    });
});
