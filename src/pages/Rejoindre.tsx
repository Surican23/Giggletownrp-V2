import { useEffect, useState } from "react";

const modPacks = [
  { label: "-- Sélectionner --", value: "" },
  {
    label: "Pack minimal (22 mods)",
    value: "https://www.dropbox.com/scl/fi/i5r3o6m2hrkwxxlwrx9iw/modpack-giggletown-22-mods.zip?rlkey=95wg7xp33cai7pk6bujlz5u0r&st=h6ppllzz&dl=1",
  },
  {
    label: "Pack recommandé (36 mods)",
    value: "https://www.dropbox.com/scl/fi/cjw663ojnapfrnq3lzb5f/modpack-giggletown-36-mods.zip?rlkey=xohei58otzeozymbt4y78y86u&st=gezbc8cf&dl=1",
  },
];

const etapesVersions = [
  { label: "-- Sélectionner une version --", value: "" },
  { label: "Version premium", value: "Premium" },
  { label: "Version curseforge", value: "Curseforge" },
  { label: "Version cracké", value: "Cracké" },
];

const etapesContent = {
  Premium: [
  "Étape 1 : Installer Minecraft Java Edition",
  "Rends-toi sur le site officiel Minecraft et connecte-toi avec ton compte Microsoft.",
  "Télécharge et installe le launcher officiel Minecraft.",
  "Lance le launcher une première fois puis ferme-le.",

  "Étape 2 : Installer Minecraft 1.20.1",
  "Ouvre le launcher Minecraft.",
  "Clique sur 'Installations' puis sur 'Nouvelle installation'.",
  "Donne un nom à ton installation (ex : Giggletown RP).",
  "Sélectionne la version 1.20.1.",
  "Clique sur 'Créer'.",
  "Lance le jeu une fois puis ferme-le.",

  "Étape 3 : Installer Java",
  "Télécharge la dernière version de Java 21 (ou supérieure) qui est disponible sur de nombreux sites.",
  "Lance l'installateur Java téléchargé.",
  "Suis les étapes d'installation proposées.",
  "Attends la fin de l'installation puis ferme l'installateur.",
  "Vérifie que Java est correctement installé en lançant Minecraft une fois.",

  "Étape 4 : Installer Forge 1.20.1",
  "Télécharge Forge pour Minecraft 1.20.1 sur le site officiel de Forge.",
  "Lance l'installateur Forge.",
  "Sélectionne 'Install Client'.",
  "Clique sur 'OK' et attends la fin de l'installation.",
  "Relance le launcher Minecraft pour vérifier que le profil Forge apparaît.",

  "Étape 5 : Installer les mods",
  "Télécharge le pack de mods que tu veux de Giggletown RP ci-dessous.",
  "Ouvre le dossier Minecraft : Windows + R  %appdata% dans la fenetre qui s'ouvre puis : → .minecraft → mods",
  "Si le dossier 'mods' n'existe pas, crée-le.",
  "Copie tous les fichiers .jar du pack dans le dossier mods.",

  "Étape 6 : Lancer le jeu",
  "Dans le launcher, sélectionne le profil Forge 1.20.1.",
  "Clique sur 'Jouer'.",
  "Patiente pendant le chargement des mods.",

  "Étape 7 : Rejoindre le serveur",
  "Clique sur 'Multijoueur'.",
  "Clique sur 'Ajouter un serveur'.",
  "Nom du serveur : Giggletown RP",
  "Adresse du serveur : giggletownrp.min3.fr",
  "Clique sur 'Terminé' puis rejoins le serveur.",
  "Bon jeu sur Giggletown RP !"
],

Curseforge: [
  "Étape 1 : Installer CurseForge",
  "Télécharge et installe l'application CurseForge.",
  "Lance CurseForge puis ouvre la section Minecraft.",

  "Étape 2 : Créer un profil",
  "Clique sur 'Créer un profil personnalisé'.",
  "Nom : Giggletown RP",
  "Version Minecraft : 1.20.1",
  "Version Forge : dernière version disponible pour 1.20.1",
  "Clique sur 'Créer'.",

  "Étape 3 : Installer les mods",
  "Télécharge le pack de mods Giggletown RP.",
  "Ouvre ton profil CurseForge.",
  "Clique sur les trois points puis sur 'Open Folder'.",
  "Ouvre le dossier 'mods'.",
  "Copie tous les fichiers du pack dans ce dossier.",

  "Étape 4 : Configurer la RAM (recommandé)",
  "Ouvre les paramètres CurseForge.",
  "Va dans les paramètres Minecraft.",
  "Attribue 4096 Mo de RAM minimum.",
  "Si tu possèdes 16 Go de RAM ou plus, tu peux attribuer 6144 Mo.",

  "Étape 5 : Lancer le jeu",
  "Retourne sur ton profil Giggletown RP.",
  "Clique sur 'Play'.",
  "Attends le chargement complet des mods.",

  "Étape 6 : Rejoindre le serveur",
  "Clique sur 'Multijoueur'.",
  "Ajoute un serveur.",
  "Nom du serveur : Giggletown RP",
  "Adresse du serveur : giggletownrp.min3.fr",
  "Clique sur 'Terminé' puis rejoins le serveur.",
  "Bon jeu sur Giggletown RP !"
],

Cracké: [
  "Étape 1 : Installer un launcher compatible",
  "Installe ton launcher Minecraft préféré compatible Forge.",
  "Crée un profil Minecraft 1.20.1.",

  "Étape 2 : Installer Minecraft 1.20.1",
  "Sélectionne la version 1.20.1.",
  "Lance le jeu une première fois puis ferme-le.",

  "Étape 3 : Installer Java",
  "Télécharge la dernière version de Java 21 (ou supérieure).",
  "Lance l'installateur Java téléchargé.",
  "Suis les étapes d'installation proposées.",
  "Attends la fin de l'installation puis ferme l'installateur.",
  "Vérifie que Java est correctement installé en lançant Minecraft une fois.",

  "Étape 4 : Installer Forge 1.20.1",
  "Télécharge Forge pour Minecraft 1.20.1.",
  "Lance l'installateur.",
  "Sélectionne 'Install Client'.",
  "Attends la fin de l'installation.",

  "Étape 5 : Installer les mods",
  "Télécharge le pack de mods Giggletown RP.",
  "Fait Windows + R, tape %appdata% puis appuie sur Entrée.",
  "Ouvre le dossier .minecraft.",
  "Ouvre ou crée le dossier 'mods'.",
  "Copie tous les fichiers .jar du pack dans ce dossier.",

  "Étape 6 : Lancer le jeu",
  "Sélectionne le profil Forge 1.20.1.",
  "Clique sur 'Jouer'.",
  "Attends le chargement complet des mods.",

  "Étape 7 : Rejoindre le serveur",
  "Clique sur 'Multijoueur'.",
  "Ajoute un serveur.",
  "Nom du serveur : Giggletown RP",
  "Adresse du serveur : giggletownrp.min3.fr",
  "Clique sur 'Terminé' puis rejoins le serveur.",
  "Bon jeu sur Giggletown RP !"
],
};

