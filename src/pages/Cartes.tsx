import React from "react";
import { useEffect, useState } from "react";

const CARD_COLOR = "#00bfff";

const cartes = [
  {
    title: "Overworld 2D",
    desc: "Visualise l'overworld du serveur avec une vue aérienne classique.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world&mapname=flat#",
    button: "Ouvrir",
    className: "map-button-overworld",
    mapType: "overworld",
  },
  {
    title: "Overworld 3D",
    desc: "Visualise l'overworld avec une vue 3D.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world&mapname=surface#",
    button: "Ouvrir",
    className: "map-button-overworld",
    mapType: "overworld",
  },
  {
    title: "Cave",
    desc: "Visualise les cavernes du serveur avec une vue 3D.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world&mapname=cave#",
    button: "Ouvrir",
    className: "map-button-cave",
    mapType: "cave",
  },
  {
    title: "Nether 2D",
    desc: "Visualise le nether du serveur avec une vue aérienne classique.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world_nether&map=flat#",
    button: "Ouvrir",
    className: "map-button-nether",
    mapType: "nether",
  },
  {
    title: "Nether 3D",
    desc: "Visualise le nether du serveur avec une vue 3D.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world&mapname=surface#",
    button: "Ouvrir",
    className: "map-button-nether",
    mapType: "nether",
  },
  {
    title: "Ender 2D",
    desc: "Visualise l'ender du serveur avec une vue aérienne classique.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world&mapname=surface#",
    button: "Ouvrir",
    className: "map-button-ender",
    mapType: "ender",
  },
  {
    title: "Ender 3D",
    desc: "Visualise l'ender du serveur avec une vue 3D.",
    link: "http://nd2.hn21.xyz:20443/?worldname=world&mapname=ender#",
    button: "Ouvrir",
    className: "map-button-ender",
    mapType: "ender",
  }
];

export default function Cartes() {
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
    <div style={{ animation: "fadeInUp 0.5s ease" }}>
      <section
        style={{
          background: "#1e1e1e",
          maxWidth: "700px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        }}
        className="theme-card"
      >
        <h2
          style={{
            color: CARD_COLOR,
            marginBottom: "10px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Cartes du serveur
        </h2>

        <p
          style={{
            color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.75)",
            marginBottom: "35px",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Explore le monde du serveur avec différentes cartes interactives.
          <br></br>
          Note : vous pouvez changer de carte dans le menu à droite une fois la carte ouverte.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 300px)",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {cartes.map((c) => (
            <div
              key={c.title}
              style={{
                borderRadius: "15px",
                padding: "24px",
                width: c.title === "Cave" ? "620px" : "300px",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                ...(c.title === "Cave" ? {
                  gridColumn: "span 2",
                  justifySelf: "center",
                } : {}),
              }}
              className={`theme-panel map-panel-${c.mapType}`}
              onMouseEnter={(e) => {

                (
                  e.currentTarget as HTMLDivElement
                ).style.transform = "translateY(-4px)";

                (
                  e.currentTarget as HTMLDivElement
                ).style.boxShadow =
                  `0 8px 24px ${CARD_COLOR}33`;
              }}
              onMouseLeave={(e) => {
                (
                  e.currentTarget as HTMLDivElement
                ).style.transform = "translateY(0)";

                (
                  e.currentTarget as HTMLDivElement
                ).style.boxShadow = "none";
              }}
            >
              <h2
                style={{
                  color: CARD_COLOR,
                  marginBottom: "12px",
                  fontWeight: 700,
                  fontSize: "1.4em",
                }}
              >
                {c.title}
              </h2>

              <p
                style={{
                  color: "rgb(255, 255, 255)",
                  marginBottom: "20px",
                  lineHeight: 1.5,
                }}
              >
                {c.desc}
              </p>

              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className={c.className}
                style={{
                  display: "inline-block",
                  background: c.className,
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "0.2s",
                }}
              >
                {c.button}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}