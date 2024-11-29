import { useState, useEffect } from "react";
import axios from "axios";

function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.categories);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false); // Stop loading when request completes
      }
    };

    getCategories();
  }, []);

  return { categories, loading, error };
}

export default useFetchCategories;
