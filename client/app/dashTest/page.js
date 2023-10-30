"use client";
import { ApiClient } from "@/apiClient";
import Register from "@/components/Register";
import login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { useState, useEffect } from "react";
import Logout from "@/components/Logout";

export default function Home() {
  const [token, setToken] = useState(null);
  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  return (
    <main>
      {token && <Dashboard client={client} />}

    </main>
  );
}
