import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "10px 16px",
        borderRadius: "10px",
        background: dark ? "#111" : "#eee",
        color: dark ? "#ffffff" : "#000",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
    >
      {dark ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
}