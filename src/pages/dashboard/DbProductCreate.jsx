import React, { useReducer } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputError from "../../components/InputError";

// Initial State
const initialState = {
  inputs: {
    name: "",
    price: "",
    category_id: "",
    description: "",
  },
  error: null,
  loading: false,
};

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        inputs: { ...state.inputs, [action.name]: action.value },
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function DbProductCreate() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT", name, value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await axios.post("/api/products", state.inputs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // backend response should be 201
      if (response.status === 201) {
        dispatch({ type: "RESET" });
        navigate("/admin/dashboard");
      }
    } catch (err) {
      // no 422 response in backend (inform to developer)
      if (err.response?.status === 422) {
        dispatch({ type: "SET_ERROR", payload: err.response.data.errors });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
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
                className={`outline-none px-4 border-[1px] py-4 rounded-lg mt-2 transition-all ${
                  state.error?.name ? "border-red-500" : "border-black/10"
                }`}
                type="text"
                placeholder="Enter your product Name"
                name="name"
                value={state.inputs.name}
                onChange={handleChange}
              />
              <InputError errorMessage={state.error?.name} />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-sm">Price</label>
              <input
                className={`outline-none px-4 border-[1px] py-4 rounded-lg mt-2 transition-all ${
                  state.error?.price ? "border-red-500" : "border-black/10"
                }`}
                type="text"
                placeholder="Enter price"
                name="price"
                value={state.inputs.price}
                onChange={handleChange}
              />
              <InputError errorMessage={state.error?.price} />
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
                  className={`w-full border-[1px] px-3 py-3 mt-2 rounded-lg transition-all ${
                    state.error?.category_id
                      ? "border-red-500"
                      : "border-black/10"
                  }`}
                  name="category_id"
                  value={state.inputs.category_id}
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
            <InputError errorMessage={state.error?.category_id} />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-sm">Description</label>
            <textarea
              className={`w-full border-[1px] px-3 py-3 rounded-lg transition-all ${
                state.error?.description ? "border-red-500" : "border-black/10"
              }`}
              placeholder="Enter Description"
              rows="5"
              name="description"
              value={state.inputs.description}
              onChange={handleChange}
            ></textarea>
            <InputError errorMessage={state.error?.description} />
          </div>

          {/* General Error Message */}
          {state.error && typeof state.error === "string" && (
            <p className="text-red-500">{state.error}</p>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-5">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="text-sm px-4 bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-3 shadow-md py-3 font-semibold rounded-md transition-all active:animate-press"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm px-4 bg-primary hover:bg-blue-900 text-white flex items-center gap-3 shadow-md py-3 font-semibold rounded-md transition-all active:animate-press"
              disabled={state.loading}
            >
              {state.loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DbProductCreate;
