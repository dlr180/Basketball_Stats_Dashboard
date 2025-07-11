"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <main className="text-center p-10">
      <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
    </main>
  );
}
