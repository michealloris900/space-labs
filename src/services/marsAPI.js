const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

export const getMarsPhotos = async (rover = 'curiosity', sol = 1000, camera = 'all', page = 1) => {
  try {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=${API_KEY}`;
    
    if (camera !== 'all') {
      url += `&camera=${camera}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    return [];
  }
};

export const getRoverInfo = async (rover = 'curiosity') => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.photo_manifest || {};
  } catch (error) {
    console.error('Error fetching rover info:', error);
    return {};
  }
};