export default function Rejoindre() {
  const [selected, setSelected] = useState("");
  const [selectedEtapes, setSelectedEtapes] = useState("");

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      setIsDark(root.classList.contains("dark"));
    };

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    // initial sync
    sync();

    return () => observer.disconnect();
  }, []);

  const currentEtapes =
  selectedEtapes
    ? etapesContent[selectedEtapes as keyof typeof etapesContent]
    : null;

  const handleDownload = () => {
    if (selected) window.location.href = selected;
  };

  return (
    <div style={{ animation: "fadeInUp 0.5s ease" }}>
      <section style={{
        background: "#1e1e1e",
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      }} className="theme-card">
        <h2 style={{ color: "#00bfff", marginBottom: "24px" }}>Comment rejoindre le serveur ?</h2>

        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "15px",
          padding: "24px",
          maxWidth: "320px",
          margin: "0 auto 32px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }} className="theme-panel">
          {[
            { label: "Version", value: "Minecraft Java 1.20.1" },
            { label: "IP", value: "giggletownrp.min3.fr" },
            { label: "Port", value: "20033" },
            { label: "Client", value: "Forge" },
          ].map(({ label, value }) => (
            <p key={label} style={{ marginBottom: "10px" }}>
              <strong>{label} :</strong> {value}
            </p>
          ))}
        </div>
        
        <div style={{
          background: "rgba(0,191,255,0.08)",
          border: "1px solid rgba(0,191,255,0.3)",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "32px",
          textAlign: "left",
        }}>
          <h3 style={{ color: "#00bfff", marginBottom: "12px", textAlign: "center"}}>Étapes pour rejoindre :</h3>
          
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", fontSize: "0.9em", textAlign: "center" }}>
            Choisir la version des étapes :
          </label>
          
          <select
            value={selectedEtapes}
            onChange={(e) => setSelectedEtapes(e.target.value)}
            style={{
              backgroundColor: isDark ? "#1d1c1c" : "#ffffff",
              color: isDark ? "white" : "black",
              border: "1px solid rgba(0,191,255,0.5)",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "0.9em",
              outline: "none",
              cursor: "pointer",
              transition: "0.3s",
              marginBottom: "16px",
              marginLeft: "calc(50% - 125px)",
              width: "100%",
              maxWidth: "250px",
            }}
          >
            {etapesVersions.map((version) => (
              <option key={version.value} value={version.value}>
                {version.label}
              </option>
            ))}
          </select>

{currentEtapes && (
  <div style={{ animation: "fadeInUp 0.3s ease" }}>
    {currentEtapes.map((step, i) => {
      const isTitle = step.startsWith("Étape");

      return (
        <p
          key={i}
          style={{
            marginBottom: isTitle ? "12px" : "6px",
            marginLeft: "25px",
            lineHeight: 1.6,
            color: isTitle ? "#00bfff" : "inherit",
            fontWeight: isTitle ? 700 : 400,
            fontSize: isTitle ? "1.05em" : "1em",
            marginTop: isTitle ? "16px" : "0",
          }}
        >

          {step}
        </p>
      );
    })}
  </div>
)}
        </div>

        <h2 style={{ color: "#00bfff", marginBottom: "16px" }}>Télécharger les mods</h2>
        <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold"}}>
          Sélectionne ton pack :
        </label>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{
            backgroundColor: isDark ? "#1d1c1c" : "#ffffff",
            color: isDark ? "white" : "black",
            border: "1px solid rgba(0, 191, 255, 0.267)",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "0.9em",
            outline: "none",
            cursor: "pointer",
            transition: "0.4s",
            minWidth: "250px",
          }}
        >
          {modPacks.map((pack) => (
            <option key={pack.value} value={pack.value}>
              {pack.label}
            </option>
          ))}
        </select>

        <br />
        <button
          onClick={handleDownload}
          disabled={!selected}
          style={{
            background: "linear-gradient(90deg, rgba(0, 153, 255, 0.5), rgba(0, 153, 255, 0.3), rgba(0, 153, 255, 0.5))",
            border: "2px solid rgba(0, 191, 255, 0.5)",
            marginTop: "20px",
            padding: "12px 36px",
            borderRadius: "100px",
            fontSize: "1em",
            cursor: selected ? "pointer" : "not-allowed",
            color: isDark ? "white" : "black",
            transition: "transform 0.3s, box-shadow 0.3s",
            opacity: selected ? 1 : 0.5,
          }}
          onMouseEnter={(e) => {
            if (selected) {
              (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
              (e.target as HTMLButtonElement).style.boxShadow = "0 0 15px rgba(0,191,255,0.4)";
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
            (e.target as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          ⬇ Télécharger
        </button>
      </section>
    </div>
  );
}
