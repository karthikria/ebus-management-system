import { database } from './firebase-config.js';
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

window.searchBus = function () {
  const source = document.getElementById("source").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = '';

  const dbRef = ref(database);
  get(child(dbRef, "buses")).then(snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.keys(data).forEach(busId => {
        const bus = data[busId];
        if (bus.route.toLowerCase().includes(source)) {
          const div = document.createElement("div");
          div.className = "bus-card";
          div.innerHTML = `
            <strong>${busId}</strong><br>
            Route: ${bus.route}<br>
            Type: ${bus.type}<br>
            Contact: ${bus.contact}
            <button><a href="js/map.html">map</a></button>
          `;
          
          results.appendChild(div);
        }
      });
    } else {
      results.innerHTML = "No matching buses found.";
    }
  }).catch(error => {
    results.innerHTML = "Error retrieving data.";
    console.error(error);
  });
}

