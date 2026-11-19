const STORAGE_KEY = "first-delivery-demo-v1";

const initialState = {
  authenticated: true,
  role: "client",
  page: "decouvrir",
  cart: [],
  selectedPartner: 0,
  lastOrder: null,
  storePaused: false,
  pauseUntil: null,
  pauseDurationMinutes: 30,
  pauseReason: "Cuisine saturée (trop de commandes)",
  scheduledHoursEnabled: true,
  expiredOrdersToday: 0,
  orderExpiryLimit: 3,
  pauseOnConsecutiveExpiry: true,
  orderSoundEnabled: true,
  openingHours: [
    { day: "Lundi", enabled: true, open1: "11:30", close1: "15:30", open2: "18:30", close2: "23:30", extra: [] },
    { day: "Mardi", enabled: true, open1: "11:30", close1: "15:30", open2: "18:30", close2: "23:30", extra: [] },
    { day: "Mercredi", enabled: true, open1: "11:30", close1: "15:30", open2: "18:30", close2: "23:30", extra: [] },
    { day: "Jeudi", enabled: true, open1: "11:30", close1: "15:30", open2: "18:30", close2: "23:30", extra: [] },
    { day: "Vendredi", enabled: true, open1: "12:00", close1: "16:00", open2: "19:00", close2: "00:00", extra: [] },
    { day: "Samedi", enabled: true, open1: "12:00", close1: "16:00", open2: "19:00", close2: "00:30", extra: [] },
    { day: "Dimanche", enabled: false, open1: "11:30", close1: "15:30", open2: "18:30", close2: "23:30", extra: [] }
  ],
  courierAvailable: false,
  courierAccepted: false,
  courierStep: 0,
  orderStatus: "Aucune commande en cours",
  partnerOrders: [
    { id: "FD-2841", partner: "Chez Mouna", customer: "Amira Ben Salem", items: "Couscous à l'agneau · 2 articles", amount: 32, minutes: 25, status: "À traiter" },
    { id: "FD-2839", partner: "Chez Mouna", customer: "Karim L.", items: "Brik à l'œuf · 1 article", amount: 8.4, minutes: 15, status: "En préparation" },
    { id: "FD-2836", partner: "Chez Mouna", customer: "Sonia T.", items: "Salade méchouia · 3 articles", amount: 18.2, minutes: 20, status: "Prête" }
  ],
  products: [
    { id: "p1", name: "Couscous à l'agneau", category: "Plats traditionnels", price: 21, emoji: "🍲", available: true, description: "Semoule fine, légumes de saison et agneau fondant." },
    { id: "p2", name: "Brik à l'œuf et thon", category: "Entrées", price: 4.2, emoji: "🥙", available: true, description: "Brik croustillante, thon, œuf et persil frais." },
    { id: "p3", name: "Ojja merguez artisanale", category: "Plats traditionnels", price: 14.5, emoji: "🍳", available: true, description: "Merguez grillées, tomates mijotées et œufs." },
    { id: "p4", name: "Salade méchouia", category: "Entrées", price: 6.8, emoji: "🥗", available: false, description: "Poivrons grillés, tomates et huile d'olive." },
    { id: "p5", name: "Assida noisette", category: "Desserts", price: 5.5, emoji: "🍮", available: true, description: "Crème de noisette, fruits secs et miel." }
  ],
  prospects: [
    { id: "pr1", name: "Le Jardin de Tunis", category: "Restaurant tunisien", area: "Grand Tunis · Centre", score: 96, status: "À contacter" },
    { id: "pr2", name: "Boulangerie Ben Yedder", category: "Boulangerie", area: "Ariana · Ennasr", score: 91, status: "Intéressé" },
    { id: "pr3", name: "Épicerie Fine Carthage", category: "Épicerie fine", area: "La Marsa · Carthage", score: 84, status: "Contacté" },
    { id: "pr4", name: "Chez Amel", category: "Cuisine maison", area: "Manouba · Ouest", score: 78, status: "À contacter" }
  ],
  managedAccounts: [
    { id: "ac1", name: "Karim Anouar", type: "Coursier", area: "Centre Ville", suspended: false },
    { id: "ac2", name: "Le Patio Tunisien", type: "Partenaire", area: "Ariana", suspended: true }
  ],
  partnerProfile: {
    name: "Chez Mouna", category: "Restaurant traditionnel tunisien & Grillades", description: "Spécialités tunisiennes authentiques, couscous vapeur au feu de bois et briks artisanales.", address: "12 Avenue Hédi Nouira, Ennasr 2, Ariana", latitude: 36.8652, longitude: 10.1867, phone: "+216 71 889 450", managerPhone: "+216 98 123 456", email: "contact@chezmouna.tn", payoutMethod: "Virement bancaire", rib: "TN59 8884 5012 3456 7890 1234", preparationMinutes: 20, hourlyCapacity: 12, documents: ["Registre de commerce · RNE.pdf", "Relevé bancaire · RIB officiel.pdf", "Carte d'identité du gérant", "Autorisation d'hygiène & sanitaire"], logoUrl: "", coverUrl: ""
  },
  applications: [
    { id: "ap1", name: "Saveurs de Carthage", type: "Partenaire · Restaurant", area: "Carthage", status: "À vérifier", initials: "SC" },
    { id: "ap2", name: "Yassine Gharbi", type: "Coursier · Scooter", area: "Ariana · Ennasr", status: "À vérifier", initials: "YG" },
    { id: "ap3", name: "Boulangerie Ben Yedder", type: "Partenaire · Boulangerie", area: "Ariana", status: "À vérifier", initials: "BY" }
  ],
  incidents: [],
  complaints: [
    { id: "REC-008", customer: "Rim K.", order: "FD-2829", reason: "Article manquant", amount: 4.2, status: "À examiner" },
    { id: "REC-006", customer: "Moez H.", order: "FD-2814", reason: "Retard de livraison", amount: 0, status: "À examiner" }
  ],
  deposit: "",
  deposits: [],
  closingValidated: false,
  commissionRate: 12,
  zoneRates: { "Ariana · Ennasr": 3.5, "Centre Ville": 4, "La Marsa · Carthage": 5, "Manouba · Ouest": 4.5 },
  modal: null
};

const profiles = {
  client: { name: "Espace client", person: "Amira Ben Salem", initials: "AB", role: "CLIENT", nav: [["decouvrir", "Découvrir", "⌂"], ["commandes", "Mes commandes", "▤"], ["suivi", "Suivi en direct", "◉"], ["reclamations-client", "Aide & réclamations", "⚑"], ["panier", "Mon panier", "▣"]] },
  partenaire: { name: "Espace partenaire", person: "Chez Mouna", initials: "CM", role: "PARTENAIRE", nav: [["accueil", "Vue d'ensemble", "⌂"], ["dossier", "Dossier partenaire", "▣"], ["commandes", "Commandes", "▤"], ["catalogue", "Catalogue", "▦"], ["horaires", "Horaires & pause", "◷"]] },
  coursier: { name: "Espace coursier", person: "Yassine Gharbi", initials: "YG", role: "COURSIER", nav: [["mission", "Ma mission", "⌁"], ["cash", "Cash & dépôts", "▣"], ["profil", "Mon profil", "♙"]] },
  responsable: { name: "Centre de pilotage", person: "Mouna Ktata", initials: "MK", role: "ADMIN MANAGER", nav: [["cockpit", "Vue d'ensemble", "⌂"], ["dispatch", "Supervision dispatch", "⌁"], ["comptes", "Demandes & comptes", "♙"], ["incidents", "Incidents terrain", "⚠"], ["finance", "Cash & closing", "▣"], ["reclamations", "Litiges", "⚑"], ["prospection", "Prospection IA", "✳"], ["previsions", "Prévisions", "⌁"], ["zones", "Zones & tarifs", "⌖"]] }
};

const pageTitles = {
  decouvrir: ["Bonjour Amira", "Des bonnes choses, livrées près de chez vous."],
  menu: ["Le menu de Chez Mouna", "Les saveurs du quartier, préparées avec soin."],
  commandes: ["Mes commandes", "Retrouvez vos achats et leur statut."],
  suivi: ["Suivi en direct", "Votre commande, de la collecte à votre porte."],
  "reclamations-client": ["Aide & réclamations", "Signalez un problème avec un restaurant, une livraison ou un coursier."],
  panier: ["Votre panier", "Vérifiez votre commande avant de la confirmer."],
  accueil: ["Bonjour, Chez Mouna", "Une belle journée pour régaler le quartier."],
  dossier: ["Dossier partenaire", "Votre établissement, vos coordonnées et vos informations de reversement."],
  catalogue: ["Votre catalogue", "Gérez vos plats, vos prix et leur disponibilité."],
  horaires: ["Horaires & disponibilité", "Votre boutique, à votre rythme."],
  mission: ["Ma tournée", "Une livraison fluide, un cash bien suivi."],
  cash: ["Mon portefeuille", "Suivez vos encaissements et vos dépôts."],
  profil: ["Mon profil coursier", "Informations de votre compte et de vos zones."],
  cockpit: ["Bonjour Mouna", "Voici l'essentiel de votre réseau aujourd'hui."],
  dispatch: ["Supervision du dispatch", "Les commandes et la flotte en temps réel."],
  comptes: ["Comptes & dossiers", "Validez les nouveaux partenaires et coursiers."],
  incidents: ["Incidents terrain", "Examinez les échecs de livraison et choisissez la suite à donner."],
  finance: ["Cash & closing", "Un suivi transparent de chaque dinar encaissé."],
  reclamations: ["Litiges & réclamations", "Trouvez une issue claire pour chaque demande."],
  prospection: ["Prospection intelligente", "Les prochains partenaires à rencontrer."],
  previsions: ["Prévision de la demande", "Anticipez la demande et renforcez les zones à temps."],
  zones: ["Zones & tarification", "Pilotez la couverture et les règles de livraison."]
};

const clientPartners = [
  { name: "Chez Mouna", type: "Cuisine tunisienne", category: "Traditionnel", area: "Grand Tunis", eta: "25–35 min", rating: "4.8", emoji: "🍲", tone: "warm" },
  { name: "Saveurs de Carthage", type: "Plats traditionnels", category: "Traditionnel", area: "Carthage", eta: "20–30 min", rating: "4.9", emoji: "🥘", tone: "peach" },
  { name: "Express Épicerie Ennasr", type: "Épicerie & marché", category: "Épicerie", area: "Ariana", eta: "15–25 min", rating: "4.7", emoji: "🧺", tone: "sage" },
  { name: "Le Comptoir du Jasmin", type: "Street food & grillades", category: "Street food", area: "Ariana", eta: "15–25 min", rating: "4.6", emoji: "🥙", tone: "peach" },
  { name: "Bowl & Basilic", type: "Cuisine fraîche", category: "Healthy", area: "Grand Tunis", eta: "20–30 min", rating: "4.9", emoji: "🥗", tone: "sage" }
];

const coverageZones = [
  { id: "ariana", name: "Ariana · Ennasr", couriers: 28, status: "active", center: [36.8657, 10.186], boundary: [[36.883, 10.155], [36.891, 10.185], [36.881, 10.216], [36.857, 10.213], [36.847, 10.184], [36.858, 10.158]] },
  { id: "centre", name: "Centre Ville", couriers: 18, status: "active", center: [36.8009, 10.1838], boundary: [[36.811, 10.158], [36.817, 10.186], [36.809, 10.213], [36.79, 10.207], [36.783, 10.18], [36.793, 10.16]] },
  { id: "marsa", name: "La Marsa · Carthage", couriers: 12, status: "warning", center: [36.851, 10.31], boundary: [[36.872, 10.275], [36.884, 10.307], [36.874, 10.348], [36.846, 10.349], [36.833, 10.318], [36.844, 10.283]] },
  { id: "manouba", name: "Manouba · Ouest", couriers: 8, status: "development", center: [36.81, 10.1], boundary: [[36.831, 10.064], [36.838, 10.099], [36.824, 10.13], [36.797, 10.132], [36.784, 10.102], [36.797, 10.07]] }
];

const money = (value) => `${Number(value || 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DT`;
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const badge = (text, tone = "neutral") => `<span class="badge badge-${tone}"><i></i>${esc(text)}</span>`;
const button = (label, action, kind = "primary", extra = "") => `<button type="button" class="button button-${kind}" data-action="${action}" ${extra}>${label}</button>`;

function isPartnerOpenNow() {
  if (!state.scheduledHoursEnabled) return true;
  const dayIndex = (new Date().getDay() + 6) % 7;
  const entry = state.openingHours?.[dayIndex];
  if (!entry?.enabled) return false;
  const now = new Date();
  const currentMinute = now.getHours() * 60 + now.getMinutes();
  const ranges = [[entry.open1, entry.close1], [entry.open2, entry.close2], ...(entry.extra || []).map((range) => [range.open, range.close])];
  return ranges.some(([start, end]) => {
    if (!start || !end) return false;
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const openAt = startHour * 60 + startMinute;
    let closeAt = endHour * 60 + endMinute;
    let adjustedNow = currentMinute;
    if (closeAt <= openAt) {
      closeAt += 24 * 60;
      if (adjustedNow < openAt) adjustedNow += 24 * 60;
    }
    return adjustedNow >= openAt && adjustedNow < closeAt;
  });
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(initialState);
  const parsed = JSON.parse(saved);
  delete parsed.authOtpSent;
  delete parsed.authPhone;
  return { ...structuredClone(initialState), ...parsed, modal: null };
}

let state = loadState();
let authOtpSent = false;
let authPhone = "";
let toastTimer;
let zonesMapInstance = null;
let zoneMapLayers = new Map();
let trackingMapInstance = null;
let courierMapInstance = null;
let dispatchMapInstance = null;
let trackingPositionTimer = null;
let courierLiveMarker = null;
let courierGpsMarker = null;
let courierGpsAccuracy = null;
let courierPositionTimer = null;

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, modal: null }));
}

function toast(message, tone = "success") {
  const region = document.querySelector("#toast-region");
  region.innerHTML = `<div class="toast toast-${tone}"><span class="toast-icon">${tone === "success" ? "✓" : "!"}</span>${esc(message)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { region.innerHTML = ""; }, 3200);
}

function setPage(page) {
  state.page = page;
  state.modal = null;
  save();
  render();
}

function render() {
  if (state.storePaused && state.pauseUntil && state.pauseUntil <= Date.now()) {
    state.storePaused = false;
    state.pauseUntil = null;
    save();
  }
  [zonesMapInstance, trackingMapInstance, courierMapInstance, dispatchMapInstance].forEach((map) => map?.remove());
  zonesMapInstance = null;
  trackingMapInstance = null;
  courierMapInstance = null;
  dispatchMapInstance = null;
  courierLiveMarker = null;
  courierGpsMarker = null;
  courierGpsAccuracy = null;
  zoneMapLayers.clear();
  clearInterval(trackingPositionTimer);
  trackingPositionTimer = null;
  clearInterval(courierPositionTimer);
  courierPositionTimer = null;
  if (!state.authenticated) {
    document.querySelector("#app").innerHTML = `${renderAuth()}${state.modal ? renderModal() : ""}`;
    return;
  }
  const profile = profiles[state.role];
  const [title, subtitle] = state.role === "partenaire" && state.page === "commandes"
    ? ["Commandes à traiter", "Répondez aux commandes et suivez leur préparation."]
    : pageTitles[state.page] || pageTitles[profile.nav[0][0]];
  document.querySelector("#app").innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#" data-action="home" aria-label="First Delivery, accueil">
          <span class="brand-mark"><span></span><span></span><span></span></span>
          <span class="brand-copy"><strong>first delivery</strong><small>La livraison autrement</small></span>
        </a>
        <button type="button" class="icon-button mobile-close" data-action="menu-close" aria-label="Fermer le menu">×</button>
        <div class="workspace-label">VOTRE ESPACE</div>
        <div class="role-card">
          <div class="avatar avatar-green">${profile.initials}</div>
          <div class="role-copy"><strong>${profile.person}</strong><span>${profile.role}</span></div>
          <span class="status-dot"></span>
        </div>
        <nav class="side-nav" aria-label="Navigation principale">
          ${profile.nav.map(([key, label, icon]) => `<button class="nav-link ${state.page === key ? "active" : ""}" type="button" data-page="${key}"><span class="nav-icon">${icon}</span><span>${label}</span>${key === "commandes" && state.role === "partenaire" ? '<span class="nav-count">2</span>' : key === "comptes" ? `<span class="nav-count">${state.applications.length}</span>` : key === "incidents" && state.incidents.some((incident) => !incident.resolution) ? `<span class="nav-count">${state.incidents.filter((incident) => !incident.resolution).length}</span>` : ""}</button>`).join("")}
        </nav>
        <div class="sidebar-bottom">
          <div class="help-card"><span class="help-icon">✳</span><strong>Besoin d'aide ?</strong><p>Notre équipe est là pour vous accompagner.</p><button type="button" data-action="help">Contacter le support <span>↗</span></button></div>
          <div class="sidebar-user"><div class="avatar avatar-soft">${profile.initials}</div><div><strong>${profile.person}</strong><small>Compte de démonstration</small></div><button class="icon-button" type="button" data-action="profile-menu" aria-label="Options du profil">···</button></div>
        </div>
      </aside>
      <main class="main-shell">
        <header class="topbar">
          <div class="topbar-left"><button class="icon-button mobile-menu" type="button" data-action="menu" aria-label="Ouvrir le menu">☰</button><span class="breadcrumb">${profile.name} <span>/</span> <strong>${esc(title)}</strong></span></div>
          <div class="topbar-actions">
            <label class="role-select-wrap"><span class="sr-only">Changer de profil</span><select id="role-select" aria-label="Changer de profil">${Object.entries(profiles).map(([key, value]) => `<option value="${key}" ${state.role === key ? "selected" : ""}>${value.name}</option>`).join("")}</select><span class="select-chevron">⌄</span></label>
            <button type="button" class="icon-button notification-button" data-action="notifications" aria-label="Notifications">♧<span class="notification-dot"></span></button>
            <div class="topbar-date">${new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" }).format(new Date())}</div>
            <button class="avatar avatar-dark top-avatar" type="button" data-action="profile-menu" aria-label="Profil">${profile.initials}</button>
          </div>
        </header>
        <section class="page-content">
          <div class="page-heading"><div><div class="eyebrow">${profile.role} <span>·</span> GRAND TUNIS</div><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div>${renderPageAction()}</div>
          ${renderPage()}
          <footer class="page-footer"><span><span class="footer-dot"></span> Données de démonstration</span><span>First Delivery <b>·</b> Vos livraisons, en confiance</span></footer>
        </section>
      </main>
      ${state.modal ? renderModal() : ""}
    </div>`;
  if (state.role === "responsable" && state.page === "zones") initializeZonesMap();
  if (state.role === "responsable" && state.page === "dispatch") initializeDispatchMap();
  if (state.role === "client" && state.page === "suivi") initializeTrackingMap();
  if (state.role === "coursier" && state.page === "mission") initializeCourierMap();
}

