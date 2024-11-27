// Zbiór danych (przechowywanie w localStorage)
let peopleDB = JSON.parse(localStorage.getItem('peopleDB')) || [];
let vehicleDB = JSON.parse(localStorage.getItem('vehicleDB')) || [];
let logs = JSON.parse(localStorage.getItem('logs')) || [];

window.onload = function() {
  renderData(); // Przy ładowaniu strony odśwież dane
};

// Renderowanie danych na stronie
function renderData() {
  // Renderowanie osób
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "none"; // Ukryj sekcję wyników wyszukiwania

  // Renderowanie danych w logach
  const logList = document.getElementById("logs");
  logList.innerHTML = "";
  logs.forEach(log => {
    const li = document.createElement("li");
    li.textContent = log;
    logList.appendChild(li);
  });

  // Renderowanie listy osób w bazie danych
  const peopleList = peopleDB.map(person => `${person.name} (ID: ${person.id})`).join("\n");
  document.getElementById("result").textContent = peopleList || "Brak osób w bazie danych.";
}

function showSearch(type) {
  document.getElementById("people-search").style.display = "none";
  document.getElementById("vehicle-search").style.display = "none";

  if (type === "people") {
    document.getElementById("people-search").style.display = "block";
  } else if (type === "vehicle") {
    document.getElementById("vehicle-search").style.display = "block";
  }
}

function showAdd(type) {
  document.getElementById("add-person").style.display = "none";
  document.getElementById("add-vehicle").style.display = "none";

  if (type === "people") {
    document.getElementById("add-person").style.display = "block";
  } else if (type === "vehicle") {
    document.getElementById("add-vehicle").style.display = "block";
  }
}

function showLogs() {
  document.getElementById("logs-container").style.display = "block";
  renderData();
}

function addPerson() {
  const name = document.getElementById("new-person-name").value;
  const id = document.getElementById("new-person-id").value;
  
  if (name && id) {
    peopleDB.push({ name, id });
    logs.push(`Dodano osobę: ${name}, ID: ${id}`);
    localStorage.setItem('peopleDB', JSON.stringify(peopleDB));
    localStorage.setItem('logs', JSON.stringify(logs));
    alert("Osoba dodana!");
    document.getElementById("new-person-name").value = '';
    document.getElementById("new-person-id").value = '';
    renderData();
  }
}

function addVehicle() {
  const id = document.getElementById("new-vehicle-id").value;
  const owner = document.getElementById("new-vehicle-owner").value;
  
  if (id && owner) {
    vehicleDB.push({ id, owner });
    logs.push(`Dodano pojazd: ${id}, Właściciel: ${owner}`);
    localStorage.setItem('vehicleDB', JSON.stringify(vehicleDB));
    localStorage.setItem('logs', JSON.stringify(logs));
    alert("Pojazd dodany!");
    document.getElementById("new-vehicle-id").value = '';
    document.getElementById("new-vehicle-owner").value = '';
    renderData();
  }
}

function searchPerson() {
  const name = document.getElementById("person-name").value;
  const result = peopleDB.filter(person => person.name.toLowerCase().includes(name.toLowerCase()));
  displayResult(result.length > 0 ? result : "Nie znaleziono osoby.");
}

function searchVehicle() {
  const id = document.getElementById("vehicle-id").value;
  const result = vehicleDB.filter(vehicle => vehicle.id.toLowerCase().includes(id.toLowerCase()));
  displayResult(result.length > 0 ? result : "Nie znaleziono pojazdu.");
}

function displayResult(result) {
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";
  document.getElementById("result").textContent = JSON.stringify(result, null, 2);
}
