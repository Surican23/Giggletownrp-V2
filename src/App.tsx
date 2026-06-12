import { Switch, Route, Router as WouterRouter } from "wouter";
import "@/theme.css";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Rejoindre from "@/pages/Rejoindre";
import Histoire from "@/pages/Histoire";
import Contact from "@/pages/Contact";
import Statut from "@/pages/Statut";
import Cartes from "@/pages/Cartes";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ color: "#00bfff", fontSize: "4em", marginBottom: "16px" }}>
        404
      </h1>
      <p style={{ color: "rgba(17,24,39,0.65)" }}>Page introuvable</p>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/rejoindre" component={Rejoindre} />
        <Route path="/contact" component={Contact} />
        <Route path="/statut" component={Statut} />
        <Route path="/histoire" component={Histoire} />
        <Route path="/cartes" component={Cartes} />
        <Route component={NotFound} />

      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
