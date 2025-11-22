<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Presentatore ELDA MAZZOCCHI SCARZELLA - Dashboard</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  
  <!-- Non ho il file js/theme.js, se è fondamentale includilo a parte -->
  <!-- <script src="js/theme.js" defer></script> -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --violet: #7c3aed;
      --violet-dark: #5b21b6;
      --accent: #a855f7;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #fbbf24;
      --text: #222222;
      --text-muted: #666666;
      --bg-main: #f4f7f6;
      --bg-card: #ffffff;
      --border-light: #e0e0e0;
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      --shadow-hover: 0 12px 35px rgba(0, 0, 0, 0.12);
      --radius: 15px;
    }

    body[data-theme="dark"] {
      --text: #ffffff;
      --text-muted: #e0e0e0;
      --bg-main: linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed);
      --bg-card: rgba(255, 255, 255, 0.12);
      --border-light: rgba(255, 255, 255, 0.2);
      --shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      --shadow-hover: 0 30px 60px rgba(0, 0, 0, 0.6);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: var(--bg-main);
      color: var(--text);
      min-height: 100vh;
      transition: background 0.3s ease;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Header migliorato */
    header {
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      padding: 1.5rem 2rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      border: 1px solid var(--border-light);
    }

    .header-left h1 {
      font-size: 1.8rem;
      color: var(--violet);
      margin-bottom: 0.3rem;
    }

    .header-left p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .header-actions {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }

    /* Pulsanti migliorati */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border: none;
      border-radius: 10px;
      padding: 0.8rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-primary {
      background: var(--violet);
      box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
    }

    .btn-primary:hover {
      background: var(--violet-dark);
    }

    .btn-secondary {
      background: transparent;
      border: 2px solid var(--border-light);
      color: var(--text);
    }

    .btn-success {
      background: var(--success);
    }

    .btn-danger {
      background: var(--danger);
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Grid migliorata */
    .presenter-grid {
      display: grid;
      grid-template-columns: 1fr 480px;
      gap: 1.5rem;
      align-items: start;
    }

    @media (max-width: 1200px) {
      .presenter-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Card migliorata */
    .card {
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      padding: 1.5rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      border: 1px solid var(--border-light);
    }

    .card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--violet-dark);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    body[data-theme="dark"] .card h3 {
      color: #c7b3ff;
    }

    /* Lista presentazioni migliorata */
    .presentations-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      max-height: 600px;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .presentations-list::-webkit-scrollbar {
      width: 6px;
    }

    .presentations-list::-webkit-scrollbar-thumb {
      background: var(--violet);
      border-radius: 10px;
    }

    .presentation-item {
      background: var(--bg-main);
      border: 1px solid var(--border-light);
      border-radius: 12px;
      padding: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
    }

    .presentation-item:hover {
      transform: translateX(5px);
      box-shadow: var(--shadow);
    }

    .presentation-info {
      flex: 1;
    }

    .presentation-info strong {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
      color: var(--text);
    }

    .presentation-info small {
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-left: 0.5rem;
    }

    .status-live {
      background: rgba(239, 68, 68, 0.15);
      color: var(--danger);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* Control Panel migliorato */
    .control-panel {
      position: sticky;
      top: 1rem;
    }

    .pin-section {
      background: linear-gradient(135deg, var(--violet), var(--accent));
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 1.5rem;
      color: white;
    }

    .pin-label {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }

    .pin-display {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    .presentation-preview {
      background: rgba(0,0,0,0.05);
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    body[data-theme="dark"] .presentation-preview {
      background: rgba(0,0,0,0.2);
    }

    .preview-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid var(--border-light);
    }

    .preview-row:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .preview-label {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .preview-value {
      font-weight: 600;
      color: var(--text);
    }

    .slide-navigation {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .slide-counter {
      background: var(--violet);
      color: white;
      padding: 0.8rem;
      border-radius: 10px;
      text-align: center;
      font-weight: 600;
      font-size: 1.1rem;
      grid-column: 1 / -1;
    }

    /* Chart migliorato */
    .chart-container {
      background: rgba(0,0,0,0.03);
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    body[data-theme="dark"] .chart-container {
      background: rgba(0,0,0,0.2);
    }

    #resultsChart {
      width: 100% !important;
      height: 240px !important;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .stat-card {
      background: rgba(0,0,0,0.03);
      padding: 1rem;
      border-radius: 10px;
      text-align: center;
    }

    body[data-theme="dark"] .stat-card {
      background: rgba(0,0,0,0.2);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--violet);
      display: block;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 0.3rem;
    }

    /* Stati vuoti */
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--text-muted);
    }

    .empty-state i {
      font-size: 4rem;
      color: var(--border-light);
      margin-bottom: 1rem;
      display: block;
    }

    /* Loading */
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Toast notifications */
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: var(--shadow);
      display: flex;
      align-items: center;
      gap: 0.8rem;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast.success { border-left: 4px solid var(--success); }
    .toast.error { border-left: 4px solid var(--danger); }
    .toast.warning { border-left: 4px solid var(--warning); }

    .hidden { display: none !important; }

    /* Stili per la visualizzazione live */
    body.live-active {
        /* Potresti voler modificare lo sfondo o altro per evidenziare la modalità live */
    }
  </style>
</head>
<body>
  
  <div class="container">
    <header>
      <div class="header-left">
        <h1><i class="fas fa-presentation"></i> Dashboard Presentatore</h1>
        <p>Gestisci e presenta le tue slide in tempo reale</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary btn-sm" id="refreshBtn">
          <i class="fas fa-sync-alt"></i> Aggiorna
        </button>
        <button class="btn btn-danger btn-sm" id="logoutBtn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </header>

    <div class="presenter-grid">
      <!-- Colonna sinistra: Lista presentazioni (Lobby View) -->
      <div id="lobbyView">
        <div class="card">
          <h3>
            <i class="fas fa-folder-open"></i>
            Le Tue Presentazioni
          </h3>
          <div class="presentations-list" id="presentationList">
            <div class="empty-state">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Caricamento presentazioni...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonna destra: Pannello di controllo (Live View - inizialmente nascosto) -->
      <aside class="control-panel hidden" id="liveView">
        <div class="card">
          <h3>
            <i class="fas fa-broadcast-tower"></i>
            Controllo Live
          </h3>

          <!-- PIN -->
          <div class="pin-section">
            <div class="pin-label">PIN di accesso per i giocatori</div>
            <div class="pin-display" id="pinDisplay">——————</div>
          </div>

          <!-- Preview presentazione -->
          <div class="presentation-preview" id="presentationPreview">
            <div class="preview-row">
              <span class="preview-label">Presentazione:</span>
              <span class="preview-value" id="liveTitle">—</span>
            </div>
            <div class="preview-row">
              <span class="preview-label">Domanda corrente:</span>
              <span class="preview-value" id="liveQuestion">—</span>
            </div>
          </div>

          <!-- Statistiche -->
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-value" id="responseCount">0</span>
              <span class="stat-label">Risposte</span>
            </div>
            <div class="stat-card">
              <span class="stat-value" id="playerCount">0</span>
              <span class="stat-label">Giocatori</span>
            </div>
          </div>

          <!-- Navigazione slide -->
          <div class="slide-navigation">
            <div class="slide-counter" id="slideCounter">— / —</div>
            <button class="btn btn-secondary" id="prevSlideBtn" disabled>
              <i class="fas fa-chevron-left"></i> Prec
            </button>
            <button class="btn btn-primary" id="nextSlideBtn" disabled>
              Succ <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <!-- Chart -->
          <div class="chart-container">
            <canvas id="resultsChart"></canvas>
          </div>

          <!-- Azioni -->
          <button class="btn btn-danger" id="stopPresentationBtn" disabled style="width: 100%;">
            <i class="fas fa-stop-circle"></i> Ferma Presentazione
          </button>
        </div>
      </aside>
    </div>
  </div>

  <script type="module">
    // ===================================================================================
    // Presenter app: Gestisce Presentazioni (multiple slides)
    // ===================================================================================
    // Assicurati che il tuo file firebase.js esporti correttamente auth, onAuthStateChanged, logoutUser, db, doc, setDoc, collection, onSnapshot, getDocs, updateDoc, getDoc
    import { auth, onAuthStateChanged, logoutUser, db, doc, setDoc, collection, onSnapshot, getDocs, updateDoc, getDoc } from "./firebase.js";
    import { Chart } from "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";

    let currentResponsesUnsub = null;
    let livePresentationStatusUnsub = null; // Nuovo listener per lo stato live
    let currentChart = null;
    let allPresentations = []; // Tutte le presentazioni caricate nella lobby
    let livePresentationData = null; // Dati completi della presentazione attualmente live
    let livePresentationId = null; // ID della presentazione attualmente live
    let liveSlideIndex = -1; // Indice della slide corrente della presentazione live
    let uniquePlayers = new Set(); // Per contare i giocatori unici

    // Elementi UI
    const lobbyView = document.getElementById('lobbyView');
    const liveView = document.getElementById('liveView');
    const pinDisplay = document.getElementById('pinDisplay');
    const liveTitle = document.getElementById('liveTitle');
    const liveQuestion = document.getElementById('liveQuestion');
    const slideCounter = document.getElementById('slideCounter');
    const responseCountEl = document.getElementById('responseCount'); // Aggiunto elemento per il conteggio risposte
    const playerCountEl = document.getElementById('playerCount');     // Aggiunto elemento per il conteggio giocatori
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');
    const stopPresentationBtn = document.getElementById('stopPresentationBtn');
    const presentationListEl = document.getElementById('presentationList');
    const refreshBtn = document.getElementById('refreshBtn'); // Pulsante refresh
    const logoutBtn = document.getElementById('logoutBtn');   // Pulsante logout

    // === FUNZIONI PER FULLSCREEN ===
    function enterFullScreen() {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }

    function exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
    // =======================================

    // Protezione pagina e inizializzazione
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = 'login.html';
      } else {
        // Inizializza il listener per lo stato live all'avvio.
        // Questo popolerà livePresentationId e liveSlideIndex.
        listenForLivePresentationStatus();
        // Poi carica la lista delle presentazioni. Verrà richiamata anche dal listener per aggiornamenti.
        loadPresentations();
      }
    });

    // Event Listener per Logout
    logoutBtn.addEventListener('click', async () => {
      if (livePresentationId) {
        // Se c'è una presentazione live, fermala prima di fare il logout
        await setDoc(doc(db, "status", "livePresentation"), { activeId: null, currentSlide: -1, pin: null });
      }
      await logoutUser();
      window.location.href = 'login.html';
    });

    // Event Listener per Refresh
    refreshBtn.addEventListener('click', () => {
      refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Aggiorna';
      loadPresentations(); // Ricarica la lista delle presentazioni dalla lobby
      setTimeout(() => {
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Aggiorna';
      }, 1000);
    });

    // === NUOVA FUNZIONE: Aggiorna tutta l'UI del pannello live e gestisce le viste ===
    function updatePresenterUI() {
      // Resetta i valori di default
      pinDisplay.textContent = '——————';
      liveTitle.textContent = '—';
      liveQuestion.textContent = '—';
      slideCounter.textContent = '— / —';
      responseCountEl.textContent = '0';
      playerCountEl.textContent = '0';
      prevSlideBtn.disabled = true;
      nextSlideBtn.disabled = true;
      stopPresentationBtn.disabled = true;

      if (livePresentationId && livePresentationData) {
        // Presentazione live attiva
        liveView.classList.remove('hidden');
        lobbyView.classList.add('hidden');
        document.body.classList.add('live-active');
        enterFullScreen();

        pinDisplay.textContent = livePresentationData.pin || '......';
        liveTitle.textContent = livePresentationData.title;
        stopPresentationBtn.disabled = false;

        if (liveSlideIndex !== -1 && livePresentationData.slides && livePresentationData.slides[liveSlideIndex]) {
          const currentSlide = livePresentationData.slides[liveSlideIndex];
          liveQuestion.textContent = currentSlide.question;
          slideCounter.textContent = `Slide ${liveSlideIndex + 1} / ${livePresentationData.slides.length}`;
          prevSlideBtn.disabled = (liveSlideIndex === 0);
          nextSlideBtn.disabled = (liveSlideIndex === livePresentationData.slides.length - 1);
        } else {
          liveQuestion.textContent = '—';
          slideCounter.textContent = '— / —';
        }

      } else {
        // Nessuna presentazione live
        liveView.classList.add('hidden');
        lobbyView.classList.remove('hidden');
        document.body.classList.remove('live-active');
        exitFullScreen();

        // Reset del chart quando non c'è una presentazione live
        if (currentChart) {
          currentChart.data.labels = [];
          currentChart.data.datasets[0].data = [];
          currentChart.update();
        }
      }
    }

    // === NUOVA FUNZIONE: Listener globale per lo stato della presentazione live ===
    function listenForLivePresentationStatus() {
      if (livePresentationStatusUnsub) livePresentationStatusUnsub(); // Disattiva il listener precedente se esiste

      const liveDocRef = doc(db, "status", "livePresentation");
      livePresentationStatusUnsub = onSnapshot(liveDocRef, async (docSnap) => {
        const statusData = docSnap.exists() ? docSnap.data() : {};
        const activeId = statusData.activeId || null;
        const currentSlide = statusData.currentSlide !== undefined ? statusData.currentSlide : -1;
        const pin = statusData.pin || null;

        if (activeId) {
          // C'è una presentazione live
          if (livePresentationId !== activeId) {
            // La presentazione live è cambiata o è la prima volta che viene rilevata
            const presentationSnap = await getDoc(doc(db, "presentations", activeId));
            if (presentationSnap.exists()) {
              livePresentationData = { id: presentationSnap.id, ...presentationSnap.data(), pin: pin };
              livePresentationId = activeId;
            } else {
              console.error("Presentazione attiva non trovata nella collezione 'presentations'.");
              // Resetta lo stato live se il documento della presentazione è mancante
              livePresentationData = null;
              livePresentationId = null;
              liveSlideIndex = -1;
              showToast('La presentazione attiva non è stata trovata. Stato live resettato.', 'error');
              await setDoc(doc(db, "status", "livePresentation"), { activeId: null, currentSlide: -1, pin: null }); // Forzo il reset nel DB
              return; // Esci per non continuare con dati inconsistenti
            }
          }
          liveSlideIndex = currentSlide;
          livePresentationData.pin = pin; // Assicurati che il pin sia sempre aggiornato

          // Avvia o riavvia il listener delle risposte per la slide live corrente
          if (livePresentationData && liveSlideIndex !== -1 && livePresentationData.slides && livePresentationData.slides[liveSlideIndex]) {
            const slide = livePresentationData.slides[liveSlideIndex];
            startResponsesListener(livePresentationId, liveSlideIndex, slide.answers, slide.type);
          } else {
            // Se i dati della slide non sono validi, ferma il listener delle risposte
            if (currentResponsesUnsub) {
              currentResponsesUnsub();
              currentResponsesUnsub = null;
            }
            uniquePlayers.clear();
            responseCountEl.textContent = '0';
            playerCountEl.textContent = '0';
            if (currentChart) {
                currentChart.data.labels = [];
                currentChart.data.datasets[0].data = [];
                currentChart.update();
            }
          }

        } else {
          // Nessuna presentazione live attiva
          if (livePresentationId) { // Se prima c'era una live, ora non c'è più
            showToast('La presentazione live è terminata.', 'warning');
          }
          livePresentationData = null;
          livePresentationId = null;
          liveSlideIndex = -1;
          uniquePlayers.clear();
          
          if (currentResponsesUnsub) { // Ferma l'ascolto delle risposte
            currentResponsesUnsub();
            currentResponsesUnsub = null;
          }
        }
        
        // Aggiorna l'interfaccia utente in base allo stato globale
        updatePresenterUI();
        // Ricarica la lista delle presentazioni per aggiornare i badge "LIVE" e i pulsanti
        loadPresentations();
      });
    }

    // Carica la lista delle presentazioni (nel pannello sinistro)
    async function loadPresentations() {
      presentationListEl.innerHTML = '<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><p>Caricamento...</p></div>';
      try {
        const snapshot = await getDocs(collection(db, "presentations"));
        allPresentations = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

        if (allPresentations.length === 0) {
          presentationListEl.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-folder-open"></i>
              <p>Nessuna presentazione disponibile</p>
              <small>Contatta l'admin per creare nuove presentazioni</small>
            </div>
          `;
          return;
        }
        
        presentationListEl.innerHTML = allPresentations.map(p => {
          const isLive = p.id === livePresentationId;
          return `
            <div class="presentation-item">
              <div class="presentation-info">
                <strong>${p.title}</strong>
                <small>
                  <i class="fas fa-layer-group"></i> ${(p.slides || []).length} slide
                  ${isLive ? '<span class="status-badge status-live"><i class="fas fa-circle"></i> LIVE</span>' : ''}
                </small>
              </div>
              <button class="btn ${isLive ? 'btn-success' : 'btn-primary'} btn-sm" 
                      data-id="${p.id}" 
                      ${isLive ? 'disabled' : ''}
                      onclick="window.launchPresentation('${p.id}')">
                <i class="fas fa-${isLive ? 'eye' : 'play'}"></i>
                ${isLive ? 'In corso' : 'Lancia'}
              </button>
            </div>
          `;
        }).join('');

        // Ho modificato l'assegnazione di onclick per evitare problemi di closure con loop.
        // Assicurati che window.launchPresentation sia definita globalmente, o gestisci con addEventListener.
        // Ho lasciato window.launchPresentation per compatibilità con il tuo codice originale.
        presentationListEl.querySelectorAll('button[data-id][onclick^="window.launchPresentation"]').forEach(btn => {
          if (!btn.disabled) { // Aggiungi l'event listener solo se il pulsante non è disabilitato
            btn.onclick = () => window.launchPresentation(btn.dataset.id);
          }
        });

      } catch (err) {
        console.error("Errore nel caricare le presentazioni:", err);
        presentationListEl.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <p style="color: var(--danger);">Errore nel caricamento</p>
          </div>
        `;
        showToast('Errore nel caricare le presentazioni', 'error');
      }
    }

    // Lancia una presentazione (aggiorna solo il documento di stato live)
    window.launchPresentation = async function(id) {
      try {
        const selectedPresentation = allPresentations.find(p => p.id === id);
        if (!selectedPresentation) {
          showToast('Presentazione non trovata', 'error');
          return;
        }
        
        if (!selectedPresentation.slides || selectedPresentation.slides.length === 0) {
          showToast('Questa presentazione non ha slide', 'warning');
          return;
        }
        
        const pin = (Math.floor(Math.random() * 900000) + 100000).toString();
        
        // Aggiorna il documento di stato live centrale. Questo attiverà il listener onSnapshot.
        await setDoc(doc(db, "status", "livePresentation"), { 
          activeId: id, 
          currentSlide: 0,
          pin: pin 
        });
        
        showToast('Presentazione lanciata con successo!', 'success');
      } catch (err) {
        console.error("Errore durante il lancio:", err);
        showToast('Errore nel lanciare la presentazione', 'error');
      }
    };

    // Naviga a una slide specifica (index) (aggiorna solo il documento di stato live)
    async function goToSlide(index) {
      try {
        if (!livePresentationData || !livePresentationData.slides) return;
        if (index < 0 || index >= livePresentationData.slides.length) return;
        
        // Aggiorna solo la slide corrente nel documento di stato live centrale.
        await updateDoc(doc(db, "status", "livePresentation"), { 
          currentSlide: index 
        });
        // Il listener onSnapshot su "status/livePresentation" gestirà il resto.
      } catch (err) {
        console.error("Errore nel cambiare slide:", err);
        showToast('Errore nel cambiare slide', 'error');
      }
    }

    // Ferma la presentazione (aggiorna solo il documento di stato live a null)
    stopPresentationBtn.addEventListener('click', async () => {
      if (!confirm('Vuoi davvero fermare la presentazione?')) return;
      
      try {
        // Imposta activeId a null per terminare la presentazione
        await setDoc(doc(db, "status", "livePresentation"), { activeId: null, currentSlide: -1, pin: null });
        showToast('Presentazione terminata con successo', 'success');
      } catch (err) {
        console.error("Errore durante lo stop:", err);
        showToast('Errore nel fermare la presentazione', 'error');
      }
    });

    // Listener bottoni navigazione
    prevSlideBtn.addEventListener('click', () => goToSlide(liveSlideIndex - 1));
    nextSlideBtn.addEventListener('click', () => goToSlide(liveSlideIndex + 1));


    // Responses listener and chart
    function startResponsesListener(presentationId, slideIndex, answers, slideType) {
      if (currentResponsesUnsub) {
        currentResponsesUnsub();
        currentResponsesUnsub = null;
      }
      uniquePlayers.clear(); // Resetta i giocatori unici

      const answerLabels = answers.map((ans, i) => ans); // Usa direttamente le risposte come label
      let bgColors = ['#7c3aed','#5b21b6','#a855f7','#d8b4fe'];

      if (slideType === 'quiz') {
        const correctIndex = livePresentationData.slides[slideIndex].correctIndex;
        if (correctIndex !== undefined && correctIndex >= 0 && correctIndex < answers.length) {
          bgColors = new Array(answers.length).fill('rgba(124, 58, 237, 0.6)'); // Colore standard più tenue
          bgColors[correctIndex] = '#10b981'; // Verde per la corretta
        }
      }

      const ctx = document.getElementById('resultsChart');
      if (!ctx) return;

      if (!currentChart) {
        currentChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: answerLabels,
            datasets: [{ 
              label: 'Risposte', 
              data: new Array(answers.length).fill(0), 
              backgroundColor: bgColors 
            }]
          },
          options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            scales: { 
              y: { 
                beginAtZero: true, 
                ticks: { color: 'var(--text-muted)', stepSize: 1 }, // Adatta al tema
                grid: { color: 'var(--border-light)' } // Adatta al tema
              }, 
              x: { 
                ticks: { color: 'var(--text-muted)' }, // Adatta al tema
                grid: { display: false }
              } 
            },
            plugins: { 
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                cornerRadius: 8
              }
            },
            animation: { duration: 500 }
          }
        });
      } else {
        currentChart.data.labels = answerLabels;
        currentChart.data.datasets[0].data = new Array(answers.length).fill(0);
        currentChart.data.datasets[0].backgroundColor = bgColors;
        currentChart.update();
      }

      const responsesCol = collection(db, 'presentations', presentationId, 'responses');
      currentResponsesUnsub = onSnapshot(responsesCol, (snapshot) => {
        const counts = new Array(answers.length).fill(0);
        uniquePlayers.clear(); // Resetta per ogni aggiornamento

        snapshot.docs.forEach(d => {
          const data = d.data();
          if (data?.slide === slideIndex && typeof data?.answer === 'number' && counts[data.answer] !== undefined) {
            counts[data.answer]++;
          }
          if (data?.playerId) { // Assumi che ogni risposta abbia un playerId per identificare i giocatori unici
            uniquePlayers.add(data.playerId);
          }
        });
        currentChart.data.datasets[0].data = counts;
        currentChart.update();
        
        // Aggiorna i conteggi di risposte e giocatori nell'UI
        responseCountEl.textContent = snapshot.docs.filter(d => d.data()?.slide === slideIndex).length;
        playerCountEl.textContent = uniquePlayers.size;
      });
    }

    // === Toast notifications ===
    function showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
      toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
      `;
      
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  </script> 
</body>
</html>
