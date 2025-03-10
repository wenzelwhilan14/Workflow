const GoogleClient = {
  apiKey: import.meta.env.VITE_GOOGLE_APIKEY,
};

console.log("Google API Key:", GoogleClient.apiKey);

export default GoogleClient;
