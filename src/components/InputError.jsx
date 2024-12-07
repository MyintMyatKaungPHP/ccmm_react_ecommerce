import React from "react";

function InputError({ errorMessage }) {
  return errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>;
}

export default InputError;
