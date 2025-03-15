var greenIcon = L.icon({
    iconUrl: './img/tankUA.svg',
    

    iconSize:     [19, 47], // size of the icon
    
    iconAnchor:   [11, 47], // point of the icon which will correspond to marker's location
   
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

document.addEventListener("DOMContentLoaded", function () {
    // Ініціалізація карти
    const map = L.map("map").setView([50.4501, 30.5234], 6); // Координати Києва

    // Додавання базового шару карти
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Додавання маркерів для міст
    L.marker([50.4501, 30.5234], {icon: greenIcon}).addTo(map)
        .bindPopup("Київ - столиця України");

    L.marker([49.8397, 24.0297]).addTo(map)
        .bindPopup("Львів - культурний центр");

    L.marker([48.9226, 24.7111]).addTo(map)
        .bindPopup("Івано-Франківськ - місто студентів");
});
