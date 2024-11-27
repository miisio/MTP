// Zbiór danych (przechowywanie w localStorage)
let peopleDB = JSON.parse(localStorage.getItem('peopleDB')) || [];
let vehicleDB = JSON.parse(localStorage.getItem('vehicleDB')) || [];
let logs = JSON.parse(localStorage.getItem('logs')) || [];

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
    localStorage.setItem('peopleDB', JSON.stringify(peopleDB));
    localStorage.setItem('logs', JSON.stringify(logs));
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
    localStorage.setItem('vehicleDB', JSON.stringify(vehicleDB));
    localStorage.setItem('logs', JSON.stringify(logs));
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
