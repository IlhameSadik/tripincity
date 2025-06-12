import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  MapPin,
  PieChart,
  TrendingUp,
  ArrowRight,
  Calendar,
  Filter,
} from "lucide-react";
import logo from '../../assets/logo.svg';

/**
 * Dashboard TripinCity RAG – version simple & complète
 * ---------------------------------------------------
 * - Bootstrap 5 pour la grille & les utilitaires
 * - Icons : lucide-react
 * - Graphiques : recharts
 */

const Dashboard = () => {
  // 🗂️ Onglet actif
  const [activeTab, setActiveTab] = useState("aperçu");

  // 📊 Données cartes métriques
  const cardData = [
    {
      title: "Embeddings Générés",
      count: 10,
      icon: <Activity size={24} className="text-primary" />,
      growth: "+12%",
      color: "border-primary bg-primary bg-opacity-10",
    },
    {
      title: "Mises à jour Qdrant",
      count: 5,
      icon: <PieChart size={24} className="text-success" />,
      growth: "+5%",
      color: "border-success bg-success bg-opacity-10",
    },
    {
      title: "Appels API",
      count: 17,
      icon: <TrendingUp size={24} className="text-warning" />,
      growth: "+22%",
      color: "border-warning bg-warning bg-opacity-10",
    },
  ];

  // 📈 Données du graphique
  const chartData = [
    { name: "Lun", embeddings: 18, api: 30, qdrant: 5 },
    { name: "Mar", embeddings: 22, api: 32, qdrant: 8 },
    { name: "Mer", embeddings: 15, api: 27, qdrant: 6 },
    { name: "Jeu", embeddings: 25, api: 40, qdrant: 10 },
    { name: "Ven", embeddings: 30, api: 45, qdrant: 12 },
    { name: "Sam", embeddings: 18, api: 24, qdrant: 4 },
    { name: "Dim", embeddings: 12, api: 12, qdrant: 0 },
  ];

  // 📰 Activité récente
  const recentActivity = [
    {
      id: 1,
      type: "Embedding",
      detail: "Nouveaux embeddings pour City",
      time: "Il y a 10 min",
    },
    {
      id: 2,
      type: "API",
      detail: "Appel GET /cities/recommendations",
      time: "Il y a 23 min",
    },
    {
      id: 3,
      type: "Qdrant",
      detail: "Mise à jour de la collection 'locations'",
      time: "Il y a 45 min",
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                RENDERING                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* ░░░ NAVBAR ░░░ */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 rounded">
        <div className="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin text-primary me-2" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg><span class="fw-bold">TripinCity&nbsp;RAG</span></a>          

          

          
        </div>
      </nav>

      {/* ░░░ HEADER ░░░ */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3 gap-md-0">
        <div>
          <h1 className="h2 text-dark fw-bold mb-1">Dashboard TripinCity RAG</h1>
          <p className="text-muted mb-0">Statistiques et performances du système</p>
        </div>

        <div className="d-flex gap-2">
          <div className="dropdown">
            
            <ul className="dropdown-menu dropdown-menu-end">
              {["Aujourd'hui", "Cette semaine", "Ce mois", "Personnaliser"].map(
                (label, i) => (
                  <li key={i}>
                    {i === 3 && <hr className="dropdown-divider" />} {/* séparateur */}
                    <a className="dropdown-item" href="#">
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
         
        </div>
      </div>

      {/* ░░░ TAB NAV ░░░ */}
      <ul className="nav nav-pills mb-4">
        {[
          { key: "aperçu", label: "Aperçu" },
          { key: "embeddings", label: "Embeddings" },
          { key: "api", label: "API" },
          { key: "qdrant", label: "Qdrant" },
        ].map(({ key, label }) => (
          <li key={key} className="nav-item">
            <button
              className={`nav-link ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* ░░░ CONTENT ░░░ */}
      {activeTab === "aperçu" && (
        <>
          {/* ===================== Cards ===================== */}
          <div className="row g-3 mb-4">
            {cardData.map((item, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className={`${item.color} rounded p-2 me-3`}>{item.icon}</div>
                      <h6 className="mb-0 text-secondary fw-medium">{item.title}</h6>
                      <span className="badge bg-success ms-auto">{item.growth}</span>
                    </div>
                    <p className="h2 fw-bold mb-3">{item.count}</p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===================== Chart & Activité ===================== */}
          <div className="row g-4 mb-4">
            {/* === Graphique === */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title fw-bold mb-0">Activité de la semaine</h5>
                    <button className="btn btn-sm btn-outline-secondary d-flex align-items-center">
                      <Filter size={14} className="me-1" /> Filtrer
                    </button>
                  </div>

                  <div className="d-flex gap-4 mb-3">
                    {[
                      { label: "Embeddings", className: "bg-primary" },
                      { label: "API", className: "bg-warning" },
                      { label: "Qdrant", className: "bg-success" },
                    ].map(({ label, className }) => (
                      <div key={label} className="d-flex align-items-center gap-2">
                        <span className={`badge ${className} rounded-circle p-1`}></span> {label}
                      </div>
                    ))}
                  </div>

                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                        <XAxis dataKey="name" stroke="#6c757d" />
                        <YAxis stroke="#6c757d" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="embeddings"
                          stroke="#0d6efd"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="api"
                          stroke="#ffc107"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="qdrant"
                          stroke="#198754"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* === Activité récente === */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title fw-bold mb-0">Activité récente</h5>
                    <span className="badge bg-primary rounded-pill">
                      {recentActivity.length}
                    </span>
                  </div>

                  <ul className="list-group list-group-flush">
                    {recentActivity.map((act) => (
                      <li
                        key={act.id}
                        className="list-group-item d-flex justify-content-between align-items-start px-0"
                      >
                        <div className="d-flex">
                          <div
                            className={`rounded-circle me-3 d-flex align-items-center justify-content-center ${
                              act.type === "Embedding"
                                ? "bg-primary bg-opacity-10 text-primary"
                                : act.type === "API"
                                ? "bg-warning bg-opacity-10 text-warning"
                                : "bg-success bg-opacity-10 text-success"
                            }`}
                            style={{ width: "38px", height: "38px" }}
                          >
                            {act.type === "Embedding" ? (
                              <Activity size={16} />
                            ) : act.type === "API" ? (
                              <TrendingUp size={16} />
                            ) : (
                              <PieChart size={16} />
                            )}
                          </div>
                          <div>
                            <div className="fw-medium text-dark">{act.type}</div>
                            <div className="small text-muted mb-1">{act.detail}</div>
                            <div className="small text-secondary">{act.time}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ░░░ PLACEHOLDERS POUR AUTRES TABS ░░░ */}
      {activeTab !== "aperçu" && (
        <div className="card border-0 shadow-sm">
          <div className="card-body py-5 text-center text-muted">
            <p className="mb-0">
              Contenu de l'onglet <strong>{activeTab}</strong> à venir…
            </p>
          </div>
        </div>
      )}

      {/* ░░░ FOOTER ░░░ */}
      <footer className="mt-5 pt-4 border-top">
        <div className="d-flex flex-column flex-md-row justify-content-between text-muted small">
          <div>© 2025 TripinCity RAG Dashboard</div>
          <div>Dernière mise à jour : Aujourd'hui à 14:30</div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
