async function getGeoMetadata(address) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your GMap API Key
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const result = data.results[0];
    return {
      formatted_address: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      place_id: result.place_id,
    };
  }
  return null;
}

getGeoMetadata("Indore, Madhya Pradesh").then(console.log);