function renderAuth() {
  return `<main class="auth-shell"><section class="auth-story"><a class="brand auth-brand" href="#" data-action="home"><span class="brand-mark"><span></span><span></span><span></span></span><span class="brand-copy"><strong>first delivery</strong><small>La livraison autrement</small></span></a><div class="auth-story-copy"><span class="welcome-kicker">LE QUARTIER, À VOTRE PORTE</span><h1>Les belles journées commencent par une bonne livraison.</h1><p>Une plateforme pensée pour les clients, les commerces et celles et ceux qui font avancer la ville.</p><div class="auth-benefits"><span><i>✓</i> Livraison de proximité</span><span><i>✓</i> Paiement en espèces, en toute confiance</span><span><i>✓</i> Suivi et remise sécurisés</span></div></div><div class="auth-story-art" aria-hidden="true"><div class="auth-art-circle"></div><span>🛵</span><small>GRAND TUNIS · EN ROUTE</small></div><div class="auth-story-footer">Vos commerces préférés, toujours près de vous.</div></section><section class="auth-panel"><div class="auth-form-wrap"><span class="auth-welcome">BIENVENUE SUR FIRST DELIVERY</span><h2>${authOtpSent ? "Vérifiez votre téléphone" : "Ravi de vous retrouver."}</h2><p>${authOtpSent ? "Nous avons préparé un code de démonstration pour poursuivre." : "Connectez-vous avec votre numéro de téléphone."}</p><form data-auth-form>${authOtpSent ? `<div class="phone-summary"><span>+216</span><strong>${esc(authPhone || "Votre numéro")}</strong><button type="button" class="text-button" data-action="edit-phone">Modifier</button></div><label class="form-field auth-field">CODE DE VÉRIFICATION<input name="code" inputmode="numeric" maxlength="6" placeholder="· · · · · ·" autocomplete="one-time-code" required></label><div class="auth-demo-code">Code de démonstration : <strong>123456</strong></div>` : `<label class="form-field auth-field">VOTRE ESPACE<select id="auth-role" name="role">${Object.entries(profiles).map(([key, profile]) => `<option value="${key}" ${state.role === key ? "selected" : ""}>${profile.name}</option>`).join("")}</select></label><label class="form-field auth-field">NUMÉRO DE TÉLÉPHONE<div class="phone-input"><span>🇹🇳 &nbsp;+216</span><input name="phone" type="tel" inputmode="tel" placeholder="98 123 456" autocomplete="tel" required></div></label><span class="auth-privacy">Un code à usage unique vous sera demandé pour confirmer votre numéro.</span>`}<button type="submit" class="button button-primary auth-submit">${authOtpSent ? "Vérifier et continuer →" : "Recevoir mon code OTP →"}</button></form><div class="auth-divider"><span>OU REJOINDRE LE RÉSEAU</span></div><div class="join-options"><button type="button" class="join-option" data-action="join-modal" data-role="partenaire"><span>🍲</span><span><strong>Je suis commerçant</strong><small>Proposer mon établissement</small></span><b>→</b></button><button type="button" class="join-option" data-action="join-modal" data-role="coursier"><span>🛵</span><span><strong>Je suis coursier</strong><small>Rejoindre l'équipe terrain</small></span><b>→</b></button></div><div class="auth-footnote">♧ &nbsp; Données fictives · Aucun SMS n'est réellement envoyé.</div></div></section></main>`;
}

function renderPageAction() {
  if (state.role === "client" && state.page === "decouvrir") return `<button type="button" class="button button-primary" data-page="commandes"><span>▤</span> Mes commandes</button>`;
  if (state.role === "client" && state.page === "menu") return `<button type="button" class="button button-secondary" data-page="panier"><span>▣</span> Mon panier${state.cart.length ? ` · ${state.cart.reduce((sum, item) => sum + item.quantity, 0)}` : ""}</button>`;
  if (state.role === "partenaire" && state.page === "catalogue") return button("<span>＋</span> Ajouter un plat", "add-product", "primary");
  if (state.role === "partenaire" && state.page === "dossier") return `<button type="submit" form="partner-profile-form" class="button button-primary">Enregistrer les modifications →</button>`;
  if (state.role === "responsable" && state.page === "finance") return button("<span>＋</span> Enregistrer un dépôt", "deposit-modal", "primary");
  if (state.role === "responsable" && state.page === "comptes") return button("<span>↓</span> Exporter la liste", "export", "secondary");
  return `<span class="live-pill"><i></i> ${state.role === "coursier" ? (state.courierAvailable ? "EN LIGNE" : "HORS LIGNE") : "SERVICE EN LIGNE"}</span>`;
}

function renderPage() {
  if (state.role === "client") return renderClient();
  if (state.role === "partenaire") return renderPartner();
  if (state.role === "coursier") return renderCourier();
  return renderAdmin();
}

function renderClient() {
  if (state.page === "menu") return renderPartnerMenu();
  if (state.page === "decouvrir") {
    return `
      <section class="welcome-banner client-welcome">
        <div class="welcome-copy"><span class="welcome-kicker">BIENVENUE CHEZ FIRST DELIVERY</span><h2>Les bonnes choses<br>arrivent jusqu'à vous.</h2><p>Vos commerces préférés, livrés avec le sourire.</p><div class="address-chip"><span>⌖</span><span><small>LIVRER À</small><strong>Résidence Les Jasmins, Ennasr</strong></span><button type="button" data-action="address">Modifier</button></div></div>
        <div class="welcome-illustration" aria-hidden="true"><div class="sun-disc"></div><span class="illustration-bag">🛍️</span><span class="illustration-leaf">✳</span><div class="illustration-ground"></div></div>
      </section>
      <div class="section-heading"><div><h2>Qu'est-ce qui vous ferait plaisir ?</h2><p>Des adresses choisies tout près de vous.</p></div><button type="button" class="text-button" data-action="all-categories">Toutes les catégories <span>→</span></button></div>
      <div class="category-row">${[["🍽️", "Tout", "selected"], ["🥘", "Traditionnel", ""], ["🥙", "Street food", ""], ["🥗", "Healthy", ""], ["🛒", "Épicerie", ""]].map(([icon, text, tone]) => `<button type="button" class="category-chip ${tone}" data-action="category" data-category="${text}"><span>${icon}</span>${text}</button>`).join("")}</div>
      <div class="section-heading partner-section"><div><h2>À découvrir près de vous <span class="live-mini"><i></i> ${clientPartners.length} ouverts</span></h2><p>Des adresses locales, sélectionnées avec soin.</p></div><label class="search-field compact-search"><span>⌕</span><input id="partner-search" type="search" placeholder="Rechercher une adresse…" aria-label="Rechercher une adresse"></label></div>
      <div class="filter-row partner-filter-row"><label class="form-field">Quartier<select class="small-select" id="partner-area"><option value="all">Tous les quartiers</option><option>Ariana</option><option>Carthage</option><option>Grand Tunis</option></select></label><label class="form-field">Note minimale<select class="small-select" id="partner-rating"><option value="0">Toutes les notes</option><option value="4.5">4,5 et plus</option><option value="4.8">4,8 et plus</option></select></label><label class="form-field">Trier par<select class="small-select" id="partner-sort"><option value="recommended">Recommandés</option><option value="rating">Mieux notés</option><option value="fastest">Livraison la plus rapide</option></select></label></div>
      <div class="partner-grid">${clientPartners.map((partner, index) => `<article class="partner-card" data-partner-category="${esc(partner.category)}" data-partner-index="${index}" data-partner-area="${esc(partner.area)}" data-partner-rating="${partner.rating}" data-partner-eta="${Number.parseInt(partner.eta, 10)}" data-search-card="${esc((partner.name + " " + partner.type + " " + partner.area).toLowerCase())}">
        <div class="partner-cover cover-${partner.tone}"><span class="cover-emoji">${partner.emoji}</span><span class="open-label"><i></i> ${partner.name !== "Chez Mouna" ? "Ouvert" : state.storePaused ? "En pause" : isPartnerOpenNow() ? "Ouvert" : "Fermé"}</span><button class="favorite-button" type="button" data-action="favorite" aria-label="Ajouter ${partner.name} aux favoris">♡</button><div class="cover-caption"><span>${partner.type}</span><strong>${partner.name}</strong></div></div>
        <div class="partner-card-body"><div class="partner-meta"><span>⌖ ${partner.area}</span><span>◷ ${partner.eta}</span></div><div class="partner-card-footer"><span class="rating">★ ${partner.rating} <small>(120+)</small></span><button type="button" class="text-button" data-action="open-menu" data-partner="${index}" ${partner.name === "Chez Mouna" && (state.storePaused || !isPartnerOpenNow()) ? "disabled" : ""}>Voir le menu <b>→</b></button></div></div>
      </article>`).join("")}</div>
      <section class="promise-strip"><span class="promise-icon">✳</span><div><strong>Votre quartier, à portée de clic.</strong><p>Payez simplement en espèces à la livraison, sans surprise.</p></div><span class="promise-note">PAIEMENT COD SÉCURISÉ <b>✓</b></span></section>`;
  }
  if (state.page === "panier") return renderCart();
  if (state.page === "suivi") return renderTracking();
  if (state.page === "reclamations-client") return renderClientComplaints();
  return renderOrders();
}

function renderClientComplaints() {
  const own = state.complaints.filter((item) => item.customer === profiles.client.person);
  return `<section class="help-hero"><div><span class="welcome-kicker">ON EST LÀ POUR VOUS</span><h2>Un souci avec votre commande ?</h2><p>Choisissez le sujet : restaurant, livraison ou coursier. Votre demande sera suivie dans cette démonstration.</p></div><button type="button" class="button button-primary" data-action="complaint-modal">+ Nouvelle réclamation</button></section>
    <section class="panel client-complaints-panel"><div class="panel-heading"><div><span class="panel-icon alert-icon">⚑</span><div><h2>Mes demandes</h2><p>${own.length} réclamation${own.length === 1 ? "" : "s"} liée${own.length === 1 ? "" : "s"} à votre compte</p></div></div></div>
    ${own.length ? `<div class="complaint-list">${own.map((item) => `<article class="complaint-row client-complaint-row"><div class="complaint-ref"><span class="complaint-icon">⚑</span><div><strong>${esc(item.id)} · ${esc(item.order)}</strong><small>${esc(item.createdAt || "Demande récente")}</small></div></div><div class="complaint-reason"><small>${esc(item.type || "Commande")} · ${esc(item.reason)}</small><strong>${esc(item.comment || "Aucun détail supplémentaire")}</strong></div><div>${badge(item.status || "À examiner", item.status === "Résolue" ? "green" : "peach")}</div>${item.resolution ? `<small class="complaint-resolution">Réponse : ${esc(item.resolution)}</small>` : ""}</article>`).join("")}</div>` : `<div class="empty-state compact-empty"><span>♡</span><h3>Aucune réclamation</h3><p>Si un article manque, si votre livraison a un problème ou si vous souhaitez signaler le comportement d'un coursier, créez une demande ici.</p><button type="button" class="button button-secondary" data-action="complaint-modal">Décrire un problème</button></div>`}</section>`;
}

function renderPartnerMenu() {
  const partner = clientPartners[state.selectedPartner] || clientPartners[0];
  return `<section class="menu-hero cover-${partner.tone}"><span class="menu-emoji">${partner.emoji}</span><div><span class="open-label"><i></i> ${partner.name !== "Chez Mouna" ? "Ouvert" : state.storePaused ? "En pause" : isPartnerOpenNow() ? "Ouvert" : "Fermé"} · ${partner.eta}</span><h2>${esc(partner.name)}</h2><p>${esc(partner.type)} · ${esc(partner.area)} · ★ ${partner.rating}</p><small>Livraison 3,500 DT · Paiement en espèces</small></div></section>
    <div class="section-heading"><div><h2>À la carte</h2><p>Vos plats sont préparés à la commande.</p></div><span class="live-mini"><i></i> 25–35 min</span></div>
    <div class="menu-product-grid">${state.products.filter((item) => item.available).map((product) => `<article class="menu-product-card"><span class="menu-product-emoji">${product.emoji}</span><div class="menu-product-content"><span class="product-category">${esc(product.category)}</span><strong>${esc(product.name)}</strong><p>${esc(product.description)}</p><div><strong>${money(product.price)}</strong><button type="button" class="add-to-cart" data-action="add-to-cart" data-id="${product.id}">＋</button></div></div></article>`).join("")}</div>`;
}

function renderCart() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = state.cart.length ? 3.5 : 0;
  return `<div class="content-grid cart-layout"><section class="panel"><div class="panel-heading"><div><span class="panel-icon">🛍️</span><div><h2>Votre sélection</h2><p>${state.cart.length} article${state.cart.length === 1 ? "" : "s"} · ${state.cart.length ? esc(state.cart[0].partner) : "Choisissez une adresse"}</p></div></div><button class="text-button" type="button" data-page="decouvrir">Continuer mes achats</button></div>
    ${state.cart.length ? `<div class="cart-items">${state.cart.map((item) => `<div class="cart-item"><span class="cart-item-emoji">${item.emoji}</span><div class="cart-item-info"><strong>${esc(item.name)}</strong><small>${money(item.price)} · ${esc(item.partner)}</small></div><div class="quantity-control"><button type="button" data-action="quantity" data-id="${item.id}" data-delta="-1" aria-label="Retirer un article">−</button><span>${item.quantity}</span><button type="button" data-action="quantity" data-id="${item.id}" data-delta="1" aria-label="Ajouter un article">+</button></div><strong class="cart-line-price">${money(item.price * item.quantity)}</strong></div>`).join("")}</div>
    <div class="address-panel"><div class="address-icon">⌖</div><div><small>ADRESSE DE LIVRAISON</small><strong>Résidence Les Jasmins, Ennasr 2</strong><span>Avenue Hédi Nouira, Ariana, Tunisie</span></div><button type="button" class="text-button" data-action="address">Modifier</button></div>` : `<div class="empty-state"><span>🛍️</span><h3>Votre panier attend sa première envie</h3><p>Explorez les adresses de votre quartier et ajoutez vos plats préférés.</p><button type="button" class="button button-primary" data-page="decouvrir">Découvrir les adresses</button></div>`}
    </section>
    <aside class="panel order-summary"><div class="panel-heading"><div><span class="panel-icon">✳</span><div><h2>Récapitulatif</h2><p>Une dernière vérification</p></div></div></div><div class="summary-lines"><div><span>Sous-total</span><strong>${money(subtotal)}</strong></div><div><span>Livraison</span><strong>${money(fee)}</strong></div></div><div class="summary-total"><span>Total à payer <small>en espèces à la livraison</small></span><strong>${money(subtotal + fee)}</strong></div><div class="payment-note"><span>▣</span><span><strong>Paiement à la livraison</strong><small>Préparez le montant exact si possible.</small></span><b>COD</b></div>${button("Confirmer ma commande <span>→</span>", "checkout", "primary", state.cart.length ? "" : "disabled")}<p class="secure-note">♧ &nbsp; Paiement sécurisé · Aucune carte requise</p></aside></div>`;
}

function renderTracking() {
  const active = !["Aucune commande en cours", "Annulée", "Refusée"].includes(state.orderStatus);
  const stageMap = { "En attente du partenaire": 0, Acceptée: 1, "Prête pour collecte": 2, "Coursier assigné": 2, "Première collecte confirmée": 2, "Collectes confirmées · Livraison en cours": 3, Livrée: 4 };
  const currentStage = state.lastOrder ? stageMap[state.lastOrder.status] ?? 0 : -1;
  return `<div class="tracking-layout"><section class="panel tracking-main"><div id="tracking-map" class="tracking-map real-map" role="application" aria-label="Carte réelle du trajet de livraison à Ariana"><div class="map-credit map-credit-overlay">Position simulée · <span id="tracking-route-status">itinéraire routier Ariana</span> · © OpenStreetMap</div></div>
    <div class="tracking-details"><div class="tracking-title"><span class="courier-photo">YG</span><div><small>VOTRE COURSIER</small><strong>Yassine Gharbi <span class="verified">✓</span></strong><span>★ 4,9 · Scooter · En route vers vous</span></div><button type="button" class="icon-button call-button" data-action="call" aria-label="Appeler le coursier">☎</button></div><div class="eta-card"><span class="eta-icon">◷</span><div><small>ARRIVÉE ESTIMÉE</small><strong>${active ? "Dans environ 12 minutes" : "En attente de commande"}</strong><span>Promesse confirmée à l'acceptation</span></div><span class="eta-live"><i></i> ACTUALISÉE</span></div>
    <div class="timeline">${[["Commande confirmée", "Le partenaire prépare votre commande", "✓"], ["Prête pour la collecte", "Votre coursier récupère les articles", "2"], ["En route vers vous", "Yassine arrive à votre adresse", "3"], ["Livraison", "Remise sécurisée par code", "4"]].map(([title, detail, step], i) => `<div class="timeline-item ${active && i < currentStage ? "complete" : ""} ${active && i === currentStage ? "current" : ""}"><span class="timeline-dot">${active && i < currentStage ? "✓" : step}</span><div><strong>${title}</strong><small>${active && i === currentStage ? esc(state.orderStatus) : detail}</small></div>${active && i < currentStage ? '<span class="timeline-time">14:32</span>' : ""}</div>`).join("")}</div>
    </div></section><aside class="panel delivery-code-panel"><span class="code-kicker">UNE LIVRAISON EN TOUTE CONFIANCE</span><div class="shield-icon">♧</div><h2>Votre code de remise</h2><p>Présentez ce code à usage unique au coursier lorsque vous recevez votre commande.</p><div class="demo-qr" aria-label="QR code de démonstration"><span>▦</span><small>QR SÉCURISÉ</small></div><div class="otp-code"><span>4</span><span>8</span><span>2</span><span>1</span><span>9</span><span>6</span></div><small class="code-expiry">Code de secours · valable quelques minutes</small><button type="button" class="text-button" data-action="verify-code">Utiliser le code SMS</button><div class="delivery-tip">♧ <span>Ne partagez ce code qu'à la remise de votre commande.</span></div></aside></div>`;
}

