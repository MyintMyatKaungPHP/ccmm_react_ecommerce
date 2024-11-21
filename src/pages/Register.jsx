import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="my-10 flex items-center">
      <div className="border-[1px] border-black/20 rounded-lg w-[40%] mx-auto py-[40px] px-[40px]">
        <div className="flex items-end gap-2 mb-8">
          <h1 className="text-[50px] leading-[0.8] text-primary font-bold">
            Register
          </h1>
          <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
        </div>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Name</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Email</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your Email"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Phone</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="text"
              placeholder="Enter your phone"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-sm">Password</label>
            <input
              className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-white font-bold text-xl rounded-full bg-primary block"
          >
            Register
          </button>
          <p className="text-sm text-center font-semibold">
            Already have an account? Login
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
