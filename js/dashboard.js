import { database } from './firebase-config.js';
import { ref, set, remove, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Post bus info
window.postBusInfo = function () {
  const id = document.getElementById("busId").value.trim();
  const route = document.getElementById("route").value.trim();
  const type = document.getElementById("type").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!id || !route || !type || !contact) {
    alert("Please fill all fields.");
    return;
  }

  set(ref(database, 'buses/' + id), {
    route,
    type,
    contact,
    postedAt: new Date().toLocaleString()
  }).then(() => {
    alert("Bus info posted successfully!");
    document.getElementById("busId").value = "";
    document.getElementById("route").value = "";
    document.getElementById("type").value = "";
    document.getElementById("contact").value = "";
    loadAllBuses();
  }).catch(err => {
    console.error(err);
    alert("Failed to post bus info.");
  });
}

// View all buses
function loadAllBuses() {
  const list = document.getElementById("busList");
  list.innerHTML = "Loading...";

  const dbRef = ref(database);
  get(child(dbRef, "buses")).then(snapshot => {
    list.innerHTML = '';
    if (snapshot.exists()) {
      const buses = snapshot.val();
      Object.keys(buses).forEach(busId => {
        const bus = buses[busId];
        const div = document.createElement("div");
        div.className = "bus-card";
        div.innerHTML = `
          <strong>${busId}</strong><br>
          Route: ${bus.route}<br>
          Type: ${bus.type}<br>
          Contact: ${bus.contact}<br>
          <button onclick="deleteBus('${busId}')"> Delete </button>
          <button><a href="js/map.html" style="text-decoration :none; color:white">map</a></button>
        `;
        list.appendChild(div);
      });
    } else {
      list.innerHTML = "No buses found.";
    }
  }).catch(error => {
    list.innerHTML = "Error loading buses.";
    console.error(error);
  });
}

window.deleteBus = function (busId) {
  if (confirm(`Are you sure you want to delete bus ${busId}?`)) {
    remove(ref(database, 'buses/' + busId)).then(() => {
      alert("Bus deleted successfully.");
      loadAllBuses();
    }).catch(err => {
      alert("Failed to delete bus.");
      console.error(err);
    });
  }
}
function trackLiveLocation(busId) {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      set(ref(database, `bus_locations/${busId}`), {
        latitude: lat,
        longitude: lng,
        lastUpdated: new Date().toLocaleString()
      });
    },
    (error) => {
      console.error("Geolocation error:", error);
    },
    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
  );
}


window.onload = loadAllBuses;
