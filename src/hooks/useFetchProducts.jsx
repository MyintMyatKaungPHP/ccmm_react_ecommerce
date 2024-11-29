import { useState, useEffect } from "react";
import axios from "axios";

function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async (search) => {
    try {
      const response = await axios.get("/api/products?name=" + search);
      // Log response to verify structure
      console.log(response.data);

      // Check if products exist in the response
      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]); // Set empty array if products are not available
        setError("No products found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(search);
  }, [search]);

  return { products, search, setSearch, loading, error };
}

export default useFetchProducts;
