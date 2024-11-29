import React, { useState, useEffect } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";

function DbProductCreate() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // Here you would typically send the `inputs` data to the server
  };

  return (
    <div className="mx-auto p-4 md:p-6 2xl:p-10 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
      <div className="border p-10 bg-white rounded-md">
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {/* File Input */}
          <div className="image-wrapper">
            <input type="file" />
          </div>

          {/* Product Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Product Name</label>
              <input
                className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                type="text"
                placeholder="Enter your product Name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Price</label>
              <input
                className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                type="text"
                placeholder="Enter price"
                name="price"
                value={inputs.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Category</label>
            {categoriesLoading && <p>Loading categories...</p>}
            {categoriesError && (
              <p className="text-red-500">{categoriesError}</p>
            )}
            {!categoriesLoading &&
              !categoriesError &&
              categories.length > 0 && (
                <select
                  className="w-full border-[1px] mt-2 px-3 border-black/20 focus:border-primary transition-all py-3 rounded-lg"
                  name="category_id"
                  value={inputs.category_id}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            {!categoriesLoading &&
              !categoriesError &&
              categories.length === 0 && <p>No categories available.</p>}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-sm">Description</label>
            <textarea
              className="w-full border-[1px] border-black/10 py-3 px-3 rounded-[5px]"
              placeholder="Enter Description"
              rows="5"
              name="description"
              value={inputs.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-5">
            <a
              href="/admin.html"
              className="text-sm px-4 bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-3 shadow-md py-3 font-semibold rounded-md transition-all active:animate-press"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="text-sm px-4 flex items-center gap-3 shadow-md py-3 text-white bg-primary hover:bg-blue-900 font-semibold rounded-md transition-all active:animate-press"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DbProductCreate;
