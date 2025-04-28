import axios from "axios";

export async function geocodeLocation(address: string): Promise<{ lat: number, lng: number }> {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: address,
          format: "json",
          addressdetails: 1,
          limit: 1
        },
        headers: {
          'User-Agent': 'disaster-aid-platform/1.0 (your-email@example.com)' // Replace with your email or project info
        }
      });
  
      const data = response.data[0];
      if (!data) {
        console.warn("Location not found using OpenStreetMap");
        return { lat: 0, lng: 0 };
      }
  
      return {
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lon)
      };
    } catch (error) {
      console.error("OpenStreetMap geocoding error:", error);
      return { lat: 0, lng: 0 };
    }
  }
  

export async function verifyDisasterZone(lat: number, lng: number): Promise<boolean> {
  return lat !== 0 && lng !== 0;
}