function renderOrders() {
  const status = state.lastOrder?.status || state.orderStatus;
  return `<section class="orders-banner"><div class="orders-banner-icon">▤</div><div><small>VOTRE HISTORIQUE</small><h2>Vos commandes, toujours à portée de main.</h2><p>Suivez vos livraisons et retrouvez vos bonnes adresses.</p></div><span class="orders-count">0${state.lastOrder ? "4" : "3"} <small>COMMANDES</small></span></section>
    <div class="section-heading order-heading"><div><h2>Commandes récentes</h2><p>Vos dernières commandes passées sur First Delivery.</p></div><button type="button" class="button button-secondary" data-page="decouvrir">＋ Nouvelle commande</button></div>
    ${state.lastOrder ? `<article class="order-card"><div class="order-card-head"><div class="order-number"><span class="order-icon">🍲</span><div><strong>${esc(state.lastOrder.partner)}</strong><small>Aujourd'hui · 14:32 · ${esc(status)}</small></div></div>${badge(status, status === "Livrée" ? "green" : "mint")}</div><div class="order-card-content"><div><small>COMMANDE</small><strong>FD-2841 · ${state.lastOrder.items.length} article${state.lastOrder.items.length > 1 ? "s" : ""}</strong></div><div><small>PAIEMENT</small><strong>Espèces à la livraison</strong></div><div><small>TOTAL</small><strong>${money(state.lastOrder.total)}</strong></div></div><div class="order-card-actions">${button("Suivre la commande", "open-tracking", "primary")}${["En attente du partenaire", "Acceptée"].includes(status) ? button("Annuler sans frais", "cancel-order", "danger-soft") : ""}${button("Besoin d'aide ?", "complaint-modal", "secondary", 'data-id="FD-2841"')}</div></article>` : ""}
    ${[["Saveurs de Carthage", "Hier · 20:14", "Livrée", "24,00 DT", "🧆"], ["Express Épicerie Ennasr", "12 mai · 11:42", "Livrée", "18,50 DT", "🧺"]].map(([name, date, status, amount, icon]) => `<article class="order-card past-order"><div class="order-card-head"><div class="order-number"><span class="order-icon">${icon}</span><div><strong>${name}</strong><small>${date} · 2 articles</small></div></div>${badge(status, "green")}</div><div class="order-card-content"><div><small>COMMANDE</small><strong>FD-27${name.startsWith("Saveurs") ? "84" : "65"}</strong></div><div><small>PAIEMENT</small><strong>Espèces · réglé</strong></div><div><small>TOTAL</small><strong>${amount}</strong></div></div><div class="order-card-actions">${button("Commander à nouveau", "reorder", "secondary")}${button("Donner mon avis", "review-modal", "text")}</div></article>`).join("")}`;
}

function renderPartner() {
  if (state.page === "dossier") return renderPartnerDossier();
  if (state.page === "catalogue") return renderCatalog();
  if (state.page === "horaires") return renderHours();
  if (state.page === "commandes") return renderPartnerOrders();
  return `<div class="metric-grid four-metrics">${metric("Ventes aujourd'hui", "842,500 DT", "+12,8%", "mint", "↗")}${metric("Commandes reçues", "28", "+6 aujourd'hui", "lavender", "▤")}${metric("Note moyenne", "4,8 <small>/ 5</small>", "Excellent", "peach", "★")}${metric("Temps de préparation", "24 min", "−3 min cette semaine", "blue", "◷")}</div>
    <div class="dashboard-grid"><section class="panel sales-panel"><div class="panel-heading"><div><span class="panel-icon">↗</span><div><h2>Vos ventes</h2><p>Une belle progression cette semaine.</p></div></div><select class="small-select" aria-label="Période"><option>Cette semaine</option><option>Ce mois</option></select></div><div class="sales-total">2 849,500 <small>DT</small><span class="trend-up">↗ 12,8%</span></div>${salesChart()}<div class="chart-days"><span>Lun.</span><span>Mar.</span><span>Mer.</span><span>Jeu.</span><span>Ven.</span><span>Sam.</span><span>Dim.</span></div></section>
    <section class="panel pending-panel"><div class="panel-heading"><div><span class="panel-icon alert-icon">!</span><div><h2>À traiter <span class="count-pill">2</span></h2><p>Répondez avant expiration du délai.</p></div></div><button type="button" class="text-button" data-page="commandes">Tout voir →</button></div>${state.partnerOrders.filter((order) => order.status === "À traiter").map((order) => partnerOrderMini(order)).join("")}<div class="quick-note"><span>✳</span><span><strong>Une nouvelle commande ?</strong><small>Vous avez 2 minutes pour répondre.</small></span></div></section></div>
    <div class="section-heading compact-heading"><div><h2>Votre activité récente</h2><p>Les dernières commandes de votre établissement.</p></div><button class="text-button" type="button" data-page="commandes">Voir toutes les commandes →</button></div>
    <section class="panel table-panel">${partnerOrderTable()}</section>`;
}

function renderPartnerDossier() {
  const p = state.partnerProfile;
  return `<div class="dossier-status-banner"><span class="panel-icon">✓</span><div><strong>Dossier validé · Établissement actif</strong><p>Vous pouvez actualiser vos informations opérationnelles à tout moment.</p></div>${badge("3 / 4 PIÈCES VALIDÉES", "green")}</div>
    <form id="partner-profile-form" data-partner-profile-form class="partner-dossier-layout"><div class="dossier-main">
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">▣</span><div><h2>Identité de l'établissement</h2><p>Les informations visibles par vos clients.</p></div></div></div><div class="dossier-fields">${modalField("Nom commercial de l'enseigne", "name", p.name)}${modalField("Catégorie gastronomique principale", "category", p.category)}<label class="form-field dossier-span-two">Description courte de la cuisine<textarea name="description" maxlength="250">${esc(p.description)}</textarea></label></div></section>
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">⌖</span><div><h2>Localisation & coordonnées GPS</h2><p>Position utilisée pour le premier kilomètre et la zone de livraison.</p></div></div>${badge("ZONE GRAND TUNIS", "mint")}</div><div class="dossier-fields"><label class="form-field dossier-span-two">Adresse physique du point de retrait<input name="address" value="${esc(p.address)}"></label>${modalField("Latitude GPS", "latitude", p.latitude, "number")}${modalField("Longitude GPS", "longitude", p.longitude, "number")}</div><div class="dossier-map"><div class="map-grid"></div><span class="map-zone zone-a">ARIANA · ENNASR</span><span class="fleet-pin drone-a">⌖</span><span class="map-credit">Position enregistrée · ${p.latitude}, ${p.longitude}</span></div></section>
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">♙</span><div><h2>Contacts opérationnels</h2><p>Utilisés pour les commandes et les échanges de gestion.</p></div></div></div><div class="dossier-fields">${modalField("Téléphone boutique", "phone", p.phone, "tel")}${modalField("Mobile du responsable", "managerPhone", p.managerPhone, "tel")}${modalField("E-mail professionnel", "email", p.email, "email")}</div></section>
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">◷</span><div><h2>Opérations cuisine & logistique</h2><p>Aidez le dispatch à proposer une promesse de livraison fiable.</p></div></div>${badge("DISPATCH", "mint")}</div><div class="dossier-fields">${modalField("Temps de préparation habituel (minutes)", "preparationMinutes", p.preparationMinutes, "number")}${modalField("Capacité maximale (commandes / heure)", "hourlyCapacity", p.hourlyCapacity, "number")}</div></section>
    </div><aside class="dossier-side">
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">▣</span><div><h2>Mode de versement</h2><p>Reversement net de commission.</p></div></div>${badge("AUTORISÉ", "green")}</div><label class="form-field">Mode de reversement<select name="payoutMethod"><option ${p.payoutMethod === "Virement bancaire" ? "selected" : ""}>Virement bancaire</option><option ${p.payoutMethod === "Chèque certifié au Hub" ? "selected" : ""}>Chèque certifié au Hub</option><option ${p.payoutMethod === "Espèces au Hub logistique" ? "selected" : ""}>Espèces au Hub logistique</option></select></label>${modalField("RIB / compte de versement", "rib", p.rib)}<div class="modal-notice">La commission standard de ${state.commissionRate}% est déduite avant reversement.</div></section>
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">▤</span><div><h2>Pièces justificatives</h2><p>Documents transmis à l'équipe responsable.</p></div></div>${badge("PDF / JPG", "mint")}</div><div class="dossier-document-list">${p.documents.map((doc, index) => `<div class="dossier-document"><span>✓</span><div><strong>${esc(doc)}</strong><small>${index === 2 ? "À compléter" : "Vérifié"}</small></div></div>`).join("")}</div><label class="form-field dossier-upload">Ajouter un lien de justificatif<input name="newDocument" type="url" placeholder="https://…"></label></section>
      <section class="panel dossier-panel"><div class="panel-heading"><div><span class="panel-icon">▧</span><div><h2>Identité visuelle & enseigne</h2><p>Logo et photo de couverture client.</p></div></div></div>${modalField("Lien du logo", "logoUrl", p.logoUrl, "url", false, "https://…")}${modalField("Photo de couverture", "coverUrl", p.coverUrl, "url", false, "https://…")}</section>
    </aside></form>`;
}

function partnerOrderMini(order) {
  return `<div class="pending-order"><div class="pending-order-top"><strong>${esc(order.id)}</strong><span class="countdown"><i></i> 01:42</span></div><div class="pending-order-info"><div><strong>${esc(order.customer)}</strong><small>${esc(order.items)}</small></div><strong>${money(order.amount)}</strong></div><div class="pending-order-actions"><button type="button" class="button button-primary button-small" data-action="accept-order" data-id="${order.id}">Accepter</button><button type="button" class="button button-danger-soft button-small" data-action="refuse-order" data-id="${order.id}">Refuser</button></div></div>`;
}

function partnerOrderTable() {
  return `<div class="table-wrap"><table><thead><tr><th>COMMANDE</th><th>CLIENT</th><th>ARTICLES</th><th>TOTAL</th><th>STATUT</th><th></th></tr></thead><tbody>${state.partnerOrders.map((order) => `<tr data-filter-item="orders" data-filter-value="${esc(order.status)}"><td><strong>${esc(order.id)}</strong></td><td>${esc(order.customer)}</td><td>${esc(order.items)}</td><td><strong>${money(order.amount)}</strong></td><td>${badge(order.status, order.status === "À traiter" ? "peach" : order.status === "Prête" ? "green" : order.status === "Refusée" ? "peach" : "mint")}</td><td>${order.status === "À traiter" ? `<button type="button" class="text-button" data-action="accept-order" data-id="${order.id}">Accepter</button> <button type="button" class="text-button reject-action" data-action="refuse-order" data-id="${order.id}">Refuser</button>` : order.status === "En préparation" ? `<button type="button" class="text-button" data-action="ready-order" data-id="${order.id}">Commande prête</button>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
}

function renderPartnerOrders() {
  return `<div class="filter-row"><div class="filter-pills" data-filter-group="orders"><button class="filter-pill active" type="button" data-action="filter-orders" data-filter-value="all">Toutes <span>${state.partnerOrders.length}</span></button><button class="filter-pill" type="button" data-action="filter-orders" data-filter-value="À traiter">À traiter <span>${state.partnerOrders.filter((order) => order.status === "À traiter").length}</span></button><button class="filter-pill" type="button" data-action="filter-orders" data-filter-value="En préparation">En préparation</button><button class="filter-pill" type="button" data-action="filter-orders">Prêtes</button></div><label class="search-field compact-search"><span>⌕</span><input id="order-search" type="search" placeholder="Rechercher une commande…" aria-label="Rechercher une commande"></label></div><section class="panel table-panel">${partnerOrderTable()}</section>`;
}

function renderCatalog() {
  return `<div class="catalog-summary"><div class="catalog-summary-copy"><span class="catalog-spark">✳</span><div><strong>Votre carte est à jour ?</strong><p>Un catalogue complet donne envie de commander.</p></div></div><div class="catalog-counts"><div><strong>${state.products.length}</strong><small>PLATS AU MENU</small></div><div><strong>${state.products.filter((item) => item.available).length}</strong><small>DISPONIBLES</small></div><div><strong>21,000 DT</strong><small>PRIX MOYEN</small></div></div></div>
    <div class="filter-row catalog-filter"><div class="filter-pills" data-filter-group="products"><button class="filter-pill active" type="button" data-action="filter-products" data-filter-value="all">Tous les plats</button><button class="filter-pill" type="button" data-action="filter-products" data-filter-value="Plats traditionnels">Plats traditionnels</button><button class="filter-pill" type="button" data-action="filter-products" data-filter-value="Entrées">Entrées</button><button class="filter-pill" type="button" data-action="filter-products" data-filter-value="Desserts">Desserts</button></div><label class="search-field compact-search"><span>⌕</span><input id="product-search" type="search" placeholder="Rechercher un plat…" aria-label="Rechercher un plat"></label></div>
    <section class="product-list">${state.products.map((product) => `<article class="product-row" data-product="${product.id}" data-filter-item="products" data-filter-value="${esc(product.category)}"><span class="product-emoji">${product.emoji}</span><div class="product-details"><div class="product-title-line"><strong>${esc(product.name)}</strong>${badge(product.available ? "Disponible" : "Indisponible", product.available ? "green" : "peach")}</div><span class="product-category">${esc(product.category)}</span><p>${esc(product.description)}</p><strong class="product-price">${money(product.price)}</strong></div><div class="product-controls"><label class="switch-label"><span>${product.available ? "Visible" : "Masqué"}</span><button class="switch ${product.available ? "on" : ""}" type="button" role="switch" aria-checked="${product.available}" data-action="toggle-product" data-id="${product.id}" aria-label="Changer la disponibilité de ${esc(product.name)}"><i></i></button></label><button class="button button-secondary button-small" type="button" data-action="edit-product" data-id="${product.id}">Modifier</button></div></article>`).join("")}</section>`;
}

function renderHours() {
  if (state.storePaused && state.pauseUntil && state.pauseUntil <= Date.now()) {
    state.storePaused = false;
    state.pauseUntil = null;
    save();
  }
  const week = state.openingHours;
  const durationOptions = [[15, "15 min", "Rush cuisine ponctuel"], [30, "30 min", "Rupture temporaire"], [60, "1 heure", "Coupure de service"], [-1, "Fin de jour", "Fermeture anticipée"]];
  const securityExpired = Math.min(state.orderExpiryLimit, state.expiredOrdersToday);
  return `<div class="schedule-page-grid">
    <section class="panel weekly-schedule-panel"><div class="panel-heading"><div><span class="panel-icon">◷</span><div><h2>Horaires d'ouverture réguliers</h2><p>Établissement Chez Mouna · Ennasr 2</p></div></div><label class="schedule-master-switch">Horaires programmés<input type="checkbox" id="scheduled-hours-enabled" ${state.scheduledHoursEnabled ? "checked" : ""} aria-label="Horaires programmés"></label></div>
      <div class="schedule-sync"><span>▣ Synchronisation rapide</span><button type="button" class="text-button" data-action="copy-monday">Dupliquer lundi sur la semaine ↯</button></div>
      <form data-weekly-hours-form class="weekly-hours-form"><div class="hours-list">${week.map((entry, index) => `<article class="schedule-day ${entry.enabled ? "" : "day-closed"}" data-day-index="${index}"><label class="schedule-day-toggle"><input type="checkbox" name="enabled-${index}" ${entry.enabled ? "checked" : ""}><strong>${esc(entry.day)}</strong><small>${entry.enabled ? "OUVERT" : "FERMÉ"}</small></label><div class="schedule-shifts"><label><small>☼ Déjeuner</small><span><input type="time" name="open1-${index}" value="${entry.open1}" ${entry.enabled ? "" : "disabled"}><i>–</i><input type="time" name="close1-${index}" value="${entry.close1}" ${entry.enabled ? "" : "disabled"}></span></label><label><small>☾ Dîner</small><span><input type="time" name="open2-${index}" value="${entry.open2}" ${entry.enabled ? "" : "disabled"}><i>–</i><input type="time" name="close2-${index}" value="${entry.close2}" ${entry.enabled ? "" : "disabled"}></span></label>${(entry.extra || []).map((range, rangeIndex) => `<label><small>Plage ${rangeIndex + 3}</small><span><input type="time" name="extra-open-${index}-${rangeIndex}" value="${range.open}" ${entry.enabled ? "" : "disabled"}><i>–</i><input type="time" name="extra-close-${index}-${rangeIndex}" value="${range.close}" ${entry.enabled ? "" : "disabled"}><button type="button" data-action="remove-range" data-day="${index}" data-range="${rangeIndex}" aria-label="Supprimer cette plage">×</button></span></label>`).join("")}</div><button type="button" class="text-button schedule-copy-day" data-action="add-range" data-index="${index}">＋ Ajouter une plage</button></article>`).join("")}</div><footer class="schedule-save-footer"><small>Dernière mise à jour : ${state.hoursUpdatedAt ? esc(state.hoursUpdatedAt) : "Aujourd'hui · 17:42 par Mouna B."}</small><button type="submit" class="button button-primary">▣ &nbsp; Enregistrer les horaires</button></footer></form>
    </section>
    <aside class="schedule-side-column">
      <section class="panel emergency-pause-panel"><div class="panel-heading"><div><span class="panel-icon pause-icon">Ⅱ</span><div><h2>Pause d'urgence</h2><p>Sélectionner la durée d'indisponibilité.</p></div></div>${state.storePaused ? badge("EN DIRECT", "green") : ""}</div>
        <div class="pause-duration-grid">${durationOptions.map(([minutes, label, detail]) => `<label class="pause-duration-option ${Number(state.pauseDurationMinutes) === minutes ? "selected" : ""}"><input type="radio" name="pause-duration" value="${minutes}" ${Number(state.pauseDurationMinutes) === minutes ? "checked" : ""}><strong>${label}</strong><small>${detail}</small></label>`).join("")}</div>
        <label class="form-field pause-reason-field">Motif opérationnel<select id="pause-reason"><option ${state.pauseReason === "Cuisine saturée (trop de commandes)" ? "selected" : ""}>Cuisine saturée (trop de commandes)</option><option ${state.pauseReason === "Panne technique" ? "selected" : ""}>Panne technique</option><option ${state.pauseReason === "Rupture de stock" ? "selected" : ""}>Rupture de stock</option><option ${state.pauseReason === "Autre" ? "selected" : ""}>Autre</option></select></label>
        <div class="pause-impact-note"><span>◉</span><span><strong>Impact client</strong> · Votre restaurant apparaîtra avec le badge « Occupé / En pause ».</span></div>
        ${state.storePaused ? `<div class="pause-active-note">Pause active${state.pauseUntil ? ` jusqu'à ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date(state.pauseUntil))}` : ""} · ${esc(state.pauseReason)}</div><button type="button" class="button button-primary full-width" data-action="toggle-pause">Reprendre les commandes</button>` : `<button type="button" class="button button-danger-soft full-width urgent-pause-button" data-action="toggle-pause">◉ &nbsp; Confirmer et activer la pause (${state.pauseDurationMinutes === -1 ? "fin de jour" : `${state.pauseDurationMinutes} min`})</button>`}
      </section>
      <section class="panel order-safety-panel"><div class="panel-heading"><div><span class="panel-icon">♧</span><div><h2>Sécurité des commandes</h2><p>Protégez votre note et le temps de réponse.</p></div></div>${badge("OPTIMAL", "green")}</div><div class="expiry-setting"><div><strong>Expirations consécutives (aujourd'hui)</strong><small>Limite avant pause automatique</small></div><label><input id="expiry-limit" type="number" min="1" max="10" value="${state.orderExpiryLimit}"> / 3 max</label></div><div class="safety-progress"><span style="width:${Math.min(100, securityExpired / state.orderExpiryLimit * 100)}%"></span></div><div class="safety-status"><span>Aucune commande manquée</span><strong>Boutique protégée</strong></div><label class="safety-toggle-row"><span>Pause après ${state.orderExpiryLimit} expiration${state.orderExpiryLimit > 1 ? "s" : ""} consécutive${state.orderExpiryLimit > 1 ? "s" : ""}</span><input type="checkbox" id="auto-pause-expiry" ${state.pauseOnConsecutiveExpiry ? "checked" : ""}></label><label class="safety-toggle-row"><span>Sonnerie continue en cuisine</span><input type="checkbox" id="order-sound" ${state.orderSoundEnabled ? "checked" : ""}></label><div class="acceptance-metric"><span>◷ &nbsp; Temps d'acceptation moyen</span><strong>38 sec</strong></div></section>
    </aside></div>`;
}

function renderCourier() {
  if (state.page === "cash") return renderCourierCash();
  if (state.page === "profil") return `<div class="courier-profile-layout"><section class="panel courier-profile-card"><div class="profile-cover"></div><div class="profile-details"><div class="avatar avatar-dark profile-avatar">YG</div><h2>Yassine Gharbi</h2><p>Coursier First Delivery · Depuis mars 2024</p><div class="profile-stats"><div><strong>4,9 <span>★</span></strong><small>NOTE MOYENNE</small></div><div><strong>286</strong><small>MISSIONS</small></div><div><strong>98%</strong><small>LIVRAISONS RÉUSSIES</small></div></div></div></section><section class="panel zones-panel"><div class="panel-heading"><div><span class="panel-icon">⌖</span><div><h2>Mes zones de livraison</h2><p>Zones où vous pouvez recevoir des missions.</p></div></div></div><div class="zone-tags"><span>Grand Tunis · Principal</span><span>Ariana · Secondaire</span><span>La Marsa · Renfort</span></div><div class="callout-note">⌖ &nbsp; Votre position GPS est partagée uniquement pendant une mission active.</div></section></div>`;
  return renderCourierMission();
}

function renderCourierMission() {
  const accepted = state.courierAccepted;
  return `<div class="courier-top-grid"><section class="panel courier-status-card"><div class="courier-status-header"><div><span class="panel-icon">◎</span><div><h2>Mon statut</h2><p>Activez votre disponibilité pour recevoir des missions.</p></div></div><button type="button" class="switch ${state.courierAvailable ? "on" : ""}" role="switch" aria-checked="${state.courierAvailable}" data-action="toggle-availability" aria-label="Changer ma disponibilité"><i></i></button></div><div class="courier-online-strip ${state.courierAvailable ? "online" : ""}"><span class="status-dot"></span><strong>${state.courierAvailable ? "Vous êtes disponible" : "Vous êtes hors ligne"}</strong><span>${state.courierAvailable ? "GPS actif dans votre zone autorisée" : "Touchez le bouton pour vous mettre en ligne"}</span></div><div class="courier-stat-row"><div><small>GAINS AUJOURD'HUI</small><strong>48,500 DT</strong></div><div><small>MISSIONS</small><strong>6</strong></div><div><small>NOTE</small><strong>4,9 <span class="rating-star">★</span></strong></div></div></section>
    <section class="courier-offer-card"><div class="offer-topline"><span>✳ ${accepted ? "LOT ACCEPTÉ" : state.courierStep >= 3 ? "MISSION TERMINÉE" : "NOUVELLE OFFRE DE LOT"}</span><span class="offer-timer">${state.courierStep >= 3 ? "✓ CONFIRMÉE" : "◷ 00:43"}</span></div><h2>${accepted ? "Votre tournée est prête !" : state.courierStep >= 3 ? "Belle tournée, Yassine !" : "Une tournée vous attend."}</h2><p>${accepted ? "Suivez vos étapes et confirmez chaque collecte." : state.courierStep >= 3 ? "Votre livraison est terminée. Le suivi du cash est à jour." : "3 collectes proches · Ariana · Ennasr"}</p><div class="offer-route">${[["Chez Mouna", "Collecte", "01"], ["Saveurs de Carthage", "Collecte", "02"], ["Amira B. · Ennasr", "Livraison", "03"]].map(([name, type, count], i) => `<div class="offer-stop"><span class="offer-stop-number">${count}</span><span><strong>${name}</strong><small>${type} · ${i === 0 ? "À 1,2 km" : i === 1 ? "À 0,8 km" : "À 2,1 km"}</small></span></div>`).join("")}</div><div class="offer-summary"><div><small>DISTANCE TOTALE</small><strong>4,8 km · ~28 min</strong></div><div><small>RÉMUNÉRATION</small><strong>18,500 DT</strong></div></div><div class="offer-actions">${accepted ? `${button(nextCourierStepLabel(), "courier-next", "primary")}${button("Déclarer un échec", "courier-failure", "secondary")}` : state.courierStep >= 3 ? '<button type="button" class="button button-secondary" data-page="cash">Voir mon portefeuille</button>' : `${button("Accepter le lot", "accept-batch", "primary", state.courierAvailable ? "" : "disabled")}${button("Refuser", "decline-batch", "secondary")}`}</div></section></div>
    <div class="courier-route-layout"><section class="panel route-card"><div class="panel-heading"><div><span class="panel-icon">⌁</span><div><h2>Ma tournée du jour</h2><p>Itinéraire routier dans le Grand Tunis · positions de démonstration.</p></div></div><div class="route-map-actions"><button type="button" class="text-button" data-action="locate-courier">◎ Ma position GPS</button><span class="route-progress">${accepted ? `${Math.min(state.courierStep, 3)} / 3 étapes` : state.courierStep >= 3 ? "TERMINÉE" : "EN ATTENTE"}</span></div></div><div id="courier-route-map" class="courier-map real-map" role="application" aria-label="Carte routière de la tournée du coursier"><div class="map-credit map-credit-overlay">Itinéraire estimé · © OpenStreetMap</div></div><div class="route-steps">${[["01", "Chez Mouna", "Collecte · 1,2 km", state.courierStep >= 1], ["02", "Saveurs de Carthage", "Collecte · 0,8 km", state.courierStep >= 2], ["03", "Amira Ben Salem", "Livraison · 2,1 km", state.courierStep >= 3]].map(([num, name, detail, done]) => `<div class="route-step ${done ? "done" : ""}"><span>${done ? "✓" : num}</span><div><strong>${name}</strong><small>${detail}</small></div>${done ? badge("Effectué", "green") : ""}</div>`).join("")}</div></section>
    <aside class="panel cash-mini-card"><div class="panel-heading"><div><span class="panel-icon cash-icon">▣</span><div><h2>Mon cash COD</h2><p>À déposer au responsable.</p></div></div></div><span class="cash-total">${money(64.5 + (state.courierStep >= 3 ? 32 : 0))}</span><div class="cash-progress"><span style="width: 68%"></span></div><div class="cash-breakdown"><span>Encaissé aujourd'hui <strong>${money(32 + (state.courierStep >= 3 ? 32 : 0))}</strong></span><span>Déposé <strong>18,500 DT</strong></span></div><button type="button" class="text-button" data-page="cash">Voir mon portefeuille →</button></aside></div>`;
}

function nextCourierStepLabel() {
  if (state.courierStep === 0) return "Confirmer la collecte · Chez Mouna";
  if (state.courierStep === 1) return "Confirmer la collecte · Saveurs";
  return "Confirmer la livraison · Amira";
}

function renderCourierCash() {
  return `<div class="courier-cash-banner"><div><small>MON SOLDE DE CASH À DÉPOSER</small><h2>${money(64.5 + (state.courierStep ? 32 : 0))}</h2><p>Le dépôt intégral est attendu avant votre prochaine clôture.</p></div><div class="cash-banner-icon">▣</div></div><div class="metric-grid three-metrics">${metric("Cash encaissé", "86,500 DT", "3 commandes", "mint", "↙")}${metric("Cash déjà déposé", "22,000 DT", "Reçu FD-DEP-074", "blue", "✓")}${metric("Missions cette semaine", "24", "+4 vs. semaine dernière", "lavender", "⌁")}</div><section class="panel table-panel"><div class="panel-heading"><div><span class="panel-icon">▤</span><div><h2>Mes encaissements récents</h2><p>Chaque montant correspond à une commande livrée.</p></div></div></div><div class="table-wrap"><table><thead><tr><th>COMMANDE</th><th>CLIENT</th><th>DATE</th><th>MONTANT</th><th>STATUT</th></tr></thead><tbody>${[["FD-2841", "Amira Ben Salem", "Aujourd'hui · 14:32", "32,900 DT", "À déposer"], ["FD-2818", "Karim L.", "Aujourd'hui · 12:08", "24,000 DT", "À déposer"], ["FD-DEP-074", "Dépôt espèces", "Hier · 19:42", "22,000 DT", "Rapproché"]].map(([id, name, date, amount, status]) => `<tr><td><strong>${id}</strong></td><td>${name}</td><td>${date}</td><td><strong>${amount}</strong></td><td>${badge(status, status === "Rapproché" ? "green" : "peach")}</td></tr>`).join("")}</tbody></table></div></section><div class="callout-note">♧ &nbsp; Chaque dépôt génère un reçu et est rapproché du solde pour garantir une traçabilité complète.</div>`;
}

function renderAdmin() {
  if (state.page === "dispatch") return renderDispatch();
  if (state.page === "comptes") return renderAccounts();
  if (state.page === "incidents") return renderIncidents();
  if (state.page === "finance") return renderFinance();
  if (state.page === "reclamations") return renderComplaints();
  if (state.page === "prospection") return renderProspects();
  if (state.page === "previsions") return renderForecast();
  if (state.page === "zones") return renderZones();
  return renderCockpit();
}

function renderIncidents() {
  const unresolved = state.incidents.filter((incident) => !incident.resolution);
  return `<div class="metric-grid three-metrics">${metric("Incidents à traiter", String(unresolved.length).padStart(2, "0"), "Échecs déclarés par les coursiers", "peach", "⚠")}${metric("Dossiers résolus", String(state.incidents.length - unresolved.length).padStart(2, "0"), "Décisions enregistrées", "mint", "✓")}${metric("Demandes de complément", String(state.applications.filter((item) => item.status === "À compléter").length).padStart(2, "0"), "Vérification KYC", "blue", "▤")}</div>
    <section class="panel incident-panel"><div class="panel-heading"><div><span class="panel-icon alert-icon">⚠</span><div><h2>Signalements de livraison</h2><p>Choisissez une suite claire pour chaque colis et gardez une trace de la décision.</p></div></div>${badge(`${unresolved.length} À TRAITER`, unresolved.length ? "peach" : "green")}</div>
      ${state.incidents.length ? `<div class="incident-list">${state.incidents.map((incident) => `<article class="incident-row"><div class="incident-head"><div><strong>${esc(incident.id)} · ${esc(incident.order)}</strong><small>${esc(incident.courier)} · ${esc(incident.createdAt)}</small></div>${incident.type ? badge(incident.type, "blue") : ""}${badge(incident.resolution || incident.status, incident.resolution ? "green" : "peach")}</div><div class="incident-reason"><small>MOTIF DE L'ÉCHEC</small><strong>${esc(incident.reason)}</strong></div>${incident.contactAttempted ? '<small class="incident-contact-status">✓ Client contacté</small>' : '<small class="incident-contact-status">! Contact client non confirmé</small>'}${incident.comment ? `<p class="incident-comment">${esc(incident.comment)}</p>` : ""}${incident.proofFile ? `<small class="incident-contact-status">▧ Preuve jointe : ${esc(incident.proofFile)}</small>` : ""}${incident.proofUrl && /^https?:\/\//i.test(incident.proofUrl) ? `<a class="text-button" href="${esc(incident.proofUrl)}" target="_blank" rel="noopener noreferrer">Voir la preuve jointe ↗</a>` : ""}${incident.note ? `<p class="incident-comment">Décision : ${esc(incident.note)}</p>` : ""}<div class="incident-actions">${incident.resolution ? "" : `<button type="button" class="button button-primary button-small" data-action="resolve-incident" data-id="${incident.id}">Décider de la suite</button>`}</div></article>`).join("")}</div>` : `<div class="empty-state compact-empty"><span>✓</span><h3>Aucun incident signalé</h3><p>Les prochains rapports des coursiers apparaîtront ici.</p></div>`}
    </section>`;
}

function renderCockpit() {
  return `<div class="welcome-banner admin-welcome"><div class="welcome-copy"><span class="welcome-kicker">LUNDI · GRAND TUNIS</span><h2>Votre réseau tourne<br>à plein régime.</h2><p>Un aperçu clair de votre activité et des priorités du jour.</p><button type="button" class="button button-white" data-page="dispatch">Superviser les opérations <span>→</span></button></div><div class="admin-orbit" aria-hidden="true"><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><div class="orbit-center">FD</div><span class="orbit-node node-one">🛵</span><span class="orbit-node node-two">🍲</span><span class="orbit-node node-three">⌂</span><span class="orbit-node node-four">✳</span></div></section>
    <div class="section-heading dashboard-title-row"><div><h2>Le réseau en un regard <span class="live-mini"><i></i> EN DIRECT</span></h2><p>Les indicateurs clés de votre plateforme.</p></div><button class="button button-secondary" type="button" data-action="export">↓ &nbsp;Exporter le rapport</button></div>
    <div class="metric-grid four-metrics">${metric("Commandes aujourd'hui", "142", "+18,4%", "mint", "▤")}${metric("Volume d'affaires", "8 492 DT", "+12,6%", "lavender", "↗")}${metric("Cash en circulation", "19 450 DT", "À rapprocher", "peach", "▣")}${metric("Coursiers actifs", "28 <small>/ 35</small>", "80% de la flotte", "blue", "🛵")}</div>
    <div class="admin-dashboard-grid"><section class="panel operations-panel"><div class="panel-heading"><div><span class="panel-icon">⌁</span><div><h2>Flux opérationnel</h2><p>Commandes actives par étape.</p></div></div><button class="text-button" type="button" data-page="dispatch">Voir le dispatch →</button></div><div class="ops-funnel">${[["À traiter", 12, "peach", "partner"], ["En préparation", 26, "blue", "prep"], ["À collecter", 18, "mint", "collect"], ["En livraison", 42, "green", "deliver"]].map(([name, count, color, key]) => `<div class="funnel-stage"><div class="funnel-label"><span><i class="legend-dot ${color}"></i>${name}</span><strong>${count}</strong></div><div class="funnel-bar"><i class="${color}" style="width:${Math.max(28, count * 2)}%"></i></div></div>`).join("")}</div><div class="ops-footer"><span>98 <small>commandes en cours</small></span><span class="trend-up">↗ 8,2% vs. hier</span></div></section>
    <section class="panel alerts-panel"><div class="panel-heading"><div><span class="panel-icon alert-icon">!</span><div><h2>À votre attention</h2><p>Les sujets à prioriser aujourd'hui.</p></div></div><span class="count-pill">3</span></div><div class="alert-item alert-danger"><span class="alert-symbol">!</span><div><strong>Cash à rapprocher</strong><small>3 coursiers · 4 200 DT en attente</small></div><button type="button" data-page="finance" aria-label="Voir le cash à rapprocher">→</button></div><div class="alert-item alert-amber"><span class="alert-symbol">⌖</span><div><strong>Zone sous-couverte</strong><small>La Marsa · 4 coursiers pour 12 missions</small></div><button type="button" data-page="previsions" aria-label="Voir la couverture">→</button></div><div class="alert-item alert-blue"><span class="alert-symbol">♙</span><div><strong>Dossiers à examiner</strong><small>${state.applications.length} candidatures en attente</small></div><button type="button" data-page="comptes" aria-label="Examiner les dossiers">→</button></div><div class="alerts-bottom"><span>Une exception ?</span><button class="text-button" type="button" data-page="reclamations">Traiter les litiges →</button></div></section></div>
    <div class="section-heading compact-heading"><div><h2>Activité du réseau</h2><p>Commandes récemment mises à jour.</p></div><button class="text-button" type="button" data-page="dispatch">Toutes les commandes →</button></div><section class="panel table-panel">${adminOrderTable()}</section>`;
}

function metric(label, value, note, tone, icon) {
  return `<article class="metric-card"><div class="metric-card-top"><span class="metric-icon ${tone}">${icon}</span><span class="metric-note">${note}</span></div><small>${label}</small><strong>${value}</strong><span class="metric-sparkline ${tone}">⌁　⌁　⌁　⌁</span></article>`;
}

function salesChart() {
  return `<div class="sales-chart"><svg viewBox="0 0 640 180" role="img" aria-label="Graphique des ventes de la semaine"><defs><linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#4fb99a" stop-opacity=".25"/><stop offset="100%" stop-color="#4fb99a" stop-opacity="0"/></linearGradient></defs><path class="chart-fill" d="M0 148 C35 134 54 145 88 122 S145 113 180 128 S237 110 267 95 S327 111 359 87 S421 99 450 72 S510 94 540 58 S601 55 640 28 L640 180 L0 180 Z"/><path class="chart-line" d="M0 148 C35 134 54 145 88 122 S145 113 180 128 S237 110 267 95 S327 111 359 87 S421 99 450 72 S510 94 540 58 S601 55 640 28"/><circle cx="540" cy="58" r="5" class="chart-point"/></svg></div>`;
}

function adminOrderTable() {
  const orders = state.partnerOrders.map((order) => [order.id, order.partner || "Chez Mouna", order.customer, money(order.amount + 3.5), order.status, order.status === "À traiter" ? "peach" : order.status === "En préparation" ? "blue" : order.status === "Refusée" ? "peach" : "green", order.status === "À traiter" ? "À assigner" : "Yassine G."]);
  return `<div class="table-wrap"><table><thead><tr><th>RÉFÉRENCE</th><th>PARTENAIRE</th><th>CLIENT</th><th>MONTANT COD</th><th>STATUT</th><th>COURSier</th></tr></thead><tbody>${orders.map(([id, partner, client, amount, status, tone, courier]) => `<tr data-filter-item="dispatch" data-filter-value="${esc(status)} ${esc(courier)}"><td><strong>${id}</strong></td><td>${partner}</td><td>${client}</td><td><strong>${amount}</strong></td><td>${badge(status, tone)}</td><td><span class="courier-cell"><span class="avatar avatar-xs">${courier === "À assigner" ? "—" : "YG"}</span>${courier}</span></td></tr>`).join("")}</tbody></table></div>`;
}

function renderDispatch() {
  return `<div class="dispatch-toolbar"><div class="filter-pills" data-filter-group="dispatch"><button class="filter-pill active" type="button" data-action="filter-orders" data-filter-value="all">Toutes <span>98</span></button><button class="filter-pill" type="button" data-action="filter-orders" data-filter-value="À assigner">À assigner <span>12</span></button><button class="filter-pill" type="button" data-action="filter-orders" data-filter-value="En route">En route</button><button class="filter-pill" type="button" data-action="filter-orders" data-filter-value="Alertes">Alertes <span class="danger-count">3</span></button></div><span class="live-pill"><i></i> SYNCHRONISÉ · 14:32:08</span></div>
    <div class="dispatch-grid"><section class="panel dispatch-map-panel"><div class="panel-heading"><div><span class="panel-icon">⌖</span><div><h2>Flotte en direct</h2><p>Grand Tunis · 4 zones actives</p></div></div><button class="text-button" type="button" data-action="map-refresh">⟳</button></div><div id="dispatch-live-map" class="dispatch-map real-map" role="application" aria-label="Carte r?elle de la flotte dans le Grand Tunis"><span class="map-credit map-credit-overlay">Positions de d?monstration ? ? OpenStreetMap</span></div><div class="map-legend"><span><i class="legend-dot green"></i>Disponible <b>12</b></span><span><i class="legend-dot blue"></i>En mission <b>28</b></span><span><i class="legend-dot peach"></i>Hors ligne <b>7</b></span></div></section>
    <section class="panel batch-panel"><div class="panel-heading"><div><span class="panel-icon">✳</span><div><h2>Lots à proposer</h2><p>Dispatch intelligent · regroupements proches</p></div></div>${badge("3 OFFRES", "green")}</div><div class="batch-list">${[["LOT-104", "Ariana · Ennasr", "3 collectes", "4,8 km", "Yassine G.", "96%"], ["LOT-103", "Centre Ville", "2 collectes", "3,2 km", "Moez H.", "91%"], ["LOT-102", "La Marsa · Carthage", "3 collectes", "5,1 km", "À assigner", "—"]].map(([id, area, count, km, courier, score]) => `<article class="batch-card"><div class="batch-card-head"><strong>${id}</strong>${badge(courier === "À assigner" ? "À assigner" : "Optimisé", courier === "À assigner" ? "peach" : "mint")}</div><strong class="batch-area">${area}</strong><div class="batch-meta"><span>⌁ ${count}</span><span>⌖ ${km}</span></div><div class="batch-assign"><span class="avatar avatar-xs">${courier === "À assigner" ? "+" : courier.slice(0, 2).toUpperCase()}</span><span>${courier === "À assigner" ? "Coursier recommandé" : courier}</span><span class="fit-score">★ ${score}</span></div><button type="button" class="button ${courier === "À assigner" ? "button-primary" : "button-secondary"} button-small full-width" data-action="assign-batch" data-id="${id}">${courier === "À assigner" ? "Assigner un coursier" : "Voir le lot"}</button></article>`).join("")}</div></section></div>
    <div class="section-heading compact-heading"><div><h2>Commandes actives</h2><p>Suivez le traitement et intervenez en un clic.</p></div><label class="search-field compact-search"><span>⌕</span><input id="dispatch-search" type="search" placeholder="Réf., client ou partenaire…" aria-label="Rechercher une commande"></label></div><section class="panel table-panel">${adminOrderTable()}</section>`;
}

function renderAccounts() {
  return `<div class="metric-grid four-metrics">${metric("Comptes actifs", "248", "+12 ce mois", "mint", "♙")}${metric("Dossiers en attente", String(state.applications.length).padStart(2, "0"), "À examiner", "peach", "◷")}${metric("Coursiers validés", "35", "4 zones couvertes", "blue", "🛵")}${metric("Taux d'activation", "92%", "Très bon", "lavender", "✓")}</div><div class="filter-row"><div class="filter-pills" data-filter-group="apps"><button class="filter-pill active" type="button" data-action="filter-apps" data-filter-value="all">Tous les dossiers <span>${state.applications.length}</span></button><button class="filter-pill" type="button" data-action="filter-apps" data-filter-value="Partenaire">Demandes partenaires</button><button class="filter-pill" type="button" data-action="filter-apps" data-filter-value="Coursier">Demandes coursiers</button><button class="filter-pill" type="button" data-action="filter-apps" data-filter-value="suspended">Comptes suspendus</button></div><button class="button button-secondary button-small" type="button" data-action="export">↓ Exporter CSV</button></div>
    <section class="panel application-panel"><div class="panel-heading"><div><span class="panel-icon">♙</span><div><h2>Demandes partenaires et coursiers</h2><p>Examinez les nouvelles inscriptions avant leur activation.</p></div></div>${badge(`${state.applications.length} EN ATTENTE`, "peach")}</div>
    ${state.applications.length ? `<div class="application-list">${state.applications.map((application) => `<article class="application-row" data-filter-item="apps" data-filter-value="${esc(application.type)}"><span class="application-logo">${esc(application.initials)}</span><div class="application-main"><div><strong>${esc(application.name)}</strong>${badge(application.type.split(" · ")[0], "mint")}</div><span>${esc(application.type)} · ${esc(application.area)}</span><small>Soumis aujourd'hui · ${esc(application.status || "À vérifier")}</small>${application.reviewNote ? `<small class="review-note">Complément demandé : ${esc(application.reviewNote)}</small>` : ""}</div><div class="application-docs">${application.details ? `<span>⌖ ${application.details.latitude}, ${application.details.longitude}</span><span>◷ Préparation : ${application.details.preparationMinutes} min</span><span>▤ ${application.details.documents ? application.details.documents.split("\n").filter((url) => url.trim()).map((url) => { const cleanUrl = url.trim(); const safeUrl = /^https?:\/\//i.test(cleanUrl) ? esc(cleanUrl) : ""; return safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">Ouvrir le justificatif</a>` : `<span>${esc(cleanUrl)}</span>`; }).join("") : "Justificatifs à vérifier"}</span>${application.details.paymentMethod ? `<span>Reversement : ${esc(application.details.paymentMethod)}</span>` : ""}${application.details.email ? `<span>${esc(application.details.email)}</span>` : ""}` : '<span>▤ Pièce d’identité à contrôler</span><span>▤ Justificatif d’activité</span><span>⌖ Zone renseignée</span>'}</div><div class="application-actions"><button type="button" class="button button-primary button-small" data-action="approve-application" data-id="${application.id}">Valider</button><button type="button" class="button button-secondary button-small" data-action="request-documents" data-id="${application.id}">Complément</button><button type="button" class="text-button reject-action" data-action="reject-application" data-id="${application.id}">Refuser</button></div></article>`).join("")}</div>` : `<div class="empty-state compact-empty"><span>✓</span><h3>Tous les dossiers sont traités</h3><p>Vous êtes à jour sur les nouvelles candidatures.</p></div>`}
    </section><section class="panel application-panel managed-accounts-panel"><div class="panel-heading"><div><span class="panel-icon">♙</span><div><h2>Comptes actifs et suspendus</h2><p>Gérez les accès des membres du réseau.</p></div></div>${badge(`${state.managedAccounts.filter((account) => !account.suspended).length} ACTIFS`, "green")}</div><div class="application-list">${state.managedAccounts.map((account) => `<article class="application-row" data-filter-item="apps" data-filter-value="${account.suspended ? "Suspendu" : account.type}"><span class="application-logo">${account.type === "Coursier" ? "CA" : "PT"}</span><div class="application-main"><div><strong>${esc(account.name)}</strong>${badge(account.suspended ? "Suspendu" : "Actif", account.suspended ? "peach" : "green")}</div><span>${esc(account.type)} · ${esc(account.area)}</span></div><div class="application-actions"><button type="button" class="button ${account.suspended ? "button-primary" : "button-danger-soft"} button-small" data-action="toggle-suspension" data-id="${account.id}">${account.suspended ? "Réactiver" : "Suspendre"}</button></div></article>`).join("")}</div></section><div class="callout-note">♧ &nbsp; Toute validation ou suspension est tracée dans le journal d'audit de la plateforme.</div>`;
}

function renderFinance() {
  return `<div class="metric-grid four-metrics">${metric("Volume total (GMV)", "148 250 DT", "Cette semaine", "mint", "↗")}${metric("Commissions nettes", "19 395 DT", "Taux moyen 12%", "lavender", "◉")}${metric("Cash en circulation", "8 895 DT", "3 dépôts attendus", "peach", "▣")}${metric("À reverser", "5 000 DT", "Closing à valider", "blue", "↙")}</div>
    <section class="panel ledger-panel"><div class="panel-heading"><div><span class="panel-icon">▤</span><div><h2>Rapprochement cash coursier</h2><p>Vérifiez les dépôts avant le closing hebdomadaire.</p></div></div><button class="button button-primary button-small" type="button" data-action="closing" ${state.closingValidated ? "disabled" : ""}>${state.closingValidated ? "Closing validé" : "Valider le closing"}</button></div><div class="table-wrap"><table><thead><tr><th>COURSIER</th><th>COMMANDES</th><th>ENCAISSÉ</th><th>DÉJÀ DÉPOSÉ</th><th>ÉCART</th><th>STATUT</th><th>ACTION</th></tr></thead><tbody>${renderFinanceRows()}</tbody></table></div><div class="ledger-note"><span>♧</span> Les reversements partenaires sont calculés uniquement sur les commandes dont le cash est rapproché.</div></section>
    <div class="finance-bottom-grid"><section class="panel settlement-card"><div class="panel-heading"><div><span class="panel-icon">◷</span><div><h2>Closing de la semaine</h2><p>Période hebdomadaire en cours</p></div></div>${badge(state.closingValidated ? "VALIDÉ" : "À VALIDER", state.closingValidated ? "green" : "peach")}</div><div class="settlement-total"><span>Montant total à régler</span><strong>5 000,000 <small>DT</small></strong></div><div class="settlement-breakdown"><span>Reversements partenaires <strong>4 200,000 DT</strong></span><span>Rémunération coursiers <strong>800,000 DT</strong></span></div><button class="button button-primary full-width" type="button" data-action="closing" ${state.closingValidated ? "disabled" : ""}>${state.closingValidated ? "Closing validé ✓" : "Valider le closing hebdomadaire →"}</button></section>
    <section class="panel commission-card"><div class="panel-heading"><div><span class="panel-icon">%</span><div><h2>Commission standard</h2><p>Valeur par défaut · surcharge par partenaire possible.</p></div></div>${badge("ACTIF", "green")}</div><div class="commission-value"><strong>${state.commissionRate}</strong><span>%</span><small>du montant des articles</small></div><label class="commission-input-label" for="commission-input">Modifier le taux standard</label><div class="commission-input-row"><input id="commission-input" type="number" min="0" max="40" step="0.5" value="${state.commissionRate}"><span>%</span><button class="button button-secondary button-small" type="button" data-action="save-commission">Enregistrer</button></div></section></div>`;
}

function renderFinanceRows() {
  const rows = [
    { name: "Yassine Gharbi", count: 8, total: 428.5, deposited: 364, due: 64.5 },
    { name: "Karim Anouar", count: 6, total: 312, deposited: 312, due: 0 },
    { name: "Moez H.", count: 5, total: 185, deposited: 120, due: 65 }
  ];
  return rows.map((row) => {
    const newDeposits = state.deposits.filter((deposit) => deposit.courier === row.name).reduce((sum, deposit) => sum + deposit.amount, 0);
    const deposited = Math.min(row.total, row.deposited + newDeposits);
    const gap = Math.max(0, row.total - deposited);
    const reconciled = gap < 0.001;
    const receipt = state.deposits.find((deposit) => deposit.courier === row.name)?.receipt || "FD-071";
    return `<tr><td><span class="courier-cell"><span class="avatar avatar-xs">${row.name.split(" ").map((part) => part[0]).join("")}</span><strong>${row.name}</strong></span></td><td>${row.count}</td><td>${money(row.total)}</td><td>${money(deposited)}</td><td class="${reconciled ? "positive-value" : "warning-value"}">${money(gap)}</td><td>${badge(reconciled ? "Rapproché" : "À rapprocher", reconciled ? "green" : "peach")}</td><td>${reconciled ? `<span class="muted-action">Reçu · ${receipt}</span>` : `<button type="button" class="text-button" data-action="deposit-modal">Enregistrer →</button>`}</td></tr>`;
  }).join("");
}

function renderComplaints() {
  const resolvedStatus = "R\u00e9solue";
  const open = state.complaints.filter((item) => item.status !== resolvedStatus);
  const resolved = state.complaints.filter((item) => item.status === resolvedStatus);
  const totalReview = open.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const rows = (items) => items.map((item) => `<article class="complaint-row"><div class="complaint-ref"><span class="complaint-icon">!</span><div><strong>${esc(item.id)} &middot; ${esc(item.order)}</strong><small>${esc(item.customer)} &middot; ${esc(item.createdAt || "Aujourd'hui")}</small></div></div><div class="complaint-reason"><small>${esc(item.type || "Commande")} &middot; ${esc(item.reason)}</small><strong>${esc(item.comment || "Aucun detail supplementaire")}</strong></div><div class="complaint-amount"><small>MONTANT EN REVUE</small><strong>${money(item.amount || 0)}</strong></div><div class="complaint-actions">${item.status === resolvedStatus ? badge(resolvedStatus, "green") : `<button type="button" class="button button-primary button-small" data-action="resolve-complaint" data-id="${esc(item.id)}">Examiner</button>`}</div>${item.resolution ? `<div class="complaint-resolution">Decision : ${esc(item.resolution)}${item.staffNote ? ` &middot; ${esc(item.staffNote)}` : ""}</div>` : ""}</article>`).join("");
  return `<div class="metric-grid three-metrics">${metric("Litiges ouverts", String(open.length).padStart(2, "0"), "A traiter", "peach", "?")}${metric("Montant en revue", money(totalReview), "Montants signales", "lavender", "?")}${metric("Reclamations resolues", String(resolved.length).padStart(2, "0"), "Decisions enregistrees", "mint", "?")}</div><section class="panel complaint-panel"><div class="panel-heading"><div><span class="panel-icon alert-icon">?</span><div><h2>Reclamations clients</h2><p>Restaurant, livraison et coursier &middot; examinez chaque demande avant de repondre.</p></div></div><label class="search-field compact-search"><span>?</span><input id="complaint-search" type="search" placeholder="Ref., client, sujet..." aria-label="Rechercher une reclamation"></label></div>${state.complaints.length ? `<div class="complaint-list">${rows(state.complaints)}</div>` : `<div class="empty-state compact-empty"><span>?</span><h3>Aucun litige en attente</h3><p>Les nouvelles demandes apparaitront ici.</p></div>`}</section><div class="callout-note">Les decisions sont enregistrees localement pour cette demonstration.</div>`;
}

function renderProspects() {
  return `<div class="prospect-summary-banner"><div><span class="summary-ai-icon">✳</span><div><small>OPPORTUNITÉ DE CROISSANCE · GRAND TUNIS</small><h2>4 adresses prometteuses autour de vous.</h2><p>La sélection IA privilégie la proximité, les zones peu couvertes et la demande locale.</p></div></div><button class="button button-white" type="button" data-action="refresh-prospects">⟳ &nbsp; Actualiser les prospects</button></div>
    <div class="metric-grid three-metrics">${metric("Prospects identifiés", "84", "Dans les zones ciblées", "mint", "⌖")}${metric("Score moyen", "82 / 100", "+6% ce mois", "lavender", "✳")}${metric("En discussion", "26", "8 nouveaux cette semaine", "blue", "♙")}</div>
    <section class="panel prospects-panel"><div class="panel-heading"><div><span class="panel-icon">✳</span><div><h2>Vos meilleures opportunités</h2><p>Priorisées par potentiel de conversion et besoins de couverture.</p></div></div><div class="filter-pills" data-filter-group="prospects"><button class="filter-pill active" type="button" data-action="filter-prospects" data-filter-value="all">Tous</button><button class="filter-pill" type="button" data-action="filter-prospects" data-filter-value="À contacter">À contacter</button><button class="filter-pill" type="button" data-action="filter-prospects" data-filter-value="discussion">En discussion</button></div></div>
    <div class="prospect-list">${state.prospects.map((prospect) => `<article class="prospect-row" data-filter-item="prospects" data-filter-value="${esc(prospect.status)}"><div class="prospect-score" style="--score:${prospect.score}"><strong>${prospect.score}</strong><small>/ 100</small></div><div class="prospect-main"><strong>${esc(prospect.name)}</strong><span>${esc(prospect.category)} · ${esc(prospect.area)}</span><small>À 1,2 km de la zone Ennasr · Demande en hausse</small></div><div class="prospect-potential"><small>POTENTIEL ESTIMÉ</small><strong>${prospect.score > 90 ? "Très élevé" : prospect.score > 80 ? "Élevé" : "Prometteur"}</strong><span>Score IA · modèle démo</span></div><div class="prospect-status">${badge(prospect.status, prospect.status === "Intéressé" ? "green" : prospect.status === "Contacté" ? "blue" : "mint")}</div><div class="prospect-action">${prospect.status === "À contacter" ? `<button type="button" class="button button-primary button-small" data-action="contact-prospect" data-id="${prospect.id}">Marquer contacté</button>` : `<button type="button" class="text-button" data-action="prospect-next" data-id="${prospect.id}">Mettre à jour →</button>`}</div></article>`).join("")}</div><div class="prospect-footnote">ℹ &nbsp; La prise de contact est toujours validée par le responsable. Les scores sont illustratifs et les prospects fictifs.</div></section>`;
}

function renderForecast() {
  const zones = [["Ariana · Ennasr", 38, 42, "Couverture suffisante", "safe"], ["Centre Ville", 54, 41, "Renfort recommandé", "warning"], ["La Marsa · Carthage", 32, 12, "Sous-couverture", "danger"], ["Manouba · Ouest", 18, 19, "Couverture suffisante", "safe"]];
  return `<div class="forecast-intro"><div><span class="forecast-icon">⌁</span><div><strong>Prévision de la demande · Aujourd'hui</strong><span>Modèle entraîné sur données simulées · Actualisé à 14:00</span></div></div><label for="forecast-period">Créneau<select id="forecast-period" class="small-select"><option>18:00 – 20:00</option><option>20:00 – 22:00</option></select></label></div>
    <div class="metric-grid three-metrics">${metric("Commandes prévues", "142", "Prochain créneau · Grand Tunis", "mint", "▤")}${metric("Coursiers disponibles", "114", "Sur 128 nécessaires", "blue", "🛵")}${metric("Zones sous-couvertes", "2", "Renfort à organiser", "peach", "⌖")}</div>
    <section class="panel forecast-panel"><div class="panel-heading"><div><span class="panel-icon">⌖</span><div><h2>Demande et couverture par zone</h2><p>Anticipez les heures de pointe avant qu'elles n'arrivent.</p></div></div><span class="confidence-label">FIABILITÉ ESTIMÉE <strong>87%</strong></span></div>
    <div class="forecast-chart">${[44, 58, 42, 68, 51, 79, 63, 91, 73, 58, 82, 68, 96, 74, 62, 86].map((height, index) => `<div class="forecast-bar-wrap"><span class="forecast-bar ${height > 84 ? "bar-highlight" : ""}" style="height:${height}%"></span>${index % 2 === 0 ? `<small>${10 + index}:00</small>` : ""}</div>`).join("")}</div><div class="chart-legend"><span><i class="legend-dot green"></i>Commandes prévues</span><span><i class="legend-dot blue"></i>Coursiers disponibles</span><span class="chart-confidence">Marge d'erreur estimée ± 13%</span></div></section>
    <section class="panel coverage-panel"><div class="panel-heading"><div><span class="panel-icon alert-icon">!</span><div><h2>Couverture de la flotte</h2><p>Les zones sous tension sont signalées en priorité.</p></div></div>${badge("2 ALERTES", "peach")}</div><div class="coverage-list">${zones.map(([zone, demand, couriers, status, tone]) => `<div class="coverage-row"><div class="coverage-zone"><span class="coverage-zone-icon ${tone}">⌖</span><strong>${zone}</strong></div><div class="coverage-bars"><span>Demande <b>${demand} cmd</b></span><span>Flotte <b>${couriers} coursiers</b></span><div class="coverage-track"><i class="demand-track" style="width:${Math.min(96, demand * 1.6)}%"></i><i class="courier-track" style="width:${Math.min(96, couriers * 1.6)}%"></i></div></div><div class="coverage-status ${tone}">${status}</div>${tone === "danger" || tone === "warning" ? `<button type="button" class="button button-secondary button-small" data-action="boost-zone" data-zone="${esc(zone)}">+ Renfort</button>` : '<span></span>'}</div>`).join("")}</div></section>`;
}

function initializeZonesMap() {
  const container = document.querySelector("#coverage-map");
  if (!container || !window.L) return;

  const map = window.L.map(container, { scrollWheelZoom: false, zoomControl: false });
  const colors = { active: "#3b9868", warning: "#d69359", development: "#819ec1" };
  const polygons = [];
  zonesMapInstance = map;

  window.L.control.zoom({ zoomInTitle: "Zoom avant", zoomOutTitle: "Zoom arrière" }).addTo(map);
  window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Signaler une erreur</a>',
    maxZoom: 19
  }).addTo(map);

  coverageZones.forEach((zone) => {
    const color = colors[zone.status];
    const polygon = window.L.polygon(zone.boundary, {
      color,
      fillColor: color,
      fillOpacity: 0.16,
      opacity: 0.9,
      weight: 2,
      lineJoin: "round",
      smoothFactor: 1.5
    }).addTo(map);
    polygon.bindTooltip(esc(zone.name), { permanent: true, direction: "center", offset: [0, 0], className: "zone-name-tooltip" });
    polygon.bindPopup(`<strong>${esc(zone.name)}</strong><br>${zone.couriers} coursiers autorisés<br>${money(state.zoneRates[zone.name])} / livraison`);
    polygon.on("click", () => selectCoverageZone(zone.id));

    const marker = window.L.circleMarker(zone.center, {
      radius: 11,
      color: "#fff",
      weight: 3,
      fillColor: color,
      fillOpacity: 0.96
    }).addTo(map);
    marker.bindTooltip(String(zone.couriers), { permanent: true, direction: "center", className: "zone-count-tooltip" });
    marker.on("click", () => {
      selectCoverageZone(zone.id);
      polygon.openPopup();
    });
    zoneMapLayers.set(zone.id, polygon);
    polygons.push(polygon);
  });

  const bounds = window.L.featureGroup(polygons).getBounds().pad(0.12);
  map.fitBounds(bounds);
  map.whenReady(() => {
    map.invalidateSize();
    map.fitBounds(bounds);
    document.querySelector(".zones-map")?.classList.add("leaflet-ready");
  });
}

function selectCoverageZone(zoneId) {
  document.querySelectorAll(".tariff-row[data-zone-id]").forEach((row) => {
    row.classList.toggle("selected", row.dataset.zoneId === zoneId);
  });
}

function focusCoverageZone(zoneId) {
  const zone = coverageZones.find((item) => item.id === zoneId);
  if (!zone) return;
  selectCoverageZone(zoneId);
  if (!zonesMapInstance) return;
  zonesMapInstance.flyTo(zone.center, Math.max(zonesMapInstance.getZoom(), 13));
  zoneMapLayers.get(zoneId)?.openPopup();
}

function renderZones() {
  const statusLabels = { active: "Zone active", warning: "Besoin de couverture", development: "En développement" };
  return `  <div class="zones-layout"><section class="panel zones-map-panel"><div class="panel-heading"><div><span class="panel-icon">⌖</span><div><h2>Couverture géographique</h2><p>Grand Tunis · 4 zones desservies</p></div></div><button class="text-button" type="button" data-action="map-refresh">⟳ Actualiser</button></div><div class="zones-map"><div id="coverage-map" class="coverage-map" role="application" aria-label="Carte interactive des zones de livraison du Grand Tunis"></div><span class="map-credit">Carte de démonstration · limites indicatives</span></div><div class="map-legend zone-legend"><span><i class="legend-dot green"></i>Zone active</span><span><i class="legend-dot blue"></i>En développement</span><span><i class="legend-dot peach"></i>Besoin de couverture</span><span class="map-attribution-note">Carte © OpenStreetMap</span></div></section>    <aside class="panel tariff-panel"><div class="panel-heading"><div><span class="panel-icon">▣</span><div><h2>Tarification par zone</h2><p>Frais de livraison · paiement COD</p></div></div></div><div class="tariff-list">${coverageZones.map((zone) => `<article class="tariff-row" data-zone="${esc(zone.name)}" data-zone-id="${zone.id}"><span class="tariff-zone-dot ${zone.status}"></span><div><strong>${esc(zone.name)}</strong><small>${zone.couriers} coursiers autorisés · ${statusLabels[zone.status]}</small></div><label><small>FRAIS</small><input type="number" min="0" step="0.5" value="${state.zoneRates[zone.name] ?? 0}" aria-label="Frais de livraison ${esc(zone.name)}"><span>DT</span></label></article>`).join("")}</div><div class="panel-footer">${button("Enregistrer les tarifs", "save-zones", "primary")}</div></aside></div>
    <section class="panel zone-rules"><div class="panel-heading"><div><span class="panel-icon">✳</span><div><h2>Règles de dispatch</h2><p>Des zones et des affectations adaptées à votre activité.</p></div></div></div><div class="rules-grid"><div><small>COMMISSION STANDARD</small><strong>${state.commissionRate}% <span>du montant des articles</span></strong></div><div><small>RAYON DE REGROUPEMENT</small><strong>1,5 km <span>collectes proches</span></strong></div><div><small>TAILLE MAX. D'UN LOT</small><strong>3 <span>collectes par coursier</span></strong></div><div><small>PROMESSE DE LIVRAISON</small><strong>45 min <span>délai maximal prévu</span></strong></div></div></section>`;
}

function createStreetMap(container, center, zoom = 14) {
  if (!container || !window.L) return null;
  const map = window.L.map(container, { scrollWheelZoom: false, zoomControl: true }).setView(center, zoom);
  window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Signaler une erreur</a>',
    maxZoom: 19
  }).addTo(map);
  return map;
}

function mapIcon(kind, label = "") {
  const symbols = { courier: "🛵", store: "🍲", home: "⌂", stop: "•", available: "🛵", active: "🛵", offline: "🛵" };
  return window.L.divIcon({
    className: "fd-map-icon-wrap",
    html: `<span class="fd-map-icon fd-map-${kind}"><i>${symbols[kind] || "⌖"}</i>${label ? `<small>${esc(label)}</small>` : ""}</span>`,
    iconSize: [38, 42],
    iconAnchor: [19, 38],
    popupAnchor: [0, -35]
  });
}

async function requestRoadRoute(waypoints) {
  try {
    const coordinates = waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";");
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`);
    if (!response.ok) return null;
    const data = await response.json();
    const route = data.routes?.[0];
    if (!route?.geometry?.coordinates?.length) return null;
    return { points: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]), distance: route.distance, duration: route.duration };
  } catch {
    return null;
  }
}

function pointAlongRoute(points, progress) {
  if (points.length < 2) return points[0];
  const position = Math.min(0.999, Math.max(0, progress)) * (points.length - 1);
  const index = Math.floor(position);
  const fraction = position - index;
  const from = points[index];
  const to = points[Math.min(index + 1, points.length - 1)];
  return [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction];
}

function initializeTrackingMap() {
  const store = [36.8652, 10.1867];
  const destination = [36.8704, 10.1822];
  const fallback = [store, [36.8664, 10.1861], [36.8671, 10.1848], [36.8687, 10.1839], destination];
  const map = createStreetMap(document.querySelector("#tracking-map"), [36.868, 10.185], 15);
  if (!map) return;
  trackingMapInstance = map;
  window.L.marker(store, { icon: mapIcon("store") }).addTo(map).bindPopup("Chez Mouna · Point de collecte");
  window.L.marker(destination, { icon: mapIcon("home") }).addTo(map).bindPopup("Résidence Les Jasmins · Adresse de livraison");
  let routePoints = fallback;
  const line = window.L.polyline(routePoints, { color: "#087153", weight: 5, opacity: 0.82, lineCap: "round", lineJoin: "round" }).addTo(map);
  const courier = window.L.marker(pointAlongRoute(routePoints, 0.62), { icon: mapIcon("courier") }).addTo(map).bindPopup("Yassine Gharbi · Position simulée");
  map.fitBounds(window.L.latLngBounds(store, destination).pad(0.25));
  requestRoadRoute([store, destination]).then((route) => {
    if (!route || !map.getContainer().isConnected) return;
    routePoints = route.points;
    line.setLatLngs(routePoints);
    map.fitBounds(line.getBounds().pad(0.2));
    courier.setLatLng(pointAlongRoute(routePoints, 0.62));
    const status = document.querySelector("#tracking-route-status");
    if (status) status.textContent = `${(route.distance / 1000).toFixed(1).replace(".", ",")} km · route routière estimée`;
  });
  let progress = 0.62;
  trackingPositionTimer = setInterval(() => {
    if (!map.getContainer().isConnected) return;
    progress = progress >= 0.82 ? 0.62 : progress + 0.002;
    courier.setLatLng(pointAlongRoute(routePoints, progress));
  }, 5000);
  map.whenReady(() => setTimeout(() => map.invalidateSize(), 80));
}

function initializeCourierMap() {
  const stops = [
    [36.8652, 10.1867],
    [36.8714, 10.1901],
    [36.8704, 10.1822]
  ];
  const map = createStreetMap(document.querySelector("#courier-route-map"), [36.869, 10.186], 14);
  if (!map) return;
  courierMapInstance = map;
  stops.forEach((point, index) => {
    const kind = index < 2 ? "store" : "home";
    const title = index === 0 ? "Chez Mouna · Collecte 1" : index === 1 ? "Point de collecte 2 · Ariana" : "Amira Ben Salem · Livraison";
    window.L.marker(point, { icon: mapIcon(kind, String(index + 1)) }).addTo(map).bindPopup(title);
  });
  const fallback = [stops[0], [36.8667, 10.1881], [36.8686, 10.1896], stops[1], [36.8723, 10.1882], [36.8715, 10.1852], stops[2]];
  let routePoints = fallback;
  const route = window.L.polyline(routePoints, { color: "#176c50", weight: 4, opacity: 0.78, dashArray: "8 8", lineCap: "round" }).addTo(map);
  let progress = Math.min(0.92, Math.max(0.02, state.courierStep / 3 + 0.02));
  courierLiveMarker = window.L.circleMarker(pointAlongRoute(routePoints, progress), { radius: 8, color: "#fff", weight: 3, fillColor: "#087153", fillOpacity: 1 }).addTo(map).bindPopup("Position simulée sur la tournée de démonstration");
  map.fitBounds(route.getBounds().pad(0.18));
  requestRoadRoute(stops).then((result) => {
    if (!result || !map.getContainer().isConnected) return;
    routePoints = result.points;
    route.setLatLngs(result.points);
    map.fitBounds(route.getBounds().pad(0.18));
    courierLiveMarker.setLatLng(pointAlongRoute(routePoints, progress));
  });
  courierPositionTimer = setInterval(() => {
    if (!map.getContainer().isConnected) return;
    progress = progress >= 0.94 ? 0.02 : progress + 0.001;
    courierLiveMarker?.setLatLng(pointAlongRoute(routePoints, progress));
  }, 5000);
  map.whenReady(() => setTimeout(() => map.invalidateSize(), 80));
}

function initializeDispatchMap() {
  const map = createStreetMap(document.querySelector("#dispatch-live-map"), [36.836, 10.2], 11);
  if (!map) return;
  dispatchMapInstance = map;
  const riders = [
    { point: [36.8657, 10.186], name: "Yassine G.", status: "En mission", kind: "active" },
    { point: [36.801, 10.1838], name: "Karim A.", status: "Disponible", kind: "available" },
    { point: [36.851, 10.31], name: "Moez H.", status: "En mission", kind: "active" },
    { point: [36.81, 10.1], name: "Sami B.", status: "Hors ligne", kind: "offline" },
    { point: [36.873, 10.194], name: "Amir K.", status: "Disponible", kind: "available" }
  ];
  riders.forEach((rider) => window.L.marker(rider.point, { icon: mapIcon(rider.kind) }).addTo(map).bindPopup(`<strong>${esc(rider.name)}</strong><br>${esc(rider.status)} · position de démonstration`));
  coverageZones.forEach((zone) => {
    const color = zone.status === "warning" ? "#cf8752" : zone.status === "development" ? "#718bb0" : "#31926d";
    window.L.polygon(zone.boundary, { color, weight: 2, fillColor: color, fillOpacity: 0.08, dashArray: zone.status === "development" ? "6 5" : null }).addTo(map).bindTooltip(esc(zone.name));
  });
  map.fitBounds(window.L.latLngBounds(coverageZones.map((zone) => zone.center)).pad(0.2));
  map.whenReady(() => setTimeout(() => map.invalidateSize(), 80));
}

function openModal(type, id = "") {
  state.modal = { type, id };
  render();
}

function modalField(label, name, value = "", type = "text", required = true, placeholder = "") {
  return `<label class="form-field">${label}<input name="${name}" type="${type}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${required ? "required" : ""}></label>`;
}

function renderModal() {
  const { type, id } = state.modal;
  if (type === "cart-conflict") return renderConflictModal();
  const product = state.products.find((item) => item.id === id);
  const yassineDue = courierDepositDue("Yassine Gharbi");
  const joiningCourier = state.role === "coursier";
  const complaintOrder = id || "FD-2841";
  const complaintForm = `<label class="form-field">Commande concernée *<select name="order"><option ${complaintOrder === "FD-2841" ? "selected" : ""}>FD-2841</option><option ${complaintOrder === "FD-2784" ? "selected" : ""}>FD-2784</option><option ${complaintOrder === "FD-2765" ? "selected" : ""}>FD-2765</option></select></label><label class="form-field">Sujet *<select name="type" id="complaint-type" required><option>Restaurant</option><option>Livraison</option><option>Coursier</option></select></label><label class="form-field">Motif *<select name="reason" id="complaint-reason" required><optgroup label="Restaurant"><option>Article manquant</option><option>Erreur de commande</option><option>Qualité ou température du repas</option><option>Emballage endommagé</option><option>Restaurant fermé après validation</option></optgroup><optgroup label="Livraison" disabled><option>Retard de livraison</option><option>Commande non reçue</option><option>Colis endommagé ou renversé</option><option>Frais de livraison incorrects</option></optgroup><optgroup label="Coursier" disabled><option>Comportement inapproprié</option><option>Problème lors de la remise</option><option>Le coursier ne répond pas</option><option>Autre problème avec le coursier</option></optgroup></select></label><label class="form-field">Décrivez le problème *<textarea name="comment" maxlength="500" placeholder="Indiquez les détails utiles à l'examen de votre demande…" required></textarea><small>500 caractères maximum</small></label><p class="form-help">Votre demande sera transmise à l'équipe First Delivery pour examen.</p>`;
  const modalContent = {
    "verify-code": ["Confirmer la remise", "Un code à usage unique sécurise la réception de votre commande.", `<label class="form-field">Code reçu par SMS<input name="code" inputmode="numeric" maxlength="6" placeholder="· · · · · ·" required></label><p class="form-help">Pour la démonstration, utilisez le code affiché sur votre écran de suivi.</p>`, "Vérifier le code"],
    "courier-delivery": ["Confirmer la livraison", "Vérifiez le montant encaissé puis validez le code de remise du client.", `${modalField("Montant encaissé (DT)", "amount", "32.900", "number")}<label class="form-field">Code de remise à 6 chiffres<input name="code" inputmode="numeric" maxlength="6" placeholder="482196" required></label><p class="form-help">Le total attendu est de 32,900 DT. La livraison ne peut être clôturée qu'après vérification du montant et du code.</p>`, "Confirmer la remise"],
    "courier-failure": ["Signaler un incident", "Décrivez ce qui se passe avec le client, la commande ou votre trajet.", `<div class="modal-notice incident-safety-note"><strong>En cas d'accident ou de danger, mettez-vous d'abord en sécurité et contactez les services d'urgence locaux.</strong> Le signalement à la plateforme ne remplace pas une aide urgente.</div><label class="form-field">Commande concernée<select name="order"><option>FD-2841 · Amira Ben Salem</option><option>FD-2839 · Karim L.</option><option>FD-2836 · Sonia T.</option></select></label><label class="form-field">Nature de l'incident *<select name="reason" required><option>Client absent / injoignable</option><option>Client refuse la commande</option><option>Problème lors de la remise au client</option><option>Accident ou blessure du coursier</option><option>Accident impliquant un tiers</option><option>Panne ou crevaison</option><option>Adresse ou accès introuvable</option><option>Autre urgence / force majeure</option></select></label><label class="form-field incident-contact-field"><input name="contactAttempted" type="checkbox" value="yes"> J'ai tenté de contacter le client</label><label class="form-field">Photo ou vidéo (facultatif)<input name="proofFile" type="file" accept="image/*,video/*"></label><label class="form-field">Lien de preuve supplémentaire (facultatif)<input name="proofUrl" type="url" placeholder="https://…"></label><label class="form-field">Détails utiles *<textarea name="comment" maxlength="500" placeholder="Lieu, heure, état du colis, personnes concernées…" required></textarea><small>500 caractères maximum</small></label>`, "Envoyer le signalement"],
    "resolve-incident": ["Décider de la suite", "Cette décision sera enregistrée dans le dossier de l'incident.", `<label class="form-field">Décision *<select name="resolution" required><option>Nouvelle tentative de livraison</option><option>Retour au partenaire</option><option>Colis perdu · ouvrir une enquête</option></select></label><label class="form-field">Note interne (facultative)<textarea name="note" placeholder="Consignes pour l'équipe terrain…"></textarea></label>`, "Enregistrer la décision"],
    "request-documents": ["Demander un complément KYC", "Le dossier restera en attente jusqu'à réception des informations manquantes.", `<label class="form-field">Pièce ou information à fournir *<textarea name="note" required placeholder="Ex. Registre de commerce lisible, justificatif d'adresse…"></textarea></label>`, "Demander le complément"],
    "deposit": ["Enregistrer un dépôt de cash", "Le reçu et le rapprochement restent simulés dans cette démonstration.", `<label class="form-field">Coursier<select name="courier">${["Yassine Gharbi", "Moez H.", "Karim Anouar"].map((name) => `<option ${name === "Yassine Gharbi" ? "selected" : ""} ${courierDepositDue(name) <= 0 ? "disabled" : ""}>${name}</option>`).join("")}</select></label>${modalField("Montant remis (DT)", "amount", yassineDue.toFixed(3), "number")}<p class="modal-notice">♧ Le dépôt intégral attendu est vérifié avant le rapprochement.</p>`, "Confirmer le dépôt"],
    "complaint": ["Ouvrir une réclamation", "Dites-nous si le problème concerne le restaurant, la livraison ou le coursier.", complaintForm, "Envoyer la réclamation"],
    "resolve-complaint": ["Examiner la réclamation", "Enregistrez la suite donnée au client; cette action reste locale à la démonstration.", `<label class="form-field">Décision *<select name="resolution" required><option>Demande prise en compte · contacter le client</option><option>Transmettre au restaurant pour vérification</option><option>Transmettre à l'équipe livraison</option><option>Geste commercial à étudier</option><option>Demande clôturée après échange</option></select></label><label class="form-field">Note de suivi (facultative)<textarea name="note" maxlength="300" placeholder="Information utile pour l'équipe…"></textarea></label>`, "Enregistrer la décision"],
    "review": ["Votre avis compte", "Comment s'est passée votre expérience avec First Delivery ?", `<label class="form-field">Votre note<select name="rating"><option>5 étoiles · Excellent</option><option>4 étoiles · Très bien</option><option>3 étoiles · Correct</option><option>2 étoiles · Décevant</option><option>1 étoile · Mauvais</option></select></label><label class="form-field">Un mot en plus (facultatif)<textarea name="comment" placeholder="Partagez un détail qui vous a plu…"></textarea></label>`, "Envoyer mon avis"],
    "address": ["Votre adresse de livraison", "Cette adresse est utilisée dans votre démonstration locale.", `${modalField("Adresse", "address", "Résidence Les Jasmins, Ennasr 2")}<label class="form-field">Complément (facultatif)<input name="extra" placeholder="Appartement, étage, repère…"></label>`, "Enregistrer l'adresse"],
    "product": [product ? "Modifier le plat" : "Ajouter un plat", "Complétez les informations qui apparaîtront dans votre catalogue.", `${modalField("Nom du plat", "name", product?.name || "")} ${modalField("Catégorie", "category", product?.category || "Plats traditionnels")} ${modalField("Prix (DT)", "price", product?.price ?? "", "number")} ${modalField("Emoji d'illustration", "emoji", product?.emoji || "🍽️")}<label class="form-field">Description<textarea name="description" required>${esc(product?.description || "")}</textarea></label>`, product ? "Enregistrer les modifications" : "Ajouter au catalogue"],
    "reject-application": ["Refuser ce dossier", "Le motif sera visible dans la démonstration comme justification de la décision.", `<label class="form-field">Motif du refus<select name="reason"><option>Dossier incomplet</option><option>Document non conforme</option><option>Zone non couverte</option><option>Autre</option></select></label><label class="form-field">Précision (facultative)<textarea name="comment" placeholder="Informations complémentaires…"></textarea></label>`, "Confirmer le refus"],
    "refuse-order": ["Refuser la commande", "Choisissez un motif pour informer le client et conserver une trace de la décision.", `<label class="form-field">Motif du refus<select name="reason"><option>Rupture de stock</option><option>Forte affluence</option><option>Fermeture exceptionnelle</option><option>Autre</option></select></label>`, "Confirmer le refus"],
    "prep-time": ["Temps de préparation", "Indiquez le temps estimé avant que le coursier récupère la commande.", `<label class="form-field">Temps estimé (minutes)<input name="minutes" type="number" min="5" max="120" value="25" required></label><p class="form-help">Le client verra l'estimation et la promesse de livraison sera figée à l'acceptation.</p>`, "Confirmer la préparation"],
    "assign": ["Assigner le lot", "Choisissez un coursier autorisé et disponible dans cette zone.", `<label class="form-field">Coursier<select name="courier"><option>Yassine Gharbi · Ariana · 96% compatible</option><option>Karim Anouar · Centre Ville · 91% compatible</option><option>Moez H. · La Marsa · 88% compatible</option></select></label><label class="form-field">Lot<input name="batch" value="${esc(id)}" readonly></label>`, "Confirmer l'assignation"],
    "join": [joiningCourier ? "Candidature coursier" : "Dossier partenaire", joiningCourier ? "Transmettez vos coordonnées pour rejoindre l'équipe terrain." : "Soumettez les informations de votre commerce pour rejoindre la marketplace.", joiningCourier ? `${modalField("Nom complet", "name")}<label class="form-field">Type de véhicule<select name="vehicle"><option>Scooter</option><option>Vélo</option><option>Voiture</option></select></label>${modalField("Téléphone", "phone", "", "tel")} ${modalField("Zone souhaitée", "area")}` : `<div class="modal-notice join-validation-note"><span><strong>Étape de validation</strong> — le dossier sera enregistré dans cette démonstration. L'équipe responsable vérifie les informations et la zone desservie avant l'activation du compte.</span></div><div class="join-fields">${modalField("Nom commercial *", "name")} ${modalField("Catégorie *", "category", "", "text", true, "Ex. Restaurant, épicerie")}<label class="form-field join-span-two">Adresse du commerce *<input name="address" required></label>${modalField("Latitude *", "latitude", "", "number")} ${modalField("Longitude *", "longitude", "", "number")} ${modalField("Téléphone *", "phone", "", "tel")} ${modalField("E-mail", "email", "", "email")} ${modalField("Moyen de reversement", "paymentMethod", "", "text", false, "Ex. Virement bancaire")}<label class="form-field">Préparation habituelle (minutes)<input name="preparationMinutes" type="number" min="5" max="180" value="15"></label><label class="form-field join-span-two">Documents justificatifs (liens, un par ligne)<textarea name="documents" rows="3" placeholder="https://…"></textarea></label><label class="form-field join-span-two">Lien du logo<input name="logoUrl" type="url" placeholder="https://…"></label></div>`, "Soumettre le dossier"],
    "profile": ["Compte de démonstration", "Les changements sont enregistrés dans le stockage local de ce navigateur.", `<div class="modal-notice">Aucun compte réel, service SMS ou moyen de paiement n'est connecté.</div><button type="button" class="button button-secondary full-width" data-action="logout">Se déconnecter</button><button type="button" class="button button-danger-soft full-width" data-action="reset-demo">Réinitialiser la démonstration</button>`, "Fermer"],
    "notice": ["First Delivery", "Ce service est simulé dans la démonstration.", `<div class="modal-notice">Aucune action n'est envoyée à un service externe.</div>`, "Compris"]
  };
  const [title, description, body, submitLabel] = modalContent[type] || modalContent.notice;
  const showForm = !["profile", "notice"].includes(type);
  return `<div class="modal-backdrop" data-action="backdrop"><section class="modal modal-${type}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-head"><div><h2 id="modal-title">${title}</h2><p>${description}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Fermer">×</button></header>${showForm ? `<form data-modal-form="${type}" data-id="${esc(id)}"><div class="modal-body">${body}</div><footer class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Annuler</button><button type="submit" class="button ${type === "reject-application" ? "button-danger-soft" : "button-primary"}">${submitLabel}</button></footer></form>` : `<div class="modal-body">${body}</div><footer class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">${submitLabel}</button></footer>`}</section></div>`;
}

function setPartnerOrderStatus(id, status) {
  const order = state.partnerOrders.find((item) => item.id === id);
  if (!order) return;
  order.status = status;
  if (order.id === "FD-2841" && state.lastOrder) {
    const customerStatus = status === "En préparation" ? "Acceptée" : status === "Prête" ? "Prête pour collecte" : status;
    state.lastOrder.status = customerStatus;
    state.orderStatus = customerStatus;
  }
  save();
  render();
}

function courierDepositDue(name) {
  const balances = { "Yassine Gharbi": 64.5, "Karim Anouar": 0, "Moez H.": 65 };
  const deposited = state.deposits.filter((deposit) => deposit.courier === name).reduce((sum, deposit) => sum + deposit.amount, 0);
  return Math.max(0, (balances[name] || 0) - deposited);
}

function addProductToCart(productId) {
  const product = state.products.find((item) => item.id === productId);
  const partner = clientPartners[state.selectedPartner] || clientPartners[0];
  if (!product || !product.available) {
    toast("Ce plat n'est plus disponible.", "error");
    return;
  }
  if (state.selectedPartner === 0 && (state.storePaused || !isPartnerOpenNow())) {
    toast("Chez Mouna est fermé pour le moment. Choisissez une autre adresse.", "error");
    return;
  }
  if (state.cart.length && state.cart[0].partner !== partner.name) {
    state.modal = { type: "cart-conflict", id: productId };
    render();
    return;
  }
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, quantity: 1, partner: partner.name });
  save();
  render();
  toast(`${product.name} ajouté au panier.`);
}

function renderConflictModal() {
  const product = state.products.find((item) => item.id === state.modal.id);
  const partner = clientPartners[state.selectedPartner];
  return `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-head"><div><h2>Une seule adresse par commande</h2><p>Votre panier contient déjà des articles d'un autre partenaire.</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Fermer">×</button></header><div class="modal-body"><div class="modal-notice">Pour respecter les commandes mono-partenaire, choisissez de vider votre panier et recommencer chez ${esc(partner.name)}, ou revenez à votre sélection actuelle.</div></div><footer class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Garder mon panier</button><button type="button" class="button button-primary" data-action="replace-cart" data-id="${product?.id || ""}">Vider et ajouter ce plat</button></footer></section></div>`;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  const pageButton = target.closest("[data-page]");
  const actionButton = target.closest("[data-action]");
  if (pageButton) {
    event.preventDefault();
    setPage(pageButton.dataset.page);
    document.querySelector("#sidebar")?.classList.remove("open");
    return;
  }
  const zoneRow = target.closest(".tariff-row[data-zone-id]");
  if (zoneRow && !target.closest("input")) {
    focusCoverageZone(zoneRow.dataset.zoneId);
    return;
  }
  if (!actionButton) return;
  const { action, id } = actionButton.dataset;
  if (action === "backdrop" && target !== actionButton) return;
  switch (action) {
    case "home":
      setPage(profiles[state.role].nav[0][0]);
      break;
    case "menu":
      document.querySelector("#sidebar")?.classList.toggle("open");
      break;
    case "menu-close":
      document.querySelector("#sidebar")?.classList.remove("open");
      break;
    case "close-modal":
      state.modal = null;
      render();
      break;
    case "profile-menu":
      openModal("profile");
      break;
    case "logout":
      state.authenticated = false;
      authOtpSent = false;
      authPhone = "";
      state.modal = null;
      save();
      render();
      break;
    case "edit-phone":
      authOtpSent = false;
      authPhone = "";
      save();
      render();
      break;
    case "join-modal":
      state.role = actionButton.dataset.role;
      authOtpSent = false;
      authPhone = "";
      openModal("join");
      break;
    case "reset-demo":
      localStorage.removeItem(STORAGE_KEY);
      state = structuredClone(initialState);
      authOtpSent = false;
      authPhone = "";
      render();
      toast("La démonstration a été réinitialisée.");
      break;
    case "notifications":
    case "help":
    case "call":
    case "address":
    case "all-categories":
      openModal(action === "address" ? "address" : "notice");
      break;
    case "category":
      document.querySelectorAll(".category-chip").forEach((chip) => chip.classList.remove("selected"));
      actionButton.classList.add("selected");
      toast("Les catégories sont simulées dans cette démonstration.");
      break;
    case "favorite":
      actionButton.classList.toggle("favorited");
      actionButton.textContent = actionButton.classList.contains("favorited") ? "♥" : "♡";
      toast(actionButton.classList.contains("favorited") ? "Adresse ajoutée à vos favoris." : "Adresse retirée de vos favoris.");
      break;
    case "open-menu":
      state.selectedPartner = Number(actionButton.dataset.partner || 0);
      state.page = "menu";
      save();
      render();
      break;
    case "add-to-cart":
      addProductToCart(id);
      break;
    case "replace-cart": {
      state.cart = [];
      state.modal = null;
      addProductToCart(id);
      break;
    }
    case "quantity": {
      const item = state.cart.find((entry) => entry.id === id);
      if (!item) break;
      item.quantity += Number(actionButton.dataset.delta);
      if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
      save();
      render();
      break;
    }
    case "checkout": {
      if (!state.cart.length) {
        toast("Votre panier est vide.", "error");
        break;
      }
      const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.lastOrder = { partner: state.cart[0].partner, items: structuredClone(state.cart), total: subtotal + 3.5, status: "En attente du partenaire" };
      state.orderStatus = "En attente du partenaire";
      if (state.lastOrder.partner === "Chez Mouna") {
        const partnerOrder = state.partnerOrders.find((item) => item.id === "FD-2841");
        if (partnerOrder) {
          partnerOrder.customer = "Amira Ben Salem";
          partnerOrder.items = state.cart.map((item) => `${item.name} · ${item.quantity}`).join(", ");
          partnerOrder.amount = subtotal;
          partnerOrder.status = "À traiter";
        }
      }
      state.cart = [];
      state.page = "commandes";
      save();
      render();
      toast("Commande confirmée · Paiement en espèces à la livraison.");
      break;
    }
    case "cancel-order":
      if (state.lastOrder && ["En attente du partenaire", "Acceptée"].includes(state.lastOrder.status)) {
        state.lastOrder.status = "Annulée";
        state.orderStatus = "Annulée";
        const partnerOrder = state.partnerOrders.find((item) => item.id === "FD-2841");
        if (partnerOrder) partnerOrder.status = "Annulée";
        save();
        render();
        toast("Commande annulée sans frais.");
      } else toast("Cette commande ne peut plus être annulée.", "error");
      break;
    case "open-tracking":
      setPage("suivi");
      break;
    case "verify-code":
      openModal("verify-code");
      break;
    case "review-modal":
      openModal("review");
      break;
    case "complaint-modal":
      openModal("complaint", id || state.lastOrder?.id || "FD-2841");
      break;
    case "reorder": {
      const partner = clientPartners[1];
      state.selectedPartner = 1;
      state.cart = state.products.filter((item) => item.available).slice(0, 2).map((item) => ({ id: item.id, name: item.name, emoji: item.emoji, price: item.price, quantity: 1, partner: partner.name }));
      setPage("panier");
      break;
    }
    case "accept-order":
      if (state.storePaused) {
        toast("Votre boutique est en pause. Reprenez les commandes pour accepter ce dossier.", "error");
        break;
      }
      openModal("prep-time", id);
      break;
    case "refuse-order":
      openModal("refuse-order", id);
      break;
    case "ready-order":
      setPartnerOrderStatus(id, "Prête");
      toast(`Commande ${id} prête pour la collecte.`);
      break;
    case "toggle-suspension": {
      const account = state.managedAccounts.find((item) => item.id === id);
      if (account) account.suspended = !account.suspended;
      save();
      render();
      toast(account?.suspended ? `Compte de ${account.name} suspendu.` : `Compte de ${account?.name || "l'utilisateur"} réactivé.`);
      break;
    }
    case "toggle-product": {
      const product = state.products.find((item) => item.id === id);
      if (product) product.available = !product.available;
      save();
      render();
      toast(product?.available ? "Plat remis au menu." : "Plat marqué indisponible.");
      break;
    }
    case "add-product":
      openModal("product");
      break;
    case "edit-product":
      openModal("product", id);
      break;
    case "toggle-pause":
      if (state.storePaused) {
        state.storePaused = false;
        state.pauseUntil = null;
      } else {
        const until = new Date();
        if (Number(state.pauseDurationMinutes) === -1) until.setHours(23, 59, 59, 999);
        else until.setMinutes(until.getMinutes() + Number(state.pauseDurationMinutes));
        state.pauseUntil = until.getTime();
        state.storePaused = true;
      }
      save();
      render();
      if (state.storePaused) {
        const pauseDeadline = state.pauseUntil;
        setTimeout(() => {
          if (!state.storePaused || state.pauseUntil !== pauseDeadline || pauseDeadline > Date.now()) return;
          state.storePaused = false;
          state.pauseUntil = null;
          save();
          render();
          toast("La pause programmée est terminée. Votre boutique est de nouveau ouverte.");
        }, Math.max(0, state.pauseUntil - Date.now()));
      }
      toast(state.storePaused ? `Pause activée · ${state.pauseReason}.` : "Votre boutique reçoit à nouveau les commandes.");
      break;
    case "copy-monday":
      state.openingHours = state.openingHours.map((entry, index) => ({ ...structuredClone(state.openingHours[0]), day: entry.day, ...(index === 6 ? { enabled: false } : {}) }));
      save();
      render();
      toast("Les horaires du lundi ont été copiés sur la semaine.");
      break;
    case "add-range": {
      const entry = state.openingHours[Number(actionButton.dataset.index)];
      if (entry) {
        entry.extra ||= [];
        entry.extra.push({ open: "15:30", close: "18:30" });
      }
      save();
      render();
      break;
    }
    case "remove-range": {
      const entry = state.openingHours[Number(actionButton.dataset.day)];
      entry?.extra?.splice(Number(actionButton.dataset.range), 1);
      save();
      render();
      break;
    }
    case "save-hours":
      document.querySelector("[data-weekly-hours-form]")?.requestSubmit();
      break;
    case "toggle-availability":
      state.courierAvailable = !state.courierAvailable;
      save();
      render();
      toast(state.courierAvailable ? "Vous êtes disponible dans vos zones." : "Vous êtes maintenant hors ligne.");
      break;
    case "accept-batch":
      if (!state.courierAvailable) {
        toast("Mettez-vous en ligne pour accepter un lot.", "error");
        break;
      }
      state.courierAccepted = true;
      state.courierStep = 0;
      if (state.lastOrder) state.lastOrder.status = "Coursier assigné";
      save();
      render();
      toast("Lot accepté · Votre itinéraire est prêt.");
      break;
    case "decline-batch":
      toast("Offre refusée · Elle sera reproposée à un autre coursier.");
      break;
    case "courier-next":
      if (state.courierStep >= 2) {
        openModal("courier-delivery");
      } else {
        state.courierStep += 1;
        if (state.lastOrder) state.lastOrder.status = state.courierStep === 1 ? "Première collecte confirmée" : "Collectes confirmées · Livraison en cours";
        save();
        render();
        toast(state.courierStep === 1 ? "Collecte confirmée · Prochaine étape ajoutée." : "Deuxième collecte confirmée · Direction le client.");
      }
      break;
    case "courier-failure":
      openModal("courier-failure");
      break;
    case "deposit-modal":
      openModal("deposit");
      break;
    case "closing":
      if (state.closingValidated) {
        toast("Le closing de la semaine est déjà validé.");
        break;
      }
      state.closingValidated = true;
      save();
      render();
      toast("Closing validé · Les relevés de démonstration sont prêts.");
      break;
    case "save-commission": {
      const commission = document.querySelector("#commission-input")?.value;
      if (commission === "" || Number(commission) < 0 || Number(commission) > 40) {
        toast("Saisissez un taux entre 0 et 40%.", "error");
        break;
      }
      state.commissionRate = Number(commission);
      save();
      render();
      toast(`Commission enregistrée à ${commission}%.`);
      break;
    }
    case "resolve-complaint": {
      openModal("resolve-complaint", id);
      break;
    }
    case "resolve-incident":
      openModal("resolve-incident", id);
      break;
    case "approve-application": {
      const application = state.applications.find((item) => item.id === id);
      state.applications = state.applications.filter((item) => item.id !== id);
      save();
      render();
      toast(`${application?.name || "Compte"} validé · décision simulée.`);
      break;
    }
    case "reject-application":
      openModal("reject-application", id);
      break;
    case "request-documents":
      openModal("request-documents", id);
      break;
    case "contact-prospect": {
      const prospect = state.prospects.find((item) => item.id === id);
      if (prospect) prospect.status = "Contacté";
      save();
      render();
      toast("Prospect marqué comme contacté. Le suivi reste manuel.");
      break;
    }
    case "prospect-next": {
      const prospect = state.prospects.find((item) => item.id === id);
      if (prospect) prospect.status = prospect.status === "Contacté" ? "Intéressé" : prospect.status === "Intéressé" ? "Inscrit" : "Refusé";
      save();
      render();
      toast("Statut du prospect mis à jour.");
      break;
    }
    case "refresh-prospects":
      toast("Les prospects sont fictifs · Aucune source externe n'est contactée.");
      break;
    case "boost-zone":
      toast(`Demande de renfort simulée pour ${actionButton.dataset.zone}.`);
      break;
    case "save-zones":
      {
        const rates = [...document.querySelectorAll(".tariff-row")].map((row) => [row.dataset.zone, Number(row.querySelector("input").value)]);
        if (rates.some(([, rate]) => !Number.isFinite(rate) || rate < 0)) {
          toast("Chaque frais doit être un nombre positif ou nul.", "error");
          break;
        }
        state.zoneRates = Object.fromEntries(rates);
        save();
        render();
        toast("Les tarifs par zone sont enregistrés localement.");
      }
      break;
    case "map-refresh":
      if (state.page === "zones" && zonesMapInstance) {
        zonesMapInstance.invalidateSize();
        zonesMapInstance.fitBounds(window.L.featureGroup([...zoneMapLayers.values()]).getBounds().pad(0.12));
      }
      [trackingMapInstance, courierMapInstance, dispatchMapInstance].forEach((map) => map?.invalidateSize());
      toast("Carte et fond OpenStreetMap actualisés.");
      break;
    case "locate-courier":
      if (!navigator.geolocation) {
        toast("La géolocalisation n'est pas disponible dans ce navigateur.", "error");
        break;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const point = [position.coords.latitude, position.coords.longitude];
        if (courierMapInstance && window.L) {
          courierGpsMarker?.remove();
          courierGpsAccuracy?.remove();
          courierGpsAccuracy = window.L.circle(point, { radius: position.coords.accuracy, color: "#287fb8", weight: 1, fillColor: "#58a9df", fillOpacity: 0.14 }).addTo(courierMapInstance);
          courierGpsMarker = window.L.marker(point, { icon: mapIcon("active") }).addTo(courierMapInstance).bindPopup(`Votre position GPS · précision ± ${Math.round(position.coords.accuracy)} m · session locale`).openPopup();
        }
        courierMapInstance?.flyTo(point, 16);
        toast(`Position GPS trouvée · précision ± ${Math.round(position.coords.accuracy)} m.`);
      }, () => toast("Position non disponible. Vérifiez l'autorisation GPS de votre navigateur.", "error"), { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 });
      break;
    case "export": {
      const rows = [["Élément", "Valeur"], ["Profil", profiles[state.role].name], ["Date", new Date().toLocaleDateString("fr-FR")], ["Note", "Données fictives de démonstration"]];
      const csv = rows.map((row) => row.map((field) => `"${field.replaceAll('"', '""')}"`).join(";")).join("\n");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
      link.download = "first-delivery-demo.csv";
      link.click();
      URL.revokeObjectURL(link.href);
      toast("Rapport de démonstration exporté.");
      break;
    }
    case "category": {
      actionButton.parentElement.querySelectorAll(".category-chip").forEach((item) => item.classList.toggle("selected", item === actionButton));
      applyPartnerFilters();
      break;
    }
    case "filter-orders":
    case "filter-products":
    case "filter-apps":
    case "filter-prospects": {
      const group = actionButton.closest("[data-filter-group]");
      if (group) {
        group.querySelectorAll(".filter-pill").forEach((item) => item.classList.toggle("active", item === actionButton));
        const type = group.dataset.filterGroup;
        const value = actionButton.dataset.filterValue || "all";
        document.querySelectorAll(`[data-filter-item="${type}"]`).forEach((item) => {
          const itemValue = item.dataset.filterValue || "";
          const matches = value === "all" || (value === "discussion" ? ["Contact\u00e9", "Int\u00e9ress\u00e9", "Inscrit"].includes(itemValue) : value === "suspended" ? itemValue.includes("Suspendu") : type === "apps" ? itemValue.includes(value) : type === "dispatch" ? (value === "? assigner" ? itemValue.includes("? assigner") : value === "En route" ? itemValue.includes("Yassine") : value === "Alertes" ? itemValue.includes("\u00c0 traiter") : true) : itemValue === value);
          item.hidden = !matches;
        });
      }
      break;
    }
    case "backdrop":
      state.modal = null;
      render();
      break;
    default:
      break;
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches(".schedule-day-toggle input")) {
    const row = event.target.closest(".schedule-day");
    row?.classList.toggle("day-closed", !event.target.checked);
    row?.querySelectorAll(".schedule-shifts input").forEach((input) => { input.disabled = !event.target.checked; });
    const label = row?.querySelector(".schedule-day-toggle small");
    if (label) label.textContent = event.target.checked ? "OUVERT" : "FERMÉ";
  }
  if (event.target.id === "scheduled-hours-enabled") {
    state.scheduledHoursEnabled = event.target.checked;
    save();
  }
  if (event.target.matches('input[name="pause-duration"]')) {
    state.pauseDurationMinutes = Number(event.target.value);
    save();
    render();
  }
  if (event.target.id === "pause-reason") {
    state.pauseReason = event.target.value;
    save();
  }
  if (event.target.id === "expiry-limit") {
    state.orderExpiryLimit = Math.max(1, Math.min(10, Number(event.target.value) || 3));
    save();
  }
  if (event.target.id === "auto-pause-expiry") {
    state.pauseOnConsecutiveExpiry = event.target.checked;
    save();
  }
  if (event.target.id === "order-sound") {
    state.orderSoundEnabled = event.target.checked;
    save();
  }
  if (event.target.id === "auth-role") {
    state.role = event.target.value;
    save();
  }
  if (event.target.id === "role-select") {
    state.role = event.target.value;
    state.page = profiles[state.role].nav[0][0];
    state.modal = null;
    save();
    render();
  }
  if (event.target.name === "courier" && state.modal?.type === "deposit") {
    const amountInput = document.querySelector('input[name="amount"]');
    if (amountInput) amountInput.value = courierDepositDue(event.target.value).toFixed(3);
  }
});

