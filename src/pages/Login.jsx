import React, { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputError from "../components/InputError";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

// Initial State
const initialState = {
  inputs: {
    email: "",
    password: "",
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

function Login() {
  const { getUser } = useContext(AuthContext);
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
      const response = await axios.post("/api/login", state.inputs);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        getUser(response.data.token);
        dispatch({ type: "RESET" });
        navigate("/");
      }
    } catch (err) {
      const errorResponse = err.response?.data?.errors || {
        general: "Login failed",
      };
      dispatch({ type: "SET_ERROR", payload: errorResponse });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="my-10 flex items-center">
      <div className="border-[1px] border-black/20 rounded-lg w-[40%] mx-auto py-[40px] px-[40px]">
        <div className="flex items-end gap-2 mb-8">
          <h1 className="text-[50px] leading-[0.8] text-primary font-bold">
            Login
          </h1>
          <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={state.inputs.email}
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your Email"
            />
            <InputError errorMessage={state.error?.email} />
          </div>
          {/* Password Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Password</label>
            <input
              name="password"
              onChange={handleChange}
              value={state.inputs.password}
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="password"
              placeholder="Enter your password"
            />
            <InputError errorMessage={state.error?.password} />
          </div>
          {/* General Error */}
          {state.error?.general && (
            <p className="text-red-500">{state.error.general}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 text-center text-white font-bold text-xl rounded-full bg-primary block"
            disabled={state.loading}
          >
            {state.loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center font-semibold">
            You don't have an account? Register{" "}
            <Link className="text-primary underline" to="/Register">
              here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
