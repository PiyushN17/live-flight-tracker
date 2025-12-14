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
    }
    else {
        const API_URL2 = `https://api.aviationstack.com/v1/flights?access_key=2fb03d59de8fab114e87f2b6b7b5616a&flight_iata=${flightNum.value.trim()}&limit=1`;
        loader.hidden = false;
        flightDetails(API_URL2);
    }
});

async function flightDetails(API_URL) {
    try {
        let output = await fetch(API_URL);
        let response = await output.json();
        console.log(response.data[0]);
        loader.hidden = true;
        container.style.display = 'flex';
        serial.innerText = response.data[0].flight.icao;
        airlineName.innerText = response.data[0].airline.name;
        deptCode.innerText = response.data[0].departure.iata;
        deptName.innerText = response.data[0].departure.airport.slice(0, 25) + '.';
        arrCode.innerText = response.data[0].arrival.iata;
        arrName.innerText = response.data[0].arrival.airport.slice(0, 25) + '.';
        if (response.data[0].flight_status === 'scheduled') {
            flightStatus.style.backgroundColor = 'grey';
            airStat.innerText = 'Scheduled';
            statDesc.innerText = 'On Time';
        }
        else if (response.data[0].flight_status === 'cancelled') {
            flightStatus.style.backgroundColor = 'red';
            airStat.innerText = 'Cancelled';
            statDesc.innerText = '';
        }
        else if (response.data[0].flight_status === 'landed') {
            flightStatus.style.backgroundColor = 'green';
            airStat.innerText = 'Landed';
            statDesc.innerText = '';
        }
        else if (response.data[0].flight_status === 'diverted') {
            flightStatus.style.backgroundColor = 'orange';
            airStat.innerText = 'Diverted';
            statDesc.innerText = '';
        }
        else if (response.data[0].flight_status === 'active') {
            flightStatus.style.backgroundColor = 'green';
            airStat.innerText = 'Airborne';
            statDesc.innerText = 'On Time';
        }
        airName.innerText = response.data[0].departure.airport;
        icao.innerText = `IATA: ${response.data[0].departure.iata} ● ICAO: ${response.data[0].departure.icao}`;
        airName2.innerText = response.data[0].arrival.airport;
        icao2.innerText = `IATA: ${response.data[0].arrival.iata} ● ICAO: ${response.data[0].arrival.icao}`;




        if(response.data[0].departure.scheduled === null) {
            schTime.innerText = 'Not Available';
        }
        else{
            const time1 = new Date(response.data[0].departure.scheduled.replace("+00:00", ""));
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

        if(response.data[0].departure.estimated === null) {
            estTime.innerText = 'Not Available';
        }
        else{
            const time2 = new Date(response.data[0].departure.scheduled.replace("+00:00", ""));
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



        if(response.data[0].departure.actual === null) {
            actTime.innerText = 'Not Available';
        }
        else {
            const time3 = new Date(response.data[0].departure.scheduled.replace("+00:00", ""));
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

        if(response.data[0].departure.actual_runway === null) {
            runTime.innerText = 'Not Available';
        }
        else {
            const time4 = new Date(response.data[0].departure.scheduled.replace("+00:00", ""));
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

        if(response.data[0].departure.terminal === null) {
            term.innerText = 'Terminal: Not Available';
        }
        else {
            term.innerText = `Terminal: ${response.data[0].departure.terminal}`;
        }

        if(response.data[0].departure.gate === null) {
            gate.innerText = 'Gate: Not Available';
        }
        else {
            gate.innerText = `Gate: ${response.data[0].departure.gate}`;
        }


        if(response.data[0].arrival.scheduled === null) {
            schTime2.innerText = 'Not Available';
        }
        else{
            const time5 = new Date(response.data[0].arrival.scheduled.replace("+00:00", ""));
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

        if(response.data[0].arrival.estimated === null) {
            estTime2.innerText = 'Not Available';
        }
        else{
            const time6 = new Date(response.data[0].arrival.scheduled.replace("+00:00", ""));
            const formatted = time6.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            estTime2.innerText = formatted
        }
        
        if(response.data[0].arrival.actual === null) {
            actTime2.innerText = 'Not Available';
        }
        else {
            const time7 = new Date(response.data[0].arrival.scheduled.replace("+00:00", ""));
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

        if(response.data[0].arrival.actual_runway === null) {
            runTime2.innerText = 'Not Available';
        }
        else {
            const time8 = new Date(response.data[0].arrival.scheduled.replace("+00:00", ""));
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

        if(response.data[0].arrival.terminal === null) {
            term2.innerText = 'Terminal: Not Available';
        }
        else {
            term2.innerText = `Terminal: ${response.data[0].arrival.terminal}`;
        }

        if(response.data[0].arrival.gate === null) {
            gate2.innerText = 'Gate: Not Available';
        }
        else {
            gate2.innerText = `Gate: ${response.data[0].arrival.gate}`;
        }

        departTimeZone.innerText = `Departure Timezone: ${response.data[0].departure.timezone}`;
        arrTimeZone.innerText = ` ● Arrival Timezone: ${response.data[0].arrival.timezone}`;

        currentFlight = response.data[0];

        if(currentFlight.live !== null) {
            mapShow.hidden = false;
        } else {
            mapShow.hidden = true;
        }


    }
    catch(e) {
        error = e.message;
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