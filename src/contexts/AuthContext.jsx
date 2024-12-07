import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const getUser = async (token) => {
    try {
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data[0]?.errors?.message === "Unauthenticated.") {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, getUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
