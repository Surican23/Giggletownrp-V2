import { useEffect, useState } from "react";

const timeline = [
  {
    date: "Début 2024",
    title: "La fondation de Giggletown",
    desc: "Un groupe d'amis passionnés de Minecraft décide de créer un serveur RP unique, combinant survie, gestion et roleplay immersif sur une île mystérieuse.",
  },
  {
    date: "Printemps 2024",
    title: "Les premiers bâtisseurs",
    desc: "Les premiers joueurs arrivent sur l'île. Les premières constructions émergent : une mairie, un marché et des maisons pittoresques. La communauté prend vie.",
  },
  {
    date: "Été 2024",
    title: "L'expansion des mods",
    desc: "Intégration de mods variés pour enrichir l'expérience RP : commerce, agriculture avancée, gestion des ressources et bien plus encore.",
  },
  {
    date: "Automne 2024",
    title: "Le grand tournoi",
    desc: "Premier grand événement du serveur ! Des dizaines de joueurs s'affrontent dans diverses épreuves pour remporter le titre de Champion de Giggletown.",
  },
  {
    date: "2025",
    title: "Giggletown aujourd'hui",
    desc: "Le serveur continue de grandir avec une communauté soudée et passionnée. De nouvelles aventures et événements sont planifiés pour l'avenir !",
  },
];

export default function Histoire() {
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
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        }}
        className="theme-card histoire"
      >
        <h2 className="histoire-title"style={{color: "var(--histoire-title-color)"}}>L'histoire de Giggletown</h2>

        <p className="histoire-intro">
          Découvrez comment est né et a évolué notre serveur RP.
        </p>


        <div style={{ textAlign: "left", position: "relative" }}>

          <div
            className="histoire-timeline"
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "2px",
            }}
          />


          {timeline.map((item, i) => (

            <div key={i} style={{
              display: "flex",
              gap: "24px",
              marginBottom: "32px",
              paddingLeft: "52px",
              position: "relative",
              animation: `fadeInUp 0.5s ease ${i * 0.1}s both`,
            }}>
              <div
                className="histoire-dot"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "4px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: isDark ? "3px solid #1e1e1e" : "3px solid #fff",
                }}
              />



              <div>
                <div className="histoire-date">
                  {item.date}
                </div>

                <div className="histoire-item-title">
                  {item.title}
                </div>

                <p className="histoire-desc">{item.desc}</p>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