function applyPartnerFilters() {
  const category = document.querySelector(".category-chip.selected")?.dataset.category || "Tout";
  const query = (document.querySelector("#partner-search")?.value || "").trim().toLocaleLowerCase("fr");
  const area = document.querySelector("#partner-area")?.value || "all";
  const minRating = Number(document.querySelector("#partner-rating")?.value || 0);
  const cards = [...document.querySelectorAll("[data-search-card]")];
  cards.forEach((card) => {
    card.hidden = (category !== "Tout" && card.dataset.partnerCategory !== category)
      || !card.dataset.searchCard.includes(query)
      || (area !== "all" && card.dataset.partnerArea !== area)
      || Number(card.dataset.partnerRating) < minRating;
  });
  const sort = document.querySelector("#partner-sort")?.value;
  cards.sort((a, b) => sort === "rating"
    ? Number(b.dataset.partnerRating) - Number(a.dataset.partnerRating)
    : sort === "fastest"
      ? Number(a.dataset.partnerEta) - Number(b.dataset.partnerEta)
      : Number(a.dataset.partnerIndex) - Number(b.dataset.partnerIndex));
  const grid = document.querySelector(".partner-grid");
  cards.forEach((card) => grid?.append(card));
  const emptyState = document.querySelector("#partner-empty");
  if (emptyState) emptyState.hidden = cards.every((card) => card.hidden);
}

