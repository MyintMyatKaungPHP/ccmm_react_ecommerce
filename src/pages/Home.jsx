import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async (search) => {
    try {
      const response = await fetch(
        "http://ccmm_react_ecommerce_backend.test/api/products?name=" + search
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(
        "http://ccmm_react_ecommerce_backend.test/api/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts(search);
  }, [search]);

  return (
    <div className="xl:px-32 sm:px-5 px-2">
      <div className="bg-[#F7F8F9] py-24 my-10 rounded-xl flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="lg:w-[50%] w-[70%] text-center mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
        </p>
      </div>
      <div className="flex md:flex-row flex-col top-0 mb-[100px]">
        <div className="lg:w-[25%] md:w-[35%] w-full md:sticky self-start top-16">
          <div className="flex items-center pl-2 rounded-full bg-white border-[1px] h-[50px]">
            <svg
              className="text-black/50"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              className="w-full p-0 pl-2 border-none bg-transparent outline-none focus:ring-0"
              placeholder="Search for products"
            />
          </div>
          <div>
            <p className="text mt-8 mb-3 font-bold">Product By Category</p>
            <div>
              {loading ? (
                <p>Loading product categories...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : categories.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center  cursor-pointer gap-2 py-3 px-2 border-t-[1px] border-t-black/10 hover:text-primary hover:bg-[#F7F8F9] transition-all"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No categories found.</p>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-[75%] md:w-[65%] md:mt-0 mt-10 w-full mb-12 md:pl-[8%]">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : products.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 mb-14 gap-x-5 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
