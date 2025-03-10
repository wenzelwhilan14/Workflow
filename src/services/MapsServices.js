import GoogleClient from "../config/GoogleClient";

const MapsService = {
  apiKey: GoogleClient.apiKey,
  defaultCenter: { lat: -12.0464, lng: -77.0428 },
  defaultZoom: 14,

  async getCoordinatesFromAddress(address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        return data.results[0].geometry.location;
      } else {
        throw new Error("No se encontraron coordenadas para la dirección.");
      }
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
      return null;
    }
  },

  async getAddressFromCoordinates(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        return data.results[0].formatted_address;
      } else {
        throw new Error("No se encontró dirección para estas coordenadas.");
      }
    } catch (error) {
      console.error("Error obteniendo dirección:", error);
      return null;
    }
  },
};

export default MapsService;
