import { Link, useLocation } from "wouter";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/rejoindre", label: "Rejoindre" },
  { href: "/histoire", label: "Histoire" },
  { href: "/contact", label: "Contact" },
  { href: "/statut", label: "Statut" },
  { href: "/cartes", label: "Cartes" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(() =>
  document.documentElement.classList.contains("dark")
);

useEffect(() => {
  const root = document.documentElement;

  const sync = () => setIsDark(root.classList.contains("dark"));

  const observer = new MutationObserver(sync);
  observer.observe(root, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // sync initial
  sync();

  return () => observer.disconnect();
}, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      >
      <header
        style={{
          background:
            "linear-gradient(90deg, #0b3b61, #1a659e)",
          padding: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "2em",
            fontWeight: "bold",
            letterSpacing: "1px",
            textShadow: "0 0 10px rgba(255,255,255,0.6)",
            pointerEvents: "none",
          }}
          className="site-title"
        >
          Giggletown RP
        </div>

        <ThemeToggle />
      </header>


      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          padding: "12px",
        }}
        className="theme-nav"
      >
        {navLinks.map(({ href, label }) => {
          const isActive = location === href;
          return (
            <Link
              key={href}
              href={href}
              className={isActive ? "nav-link nav-link--active" : "nav-link"}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{
        textAlign: "center",
        padding: "15px",
        fontSize: "0.85em",
        opacity: 0.6,
        borderTop: isDark ? "1px solid rgb(30, 30, 30)" : "1px solid rgba(0, 0, 0, 0.1)",
      }}>
        © 2025-2026 Giggletown RP — Site officiel du serveur Minecraft
      </footer>

      <style>{`
        .site-title {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(0,0,0,0.35), 0 0 25px rgba(0,0,0,0.15);
        }

        .nav-link {
          position: relative;
          display: inline-block;
          color: #111827;
          text-decoration: none;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(255,255,255,0.75);
          transition: transform 0.3s, box-shadow 0.3s, background 0.3s, color 0.3s;
          border: 2px solid rgba(0,191,255,0.18);
          cursor: pointer;
        }
        .nav-link--active {
          border-color: rgba(0,191,255,0.7);
          color: #000000; /* noir pour être lisible */
          background: rgba(0,191,255,0.10);
        }
        html.dark .nav-link {
          color: #ffffff; /* visible en mode dark */
          background: #0d0d0d;
          border-color: rgba(255,255,255,0.08);
        }
        html.dark .nav-link--active {
          border-color: rgba(0,191,255,0.7);
          color: #ffffff; /* visible en mode dark */
          background: #0d0d0d;
        }

        .nav-link:hover {
          transform: scale(1.05);
          border-color: rgba(0,191,255,0.5);
          box-shadow: 0 0 15px rgba(0,191,255,0.4), 0 0 30px rgba(160,32,240,0.25);
        }
      `}</style>
    </div>
  );
}
