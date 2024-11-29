import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import useFetchProducts from "../hooks/useFetchProducts";
import useFetchCategories from "../hooks/useFetchCategories";

function Home() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();
  const {
    products,
    search,
    setSearch,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();

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
        {/* Sidebar */}
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
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full p-0 pl-2 border-none bg-transparent outline-none focus:ring-0"
              placeholder="Search for products"
            />
          </div>
          <div>
            <p className="text mt-8 mb-3 font-bold">Product By Category</p>
            <div>
              {categoriesLoading && <p>{categoriesLoading}</p>}{" "}
              {/* Loading state */}
              {categoriesError && (
                <p className="text-red-500">{categoriesError}</p>
              )}{" "}
              {/* Error state */}
              {categories.length <= 0 && <p>No categories available.</p>}{" "}
              {/* No categories */}
              {categories.length > 0 && (
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center cursor-pointer gap-2 py-3 px-2 border-t-[1px] border-t-black/10 hover:text-primary hover:bg-[#F7F8F9] transition-all"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:w-[75%] md:w-[65%] md:mt-0 mt-10 w-full mb-12 md:pl-[8%]">
          {productsLoading && <p>{productsLoading}</p>}
          {productsError && <p className="text-red-500">{productsError}</p>}
          {products.length <= 0 && <p>No products found.</p>}
          {products.length > 0 && (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 mb-14 gap-x-5 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
