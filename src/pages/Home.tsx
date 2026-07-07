import { useEffect, useState } from "react";
export default function Home() {

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
    <>
      <style>{`
        .info-rapid-title { color: #00bfff !important; }
        html.dark .info-rapid-title { color: #00bfff !important; }
      `}</style>
    <div style={{ animation: "fadeInUp 0.5s ease" }}>
      <section
        style={{
          background: "#1e1e1e",
          maxWidth: "900px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        }}
        className="theme-card"
      >
        <h2 style={{ color: "#00bfff", marginBottom: "16px" }}>
          Bienvenue sur le site officiel de l'île de Giggletown !
        </h2>
        <p style={{ color: isDark ? "white" : "black", marginBottom: "10px", lineHeight: 1.7 }}>
          Ce projet Minecraft allie technologie, survie et gestion grâce à des mods variés qui aident à renforcer le RP.
          Découvrez toutes les créations et constructions des joueurs de ce serveur autonome dans Minecraft.
        </p>
      </section>

      <section
        style={{
          background: "#1e1e1e",
          maxWidth: "900px",
          margin: "0 auto 40px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        }}
        className="theme-card"
      >

        <h2 style={{ color: "#00bfff", marginBottom: "20px" }}>Informations rapides</h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}>
          {[
            { title: "Version", value: "Minecraft Java 1.20.1" },
            { title: "IP du serveur", value: "giggletownrp.min3.fr" },
            { title: "Client", value: "Forge" },
            { title: "Type", value: "Serveur RP moddé" },
          ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(0,191,255,0.2)",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  minWidth: "200px",
                  flex: "1",
                }}
                className="theme-panel"
              >

              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.95em",
                  marginBottom: "6px",
                  textTransform: "none",
                  letterSpacing: "0.01em",
                }}
                className="info-rapid-title"
              >
                {item.title}
              </div>


              <div style={{ fontWeight: 600, color: "inherit" }}>{item.value}</div>
            </div>
          ))}
        </div>

      </section>
    </div>
    </>
  );
}
