const config = {
  API_BASE_URL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : import.meta.env.VITE_REACT_BASE_API_URL,
  API_GOOGLE_URL: import.meta.env.MODE === "development" ? "http://localhost:4000/auth/google"
  : import.meta.env.VITE_REACT_API_GOOGLE_URL,
};

export default config;
