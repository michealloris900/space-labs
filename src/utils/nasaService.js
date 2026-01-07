// Simple NASA API service
export const nasaAPI = {
    async getAPOD() {
      try {
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        return await res.json();
      } catch {
        return null;
      }
    },
  
    async getMarsPhotos(rover = 'curiosity', sol = 1000) {
      try {
        const res = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=DEMO_KEY`
        );
        const data = await res.json();
        return data.photos || [];
      } catch {
        return [];
      }
    },
  
    async getAsteroids(startDate, endDate) {
      try {
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
        );
        return await res.json();
      } catch {
        return null;
      }
    }
  };