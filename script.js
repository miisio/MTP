// Zbiór danych (do symulacji)
let peopleDB = [];
let vehicleDB = [];
let logs = [];

function showSearch(type) {
  // Ukrywa wszystkie formularze wyszukiwania
  document.getElementById("people-search").style.display = "none";
  document.getElementById("vehicle-search").style.display = "none";

  // Wyświetla odpowiedni formularz
  if (type === "people") {
    document.getElementById("people-search").style.display = "block";
  } else if (type === "vehicle") {
    document.getElementById("vehicle-search").style.display = "block";
  }
}

function showAdd(type) {
  // Ukrywa wszystkie formularze dodawania
  document.getElementById("add-person").style.display = "none";
  document.getElementById("add-vehicle").style.display = "none";

  // Wyświetla odpowiedni formularz dodawania
  if (type === "people") {
    document.getElementById("add-person").style.display = "block";
  } else if (type === "vehicle") {
    document.getElementById("add-vehicle").style.display = "block";
  }
}

function showLogs() {
  // Wyświetlanie logów
  document.getElementById("logs-container").style.display = "block";
  const logList = document.getElementById("logs");
  logList.innerHTML = "";
  logs.forEach(log => {
    const li = document.createElement("li");
    li.textContent = log;
    logList.appendChild(li);
  });
}

function addPerson() {
  const name = document.getElementById("new-person-name").value;
  const id = document.getElementById("new-person-id").value;
  if (name && id) {
    peopleDB.push({ name, id });
    logs.push(`Dodano osobę: ${name}, ID: ${id}`);
    alert("Osoba dodana!");
    document.getElementById("new-person-name").value = '';
    document.getElementById("new-person-id").value = '';
  }
}

function addVehicle() {
  const id = document.getElementById("new-vehicle-id").value;
  const owner = document.getElementById("new-vehicle-owner").value;
  if (id && owner) {
    vehicleDB.push({ id, owner });
    logs.push(`Dodano pojazd: ${id}, Właściciel: ${owner}`);
    alert("Pojazd dodany!");
    document.getElementById("new-vehicle-id").value = '';
    document.getElementById("new-vehicle-owner").value = '';
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
