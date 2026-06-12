import { useState, useEffect, useCallback } from "react";

interface ServerStatus {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  version?: string;
  ping?: number;
}

const SERVER_IP = "nd2.hn21.xyz:20033";
const SERVER_DISPLAY = "giggletownrp.min3.cloud";
const C = "#00bfff";

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${C}33`,
        borderRadius: "12px",
        padding: "20px 24px",
        flex: "1",
        minWidth: "200px",
        textAlign: "center",
      }}
      className="theme-panel"
    >
      <div
        style={{
          color: C,
          fontSize: "0.75em",
          fontWeight: 700,
          marginBottom: "5px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>

      <div style={{ fontWeight: 700, fontSize: "1.1em" }}>
        {value}
      </div>
    </div>
  );
}

export default function Statut() {
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

  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.mcsrvstat.us/3/${SERVER_IP}`
      );

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      const data: ServerStatus = await res.json();

      setStatus(data);
      setLastChecked(new Date());
    } catch {
      setError(
        "Impossible de récupérer le statut du serveur."
      );
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(fetchStatus, 60000);

    return () => clearInterval(interval);
  }, [fetchStatus]);

  const isOnline = status?.online === true;

    function fmtDate(peakPlayersDate: any): string | number {
        throw new Error("Function not implemented.");
    }

  return (
    <div style={{ animation: "fadeInUp 0.5s ease" }}>
      <section
        style={{
          background: "#1e1e1e",
          maxWidth: "860px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 15px rgba(0,0,0,0.4)",
        }}
        className="theme-card"
      >
        <h2
          style={{
            color: C,
            marginBottom: "8px",
            fontWeight: 700,
          }}
        >
          Statut du serveur
        </h2>

        <p
          style={{
            color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.75)",
            marginBottom: "28px",
          }}
        >
          Mise à jour automatique toutes les 60 secondes
        </p>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: `4px solid ${C}22`,
                borderTopColor: C,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />

            <p style={{color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.75)", fontSize: "1.1em" }}>
              Vérification du statut...
            </p>
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              background: "rgba(255,60,60,0.1)",
              border: "1px solid rgba(255,60,60,0.4)",
              borderRadius: "12px",
              padding: "20px",
              color: "#ff6060",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {!loading && status && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "24px",
                background: isOnline
                  ? "rgba(0,255,100,0.08)"
                  : "rgba(255,60,60,0.08)",
                border: `2px solid ${
                  isOnline
                    ? "rgba(0,255,100,0.4)"
                    : "rgba(255,60,60,0.4)"
                }`,
                borderRadius: "15px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: isOnline
                    ? "#00ff64"
                    : "#ff3c3c",
                  flexShrink: 0,
                  animation: isOnline
                    ? "pulse-green 2s ease-in-out infinite"
                    : "pulse-red 2s ease-in-out infinite",
                }}
              />

              <div
                style={{
                  fontSize: "1.5em",
                  fontWeight: 700,
                  color: isOnline
                    ? "#00ff64"
                    : "#ff3c3c",
                }}
              >
                {isOnline
                  ? "SERVEUR EN LIGNE"
                  : "SERVEUR HORS LIGNE"}
              </div>
            </div>

            {isOnline && (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <StatCard
                  label="Joueurs"
                  value={`${status.players?.online ?? 0} / ${
                    status.players?.max ?? 0
                  }`}
                />

                <StatCard
                  label="Version"
                  value={status.version ?? "Inconnue"}
                />

                <StatCard
                  label="Adresse"
                  value={SERVER_DISPLAY}
                />

                {status.ping !== undefined && (
                  <StatCard
                    label="Ping"
                    value={`${status.ping} ms`}
                  />
                )}
              </div>
            )}

            {!isOnline && (
              <div
                style={{
                  background: "rgba(255,60,60,0.08)",
                  border:
                    "1px solid rgba(255,60,60,0.2)",
                  borderRadius: "12px",
                  padding: "24px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#ff6060",
                    marginBottom: "8px",
                    fontWeight: 700,
                  }}
                >
                  Le serveur est hors ligne
                </h3>

                <p
                  style={{
                    color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.75)",
                    lineHeight: 1.7,
                  }}
                >
                  Rejoins notre Discord pour demander
                  à un admin de lancer le serveur.
                </p>
              </div>
            )}
          </>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "16px",
            borderTop:
              "1px solid rgba(255,255,255,0.1)",
            marginTop: "20px",
          }}
        >
          <span
            style={{
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(17, 24, 39, 0.75)",
              fontSize: "0.85em",
            }}
          >
            {lastChecked
              ? `Dernière vérification : ${lastChecked.toLocaleTimeString(
                  "fr-FR"
                )}`
              : "En attente..."}
          </span>

          <button
            onClick={fetchStatus}
            disabled={loading}
            style={{
              padding: "8px 20px",
              borderRadius: "50px",
              border: `1px solid ${C}80`,
              background: `${C}1a`,
              color: C,
              cursor: loading ? "wait" : "pointer",
              fontSize: "0.9em",
              fontWeight: 600,
            }}
          >
            Actualiser
          </button>
        </div>
      </section>
    </div>
  );
}