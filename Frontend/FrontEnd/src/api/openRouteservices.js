const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjM3YWQ3NDVhYzQ2MzQwMjJhMWY0NGRjNTA2NWU2NDRlIiwiaCI6Im11cm11cjY0In0=";

/* Get Route Between Two Points */
export async function getRoute(start, end) {
  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat]
        ]
      })
    }
  );

  const data = await response.json();
  return data;
}

/* Get Places Near Coordinates */
export async function getNearbyPlaces(lat, lng, category) {
  const response = await fetch(
    `https://api.openrouteservice.org/places?api_key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: "pois",
        geometry: {
          geojson: {
            type: "Point",
            coordinates: [lng, lat]
          },
          buffer: 10000
        },
        filters: {
          category_ids: category
        }
      })
    }
  );

  const data = await response.json();
  return data.features;
}