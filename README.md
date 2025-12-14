# Flight Tracker – Real-Time Flight Status App

**Requirements**
- A modern web browser (Chrome, Firefox, Edge, Safari)  
- Active internet connection to fetch live flight data  
- A valid **AviationStack API key** configured inside `script.js`  
- Basic understanding of HTML and JavaScript to modify or extend the project  
- (Optional) A local static server for smooth development and testing  

**Technologies Used**
- **HTML** for structuring the flight tracking interface  
- **Vanilla JavaScript** for handling user input, DOM updates, and async logic  
- **Fetch API** for making HTTP requests to external services  
- **AviationStack API** for real-time flight status and schedule data  
- **Leaflet.js with OpenStreetMap** for visualizing live aircraft location on a map  
- **JavaScript Date & Intl APIs** for formatting dates and times  

**About the API**
- **AviationStack Flights API**
  - Used to fetch real-time flight information using flight number  
  - Example endpoint:  
    `https://api.aviationstack.com/v1/flights?access_key={API_KEY}&flight_iata={FLIGHT_NUMBER}&limit=1`
  - Provides airline details, flight status, departure and arrival airports, terminals, gates, timezones, and timestamps  
  - Includes optional live flight coordinates when available  
- **OpenStreetMap (via Leaflet)**
  - Used to render an interactive map showing aircraft position when live data exists  

**Features Implemented**
- Search flight details using flight number (IATA)  
- Displays airline name, flight code, and current flight status  
- Shows departure and arrival airport codes and names  
- Displays scheduled, estimated, actual, and runway times  
- Shows terminal and gate information with graceful fallback for missing data  
- Color-coded flight status (Scheduled, Airborne, Landed, Cancelled, Diverted)  
- Loading spinner during API requests  
- Optional live map view when aircraft coordinates are available  
- Responsive layout for desktop and mobile screens  

**Application Flow**
- User enters a flight number and clicks **Search**  
- Loader appears while data is fetched from the AviationStack API  
- Flight details container becomes visible once valid data is received  
- If live coordinates are present, the **Show on Map** option is enabled  
- Errors or invalid input are displayed clearly without breaking the UI  

**Notes**
- Do not expose real API keys in public repositories  
- Free API plans may have limited request quotas and delayed data  
- Live location data may not be available for all flights  
- Built as a client-side project to practice API integration and complex UI rendering  

**Possible Enhancements**
- Add autocomplete for flight numbers  
- Cache recent flight searches  
- Auto-refresh flight status at intervals  
- Add route visualization between departure and arrival airports  
- Improve accessibility and keyboard navigation  
