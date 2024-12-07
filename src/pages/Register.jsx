import axios from "axios";
import React, { useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputError from "../components/InputError";
import { AuthContext } from "../contexts/AuthContext";

// Initial State
const initialState = {
  inputs: {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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

function Register() {
  const { getUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT", name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await axios.post("/api/users", state.inputs);

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        getUser(response.data.token);
        dispatch({ type: "RESET" });
        navigate("/");
      }
    } catch (err) {
      const errorResponse = err.response?.data?.errors || {
        message: "Something went wrong",
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
            Register
          </h1>
          <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Name</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              value={state.inputs.name}
            />
            <InputError errorMessage={state.error?.name} />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Email</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={state.inputs.email}
            />
            <InputError errorMessage={state.error?.email} />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Phone</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your phone"
              name="phone"
              onChange={handleChange}
              value={state.inputs.phone}
            />
            <InputError errorMessage={state.error?.phone} />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Password</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={state.inputs.password}
            />
            <InputError errorMessage={state.error?.password} />
          </div>

          {/* Address Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Address</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your address"
              name="address"
              onChange={handleChange}
              value={state.inputs.address}
            />
            <InputError errorMessage={state.error?.address} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 text-white font-bold text-xl rounded-full bg-primary block"
            disabled={state.loading}
          >
            {state.loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center font-semibold">
            Already have an account? Login{" "}
            <Link className="text-primary underline" to="/Login">
              here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
