document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:8000/data";
  let map; // Глобальна змінна для карти
  let markersLayer = new L.LayerGroup(); // Група маркерів для оновлення

  async function fetchData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Помилка завантаження даних");
      }
      const result = await response.json();
      updateDashboard(result.data);
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  }

  function updateDashboard(data) {
    updateInfoCards(data);
    updateBarChart(data);
    updateMap(data);
  }

  function updateInfoCards(data) {
    const infoCards = document.getElementById("info-cards");
    infoCards.innerHTML = "";

    // Агрегуємо дані по локаціях
    const locationSummary = {};
    data.forEach((entry) => {
      if (!locationSummary[entry.location]) {
        locationSummary[entry.location] = 0;
      }
      locationSummary[entry.location] += entry.data_field;
    });

    // Відображаємо картки
    Object.entries(locationSummary).forEach(([location, total]) => {
      const card = document.createElement("div");
      card.className = "info-box";
      card.innerHTML = `<strong>Локація ${location}</strong>: ${total}`;
      infoCards.appendChild(card);
    });
  }

  function updateBarChart(data) {
    const labels = [...new Set(data.map((item) => item.date))]; // Унікальні дати
    const locations = [...new Set(data.map((item) => item.location))]; // Унікальні локації

    const datasets = locations.map((location) => ({
      label: `Локація ${location}`,
      data: labels.map((date) => {
        const found = data.find(
          (entry) => entry.date === date && entry.location === location
        );
        return found ? found.data_field : 0;
      }),
      backgroundColor: getRandomColor(0.6),
      borderColor: getRandomColor(),
      borderWidth: 1,
    }));

    const ctx = document.getElementById("chart1").getContext("2d");
    if (window.myChart) {
      window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true },
          y: { beginAtZero: true, stacked: true },
        },
      },
    });
  }

  function updateMap() {
    if (!map) {
      const map = L.map("map").setView([48.3794, 31.1656], 6); // Центр України
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      // Приклад маркерів для груп (можна замінити реальними даними)
      const locations = [
        { coords: [50.4501, 30.5234], group: "Group A" }, // Київ
        { coords: [49.8397, 24.0297], group: "Group B" }, // Львів
        { coords: [46.4825, 30.7233], group: "Group C" }, // Одеса
      ];

      locations.forEach((loc) => {
        L.marker(loc.coords).addTo(map).bindPopup(loc.group);
      });
    }  
    };

   
  

  function getRandomColor(alpha = 1) {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, ${alpha})`;
  }

  fetchData();
  setInterval(fetchData, 30000); // Оновлення кожні 30 секунд
});