document.addEventListener("change", (event) => {
  if (event.target.matches("#partner-area, #partner-rating, #partner-sort")) applyPartnerFilters();
  if (event.target.matches("#complaint-type")) {
    const reason = document.querySelector("#complaint-reason");
    if (!reason) return;
    reason.querySelectorAll("optgroup").forEach((group) => { group.disabled = group.label !== event.target.value; });
    reason.value = reason.querySelector(`optgroup[label="${event.target.value}"] option`)?.value || "";
  }
});

document.addEventListener("input", (event) => {
  const input = event.target;
  if (!input.matches("#partner-search, #order-search, #product-search, #dispatch-search, #complaint-search")) return;
  const query = input.value.trim().toLocaleLowerCase("fr");
  if (input.id === "partner-search") {
    applyPartnerFilters();
    return;
  }
  if (input.id === "complaint-search") {
    document.querySelectorAll(".complaint-row").forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase("fr").includes(query); });
    return;
  }
  if (input.id === "product-search") {
    document.querySelectorAll(".product-row").forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase("fr").includes(query); });
    return;
  }
  document.querySelectorAll(".table-panel tbody tr").forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase("fr").includes(query); });
});

document.addEventListener("submit", (event) => {
  const authForm = event.target.closest("[data-auth-form]");
  if (authForm) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(authForm).entries());
    if (!authOtpSent) {
      state.role = data.role;
      const phone = String(data.phone).replace(/\D/g, "");
      if (phone.length !== 8) {
        toast("Saisissez un numéro tunisien valide de 8 chiffres.", "error");
        return;
      }
      authPhone = phone;
      authOtpSent = true;
      save();
      render();
      return;
    }
    if (data.code !== "123456") {
      toast("Code invalide · Utilisez le code de démonstration 123456.", "error");
      return;
    }
    state.authenticated = true;
    authOtpSent = false;
    authPhone = "";
    state.page = profiles[state.role].nav[0][0];
    save();
    render();
    toast(`Connexion de démonstration réussie · ${profiles[state.role].name}.`);
    return;
  }
  const hoursForm = event.target.closest("[data-weekly-hours-form]");
  if (hoursForm) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(hoursForm).entries());
    const nextHours = state.openingHours.map((entry, index) => {
      const enabled = data[`enabled-${index}`] === "on";
      const open1 = data[`open1-${index}`] || entry.open1;
      const close1 = data[`close1-${index}`] || entry.close1;
      const open2 = data[`open2-${index}`] || entry.open2;
      const close2 = data[`close2-${index}`] || entry.close2;
      const extra = (entry.extra || []).map((range, rangeIndex) => ({
        open: data[`extra-open-${index}-${rangeIndex}`] || range.open,
        close: data[`extra-close-${index}-${rangeIndex}`] || range.close
      }));
      if (enabled && (!open1 || !close1 || !open2 || !close2 || [...extra].some((range) => !range.open || !range.close))) return null;
      return { ...entry, enabled, open1, close1, open2, close2, extra };
    });
    if (nextHours.some((entry) => !entry)) {
      toast("Renseignez toutes les heures d'ouverture et de fermeture.", "error");
      return;
    }
    state.openingHours = nextHours;
    state.hoursUpdatedAt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date());
    save();
    render();
    toast("Les horaires de la semaine ont été enregistrés.");
    return;
  }
  const partnerProfileForm = event.target.closest("[data-partner-profile-form]");
  if (partnerProfileForm) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(partnerProfileForm).entries());
    const latitude = Number(data.latitude);
    const longitude = Number(data.longitude);
    const preparationMinutes = Number(data.preparationMinutes);
    const hourlyCapacity = Number(data.hourlyCapacity);
    if (!data.name.trim() || !data.category.trim() || !data.address.trim() || !Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180 || preparationMinutes < 5 || preparationMinutes > 180 || hourlyCapacity < 1) {
      toast("Vérifiez les coordonnées GPS, le temps de préparation et la capacité.", "error");
      return;
    }
    Object.assign(state.partnerProfile, { ...data, latitude, longitude, preparationMinutes, hourlyCapacity });
    if (data.newDocument && /^https?:\/\//i.test(data.newDocument.trim())) state.partnerProfile.documents.push(data.newDocument.trim());
    save();
    render();
    toast("Dossier partenaire mis à jour dans cette démonstration.");
    return;
  }
  const form = event.target.closest("[data-modal-form]");
  if (!form) return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const { modal } = state;
  switch (form.dataset.modalForm) {
    case "verify-code":
      if (data.code !== "482196") {
        toast("Code invalide · Réessayez avec le code de démonstration affiché.", "error");
        return;
      }
      if (state.lastOrder) {
        state.lastOrder.status = "Livrée";
        state.orderStatus = "Livrée";
      } else state.orderStatus = "Livrée";
      toast("Remise confirmée · Code à usage unique validé.");
      break;
    case "courier-delivery":
      if (Number(data.amount) !== 32.9 || data.code !== "482196") {
        toast("Vérifiez le montant de 32,900 DT et le code de remise 482196.", "error");
        return;
      }
      state.courierStep = 3;
      state.courierAccepted = false;
      if (state.lastOrder) {
        state.lastOrder.status = "Livrée";
        state.orderStatus = "Livrée";
      }
      toast("Livraison confirmée · Montant et code vérifiés.");
      break;
    case "complaint": {
      const id = `REC-${String(Date.now()).slice(-6)}`;
      const amountByReason = { "Article manquant": 4.2, "Erreur de commande": 0, "Qualité ou température du repas": 0, "Emballage endommagé": 0, "Retard de livraison": 0, "Commande non reçue": 0 };
      state.complaints.unshift({ id, customer: profiles.client.person, order: data.order, type: data.type, reason: data.reason, comment: data.comment.trim(), amount: amountByReason[data.reason] || 0, status: "À examiner", resolution: "", createdAt: new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date()) });
      toast(`Réclamation ${id} envoyée · vous pourrez suivre son statut dans « Aide & réclamations ».`);
      break;
    }
    case "resolve-complaint": {
      const complaint = state.complaints.find((item) => item.id === form.dataset.id);
      if (complaint) {
        complaint.status = "Résolue";
        complaint.resolution = data.resolution;
        complaint.staffNote = data.note.trim();
      }
      toast(`${form.dataset.id} · décision enregistrée.`);
      break;
    }
    case "courier-failure":
      state.incidents.unshift({
        id: `INC-${String(100 + state.incidents.length).padStart(3, "0")}`,
        order: data.order?.split(/\s*(?:\u00b7|\u00c2\u00b7)\s*/)[0].trim() || state.lastOrder?.id || "FD-2841",
        courier: profiles.coursier.person,
        reason: data.reason,
        type: data.reason.includes("Accident") || data.reason.includes("blessure") ? "Accident / urgence" : data.reason.includes("Client") ? "Incident client" : data.reason.includes("Panne") ? "Incident véhicule" : "Incident de livraison",
        contactAttempted: data.contactAttempted === "yes",
        proofFile: data.proofFile instanceof File ? data.proofFile.name : "",
        proofUrl: /^https?:\/\//i.test(data.proofUrl || "") ? data.proofUrl.trim() : "",
        comment: data.comment.trim(),
        status: "À traiter",
        resolution: "",
        createdAt: new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date())
      });
      state.courierStep = 0;
      state.courierAccepted = false;
      toast(`Échec déclaré : ${data.reason}. Le responsable peut traiter le rapport.`, "error");
      break;
    case "resolve-incident": {
      const incident = state.incidents.find((item) => item.id === form.dataset.id);
      if (incident) {
        incident.resolution = data.resolution;
        incident.note = data.note.trim();
        incident.status = "Résolu";
      }
      toast(`Décision enregistrée : ${data.resolution}.`);
      break;
    }
    case "request-documents": {
      const application = state.applications.find((item) => item.id === form.dataset.id);
      if (application) {
        application.status = "À compléter";
        application.reviewNote = data.note.trim();
      }
      toast("Demande de complément ajoutée au dossier.");
      break;
    }
    case "deposit":
      if (!Number(data.amount) || Number(data.amount) <= 0 || Math.abs(Number(data.amount) - courierDepositDue(data.courier)) >= 0.001) {
        toast(`Le dépôt doit correspondre au solde exact de ${money(courierDepositDue(data.courier))}.`, "error");
        return;
      }
      state.deposit = Number(data.amount).toFixed(3);
      const receipt = `FD-DEP-${String(75 + state.deposits.length).padStart(3, "0")}`;
      state.deposits.push({ courier: data.courier, amount: Number(data.amount), receipt });
      toast(`Dépôt de ${money(data.amount)} enregistré · Reçu ${receipt}.`);
      break;
    case "review":
      toast("Merci pour votre avis · Il a été enregistré dans cette démonstration.");
      break;
    case "address":
      toast("Adresse enregistrée dans cette démonstration.");
      break;
    case "product": {
      const existing = state.products.find((item) => item.id === form.dataset.id);
      const product = { id: existing?.id || `p${Date.now()}`, name: data.name.trim(), category: data.category.trim(), price: Number(data.price), emoji: data.emoji.trim() || "🍽️", available: existing?.available ?? true, description: data.description.trim() };
      if (!product.name || !product.category || !Number.isFinite(product.price) || product.price < 0) {
        toast("Vérifiez le nom, la catégorie et le prix du plat.", "error");
        return;
      }
      if (existing) Object.assign(existing, product);
      else state.products.unshift(product);
      toast(existing ? "Plat modifié dans votre catalogue." : "Nouveau plat ajouté au catalogue.");
      break;
    }
    case "reject-application": {
      const application = state.applications.find((item) => item.id === form.dataset.id);
      state.applications = state.applications.filter((item) => item.id !== form.dataset.id);
      toast(`Dossier refusé · Motif : ${data.reason}${application ? ` · ${application.name}` : ""}.`, "error");
      break;
    }
    case "refuse-order": {
      const order = state.partnerOrders.find((item) => item.id === form.dataset.id);
      if (order) order.status = "Refusée";
      if (form.dataset.id === "FD-2841" && state.lastOrder) {
        state.lastOrder.status = "Refusée";
        state.orderStatus = "Refusée";
      }
      toast(`Commande ${form.dataset.id} refusée · Motif : ${data.reason}.`, "error");
      break;
    }
    case "prep-time": {
      const order = state.partnerOrders.find((item) => item.id === form.dataset.id);
      if (!Number(data.minutes) || Number(data.minutes) < 5 || Number(data.minutes) > 120) {
        toast("Le temps de préparation doit être compris entre 5 et 120 minutes.", "error");
        return;
      }
      if (order) {
        order.minutes = Number(data.minutes);
        order.status = "En préparation";
      }
      if (form.dataset.id === "FD-2841" && state.lastOrder) {
        state.lastOrder.status = "Acceptée";
        state.orderStatus = "Acceptée";
      }
      toast(`Commande acceptée · Préparation estimée : ${data.minutes} min.`);
      break;
    }
    case "assign":
      toast(`${data.batch} assigné à ${data.courier.split(" · ")[0]} · Démonstration.`);
      break;
    case "join": {
      const name = data.name.trim();
      const phone = String(data.phone).replace(/\D/g, "");
      const validPhone = phone.length === 8 || (phone.length === 11 && phone.startsWith("216"));
      if (!name || (state.role === "coursier" && !data.area.trim()) || !validPhone) {
        toast(state.role === "coursier" ? "Saisissez un nom, une zone et un numéro tunisien valide." : "Saisissez un nom commercial et un numéro tunisien valide.", "error");
        return;
      }
      const joiningCourier = state.role === "coursier";
      const latitude = Number(data.latitude);
      const longitude = Number(data.longitude);
      if (!joiningCourier && (!data.category?.trim() || !data.address?.trim() || !Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180)) {
        toast("Renseignez la catégorie, l'adresse et des coordonnées GPS valides.", "error");
        return;
      }
      const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
      const type = joiningCourier ? `Coursier · ${data.vehicle}` : `Partenaire · ${data.category.trim()}`;
      state.applications.unshift({
        id: `ap${Date.now()}`,
        name,
        type,
        area: joiningCourier ? data.area.trim() : data.address.trim(),
        status: "À vérifier",
        initials,
        ...(joiningCourier ? {} : { details: { latitude, longitude, phone, email: data.email.trim(), paymentMethod: data.paymentMethod.trim(), preparationMinutes: Number(data.preparationMinutes) || 15, documents: data.documents.trim(), logoUrl: data.logoUrl.trim() } })
      });
      toast(joiningCourier ? "Candidature envoyée · Elle apparaît dans les comptes à valider." : "Dossier partenaire envoyé · Il apparaît dans les demandes à valider.");
      break;
    }
    default:
      break;
  }
  state.modal = null;
  save();
  render();
});

render();
