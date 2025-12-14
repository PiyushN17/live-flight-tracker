let container = document.getElementById('container');
let airSearch = document.getElementById('airSearch');
let numSearch = document.getElementById('numSearch');
let fromToInput = document.getElementById('fromToInput');
let specificSearch = document.getElementById('specificSearch');
let error = document.getElementById('error');
let serial = document.getElementById('serial');
let airlineName = document.getElementById('airlineName');
let deptCode = document.getElementById('deptCode');
let deptName = document.getElementById('deptName');
let arrCode = document.getElementById('arrCode');
let arrName = document.getElementById('arrName');
let flightStatus = document.getElementById('status');
let airStat = document.getElementById('airStat');
let statDesc = document.getElementById('statDesc');
let loader = document.getElementById('loader');
let airName = document.getElementById('airName');
let icao = document.getElementById('icao');
let airName2 = document.getElementById('airName2');
let icao2 = document.getElementById('icao2');
let schTime = document.getElementById('schTime');
let estTime = document.getElementById('estTime');
let actTime = document.getElementById('actTime');
let runTime = document.getElementById('runTime');
let schTime2 = document.getElementById('schTime2');
let estTime2 = document.getElementById('estTime2');
let actTime2 = document.getElementById('actTime2');
let runTime2 = document.getElementById('runTime2');
let term = document.getElementById('term');
let gate = document.getElementById('gate');
let term2 = document.getElementById('term2');
let gate2 = document.getElementById('gate2');
let departTimeZone = document.getElementById('departTimeZone');
let arrTimeZone = document.getElementById('arrTimeZone');
let flightNum = document.getElementById('flightNum');
let srch = document.getElementById('srch');
let map = document.getElementById('map');
let mapShow = document.getElementById('mapShow');
let currentFlight = null;

container.style.display = 'none';

srch.addEventListener('click', function() {
    if(flightNum.value === '') {
        error.innerText = 'Please enter a valid flight number';
        return;
    }
    else {
        const API_URL2 = `https://api.aviationstack.com/v1/flights?access_key=2608bd27490a99d6609100de0a81958f&flight_iata=${flightNum.value.trim()}&limit=1`;
        loader.hidden = false;
        flightDetails(API_URL2);
    }
});

