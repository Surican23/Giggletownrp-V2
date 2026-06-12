import { useEffect, useState } from "react";

const CARD_COLOR = "#00bfff";

const DiscordLogo = () => (
  <img
    src="https://cdn.simpleicons.org/discord/5865F2"
    alt="Discord"
    width="40"
    height="40"
    style={{ display: "block" }}
  />
);

const MinecraftLogo = () => (
  <img
    src="/minecraft-logo-1022.png"
    alt="Minecraft"
    width="40"
    height="40"
    style={{ display: "block" }}
  />
);

const contacts = [
  {
    logo: <DiscordLogo />,
    title: "Discord",
    desc: "La manière la plus rapide de nous contacter et rejoindre la communauté.",
    link: "https://discord.gg/QdpzF4qCSr",
    linkLabel: "discord.gg/giggletownrp",
  },
  {
    logo: <MinecraftLogo />,
    title: "Serveur Minecraft",
    desc: "Connecte-toi directement sur notre serveur Minecraft Java.",
    link: null,
    linkLabel: "giggletownrp.min3.cloud",
  },
];

export default function Contact() {
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
      <section style={{
        background: "#1e1e1e",
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      }} className="theme-card">
        <h2 style={{ color: CARD_COLOR, marginBottom: "8px" }}>Nous contacter</h2>
        <p style={{ color: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(17, 24, 39, 0.6)", marginBottom: "32px", lineHeight: 1.6 }}>
          Tu as des questions ? Tu veux rejoindre l'équipe ou signaler un problème ? On est là !
        </p>

        <div style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "40px",
        }}>
          {contacts.map((c) => (
            <div key={c.title} style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${CARD_COLOR}44`,
              borderRadius: "15px",
              padding: "24px",
              flex: "1",
              minWidth: "220px",
              maxWidth: "300px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            className="theme-panel"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${CARD_COLOR}33`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
            >
              <div style={{ marginBottom: "12px", display: "flex", justifyContent: "center" }}>{c.logo}</div>
              <div style={{ fontWeight: 700, fontSize: "1.1em", marginBottom: "8px", color: CARD_COLOR }}>
                {c.title}
              </div>
              <p style={{ color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.7)", fontSize: "0.9em", marginBottom: "16px", lineHeight: 1.5 }}>
                {c.desc}
              </p>
              {c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "8px 20px",
                    borderRadius: "50px",
                    background: `${CARD_COLOR}22`,
                    border: `1px solid ${CARD_COLOR}`,
                    color: CARD_COLOR,
                    textDecoration: "none",
                    fontSize: "0.85em",
                    fontWeight: 600,
                    transition: "background 0.2s",
                  }}
                >
                  {c.linkLabel}
                </a>
              ) : (
                <span style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  borderRadius: "50px",
                  background: `${CARD_COLOR}22`,
                  border: `1px solid ${CARD_COLOR}`,
                  color: CARD_COLOR,
                  fontSize: "0.85em",
                  fontWeight: 600,
                }}>
                  {c.linkLabel}
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{
          background: "rgba(0, 190, 253, 0.08)",
          border: "1px solid rgba(0,191,255,0.3)",
          borderRadius: "12px",
          padding: "20px",
        }}>
          
          <h3 style={{ color: CARD_COLOR, marginBottom: "10px" }}>Règles de conduite</h3>
          <p style={{ color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.75)", lineHeight: 1.7, textAlign: "left" }}>
            Avant de nous contacter, veuillez lire les règles du serveur disponibles sur notre Discord.
            Tout signalement d'abus ou de comportement inapproprié doit passer par les canaux Discord dédiés.
            Nous répondons généralement dans les 24-48 heures.
          </p>
        </div>
      </section>
    </div>
  );
}