async function flightDetails(API_URL) {
    try {
        let output = await fetch(API_URL);
        let response = await output.json();

        loader.hidden = true;

        if (response.error) {
            error.innerText = response.error.message;
            container.style.display = 'none';
            return;
        }

        if (!response.data || response.data.length === 0) {
            error.innerText = 'Enter valid flight number!';
            container.style.display = 'none';
            return;
        }
        const flight = response.data[0];
        error.innerText = '';
        loader.hidden = true;
        container.style.display = 'flex';
        serial.innerText = flight.flight.icao;
        airlineName.innerText = flight.airline.name;
        deptCode.innerText = flight.departure.iata;
        deptName.innerText = flight.departure.airport.slice(0, 25) + '.';
        arrCode.innerText = flight.arrival.iata;
        arrName.innerText = flight.arrival.airport.slice(0, 25) + '.';
        if (flight.flight_status === 'scheduled') {
            flightStatus.style.backgroundColor = 'grey';
            airStat.innerText = 'Scheduled';
            statDesc.innerText = 'On Time';
        }
        else if (flight.flight_status === 'cancelled') {
            flightStatus.style.backgroundColor = 'red';
            airStat.innerText = 'Cancelled';
            statDesc.innerText = '';
        }
        else if (flight.flight_status === 'landed') {
            flightStatus.style.backgroundColor = 'green';
            airStat.innerText = 'Landed';
            statDesc.innerText = '';
        }
        else if (flight.flight_status === 'diverted') {
            flightStatus.style.backgroundColor = 'orange';
            airStat.innerText = 'Diverted';
            statDesc.innerText = '';
        }
        else if (flight.flight_status === 'active') {
            flightStatus.style.backgroundColor = 'green';
            airStat.innerText = 'Airborne';
            statDesc.innerText = 'On Time';
        }
        airName.innerText = flight.departure.airport;
        icao.innerText = `IATA: ${flight.departure.iata} ● ICAO: ${flight.departure.icao}`;
        airName2.innerText = flight.arrival.airport;
        icao2.innerText = `IATA: ${flight.arrival.iata} ● ICAO: ${flight.arrival.icao}`;




        if (flight.departure.scheduled === null) {
            schTime.innerText = 'Not Available';
        }
        else {
            const time1 = new Date(flight.departure.scheduled.replace("+00:00", ""));
            const formatted = time1.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            schTime.innerText = formatted;
        }

        if (flight.departure.estimated === null) {
            estTime.innerText = 'Not Available';
        }
        else {
            const time2 = new Date(flight.departure.scheduled.replace("+00:00", ""));
            const formatted = time2.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            estTime.innerText = formatted;
        }



        if (flight.departure.actual === null) {
            actTime.innerText = 'Not Available';
        }
        else {
            const time3 = new Date(flight.departure.scheduled.replace("+00:00", ""));
            const formatted = time3.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            actTime.innerText = formatted;
        }

        if (flight.departure.actual_runway === null) {
            runTime.innerText = 'Not Available';
        }
        else {
            const time4 = new Date(flight.departure.scheduled.replace("+00:00", ""));
            const formatted = time4.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            runTime.innerText = formatted;
        }

        if (flight.departure.terminal === null) {
            term.innerText = 'Terminal: Not Available';
        }
        else {
            term.innerText = `Terminal: ${flight.departure.terminal}`;
        }

        if (flight.departure.gate === null) {
            gate.innerText = 'Gate: Not Available';
        }
        else {
            gate.innerText = `Gate: ${flight.departure.gate}`;
        }


        if (flight.arrival.scheduled === null) {
            schTime2.innerText = 'Not Available';
        }
        else {
            const time5 = new Date(flight.arrival.scheduled.replace("+00:00", ""));
            const formatted = time5.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            schTime2.innerText = formatted;
        }

        if (flight.arrival.estimated === null) {
            estTime2.innerText = 'Not Available';
        }
        else {
            const time6 = new Date(flight.arrival.scheduled.replace("+00:00", ""));
            const formatted = time6.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            estTime2.innerText = formatted;
        }

        if (flight.arrival.actual === null) {
            actTime2.innerText = 'Not Available';
        }
        else {
            const time7 = new Date(flight.arrival.scheduled.replace("+00:00", ""));
            const formatted = time7.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            actTime2.innerText = formatted;
        }

        if (flight.arrival.actual_runway === null) {
            runTime2.innerText = 'Not Available';
        }
        else {
            const time8 = new Date(flight.arrival.scheduled.replace("+00:00", ""));
            const formatted = time8.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            runTime2.innerText = formatted;
        }

        if (flight.arrival.terminal === null) {
            term2.innerText = 'Terminal: Not Available';
        }
        else {
            term2.innerText = `Terminal: ${flight.arrival.terminal}`;
        }

        if (flight.arrival.gate === null) {
            gate2.innerText = 'Gate: Not Available';
        }
        else {
            gate2.innerText = `Gate: ${flight.arrival.gate}`;
        }

        departTimeZone.innerText = `Departure Timezone: ${flight.departure.timezone}`;
        arrTimeZone.innerText = ` ● Arrival Timezone: ${flight.arrival.timezone}`;

        currentFlight = flight;

        if (currentFlight.live !== null) {
            mapShow.hidden = false;
        } else {
            mapShow.hidden = true;
        }


        
    }
    catch(e) {
        loader.hidden = true;
        error.innerText = 'Network error. Please try again.';
        container.style.display = 'none';
    }
}

mapShow.addEventListener('click', function() {
    if(!currentFlight || !currentFlight.live) return;
    showMap(currentFlight.live.latitude, currentFlight.live.longitude);
});


function showMap(lat, lng) {
    map.hidden = false;
    const leafletMap = L.map('map').setView([lat, lng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap);

    L.marker([lat, lng]).addTo(leafletMap);

}
