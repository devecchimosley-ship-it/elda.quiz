// ===================================================================================
// Presenter app: Gestisce Presentazioni (multiple slides)
// ===================================================================================
import { auth, onAuthStateChanged, logoutUser, db, doc, setDoc, collection, onSnapshot, getDocs, updateDoc, getDoc } from "./firebase.js";
import { Chart } from "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";

let currentResponsesUnsub = null;
let currentChart = null;
let allPresentations = [];
let livePresentationData = null; // Contiene i dati della presentazione live
let livePresentationId = null;
let liveSlideIndex = -1;

// Elementi UI
const lobbyView = document.getElementById('lobbyView');
const liveView = document.getElementById('liveView');
const pinDisplay = document.getElementById('pinDisplay');
const liveTitle = document.getElementById('liveTitle');
const liveQuestion = document.getElementById('liveQuestion');
const slideCounter = document.getElementById('slideCounter');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');
const stopPresentationBtn = document.getElementById('stopPresentationBtn');
const presentationListEl = document.getElementById('presentationList');

// === NUOVE FUNZIONI PER FULLSCREEN ===
function enterFullScreen() {
  const elem = document.documentElement; // Usa l'intero <html>
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

// Protezione pagina
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = 'login.html';
  else loadPresentations();
});

document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  await logoutUser();
  window.location.href = 'login.html';
});

// Carica la lista delle presentazioni
async function loadPresentations() {
  presentationListEl.innerHTML = '<em>Caricamento...</em>';
  const snapshot = await getDocs(collection(db, "presentations"));
  allPresentations = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

  if (allPresentations.length === 0) {
    presentationListEl.innerHTML = '<em>Nessuna presentazione creata dall\'Admin.</em>';
    return;
  }
  
  presentationListEl.innerHTML = allPresentations.map(p => `
    <div class="quiz-item">
      <div style="flex:1">
        <strong>${p.title}</strong><br/>
        <small style="opacity:0.85">${(p.slides || []).length} slides</small>
      </div>
      <div style="display:flex;gap:0.4rem">
        <button class="btn ghost" data-id="${p.id}" data-action="launch" 
          ${p.status === 'live' ? 'style="background:#3b82f6;color:white;"' : ''}>
          ${p.status === 'live' ? 'Live' : 'Lancia'}
        </button>
      </div>
    </div>
  `).join('');

  presentationListEl.querySelectorAll('button[data-action="launch"]').forEach(btn => {
    btn.addEventListener('click', () => launchPresentation(btn.dataset.id));
  });
}

// Lancia una presentazione
async function launchPresentation(id) {
  livePresentationData = allPresentations.find(p => p.id === id);
  if (!livePresentationData) return alert('Presentazione non trovata.');
  livePresentationId = id;
  
  const pin = (Math.floor(Math.random() * 900000) + 100000).toString();
  await updateDoc(doc(db, "presentations", id), { status: 'live', pin: pin });
  
  pinDisplay.textContent = pin;
  liveTitle.textContent = livePresentationData.title;

  await goToSlide(0); 
  
  // === MODIFICA: Scambia le viste E VAI FULLSCREEN ===
  lobbyView.classList.add('hidden');
  liveView.classList.remove('hidden');
  document.body.classList.add('live-active'); // Aggiunge la classe al body
  enterFullScreen(); // Attiva il fullscreen
  // ================================================
}

// Naviga a una slide specifica (index)
async function goToSlide(index) {
  if (!livePresentationData || !livePresentationData.slides) return;
  if (index < 0 || index >= livePresentationData.slides.length) return;
  
  liveSlideIndex = index;

  await setDoc(doc(db, "status", "livePresentation"), { 
    activeId: livePresentationId, 
    currentSlide: liveSlideIndex 
  });

  const currentSlideData = livePresentationData.slides[liveSlideIndex];
  liveQuestion.textContent = currentSlideData.question;
  slideCounter.textContent = `Slide ${liveSlideIndex + 1} / ${livePresentationData.slides.length}`;
  
  prevSlideBtn.disabled = (liveSlideIndex === 0);
  nextSlideBtn.disabled = (liveSlideIndex === livePresentationData.slides.length - 1);

  startResponsesListener(livePresentationId, liveSlideIndex, currentSlideData.answers, currentSlideData.type);
}

// Ferma la presentazione
stopPresentationBtn.addEventListener('click', async () => {
  if(livePresentationId) {
    await updateDoc(doc(db, "presentations", livePresentationId), { status: 'finished' });
  }
  await setDoc(doc(db, "status", "livePresentation"), { activeId: null, currentSlide: -1 });

  // Resetta UI
  pinDisplay.textContent = '—';
  liveTitle.textContent = '—';
  liveQuestion.textContent = '—';
  slideCounter.textContent = '— / —';
  livePresentationData = null;
  livePresentationId = null;
  liveSlideIndex = -1;
  
  if (currentResponsesUnsub) currentResponsesUnsub();
  if (currentChart) {
    currentChart.data.datasets[0].data = [];
    currentChart.update();
  }
  
  // === MODIFICA: Scambia le viste, ricarica la lobby E ESCI DAL FULLSCREEN ===
  await loadPresentations(); 
  liveView.classList.add('hidden');
  lobbyView.classList.remove('hidden');
  document.body.classList.remove('live-active'); // Rimuove la classe dal body
  exitFullScreen(); // Disattiva il fullscreen
  // ======================================================================
});

// Listener bottoni navigazione
prevSlideBtn.addEventListener('click', () => goToSlide(liveSlideIndex - 1));
nextSlideBtn.addEventListener('click', () => goToSlide(liveSlideIndex + 1));


// Responses listener and chart (Invariato)
function startResponsesListener(presentationId, slideIndex, answers, slideType) {
  const answerCount = answers.length;
  const answerLabels = answers.map((ans, i) => `Risp. ${i + 1}`); 
  let bgColors = ['#7c3aed','#5b21b6','#a855f7','#d8b4fe'];

  if (slideType === 'quiz') {
    const correctIndex = livePresentationData.slides[slideIndex].correctIndex;
    if (correctIndex >= 0) {
      bgColors = new Array(answerCount).fill('#7c3aed'); 
      bgColors[correctIndex] = '#10b981'; // Verde per la corretta
    }
  }

  if (currentResponsesUnsub) currentResponsesUnsub(); 

  const ctx = document.getElementById('resultsChart');
  if (!ctx) return;
  if (!currentChart) {
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: answerLabels,
        datasets: [{ 
          label: 'Risposte', 
          data: new Array(answerCount).fill(0), 
          backgroundColor: bgColors 
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        scales: { y: { beginAtZero: true, ticks: { color: '#e6e9ef', stepSize: 1 } }, x: { ticks: { color: '#e6e9ef' } } },
        plugins: { legend: { display: false } }
      }
    });
  } else {
    currentChart.data.labels = answerLabels;
    currentChart.data.datasets[0].data = new Array(answerCount).fill(0);
    currentChart.data.datasets[0].backgroundColor = bgColors; 
    currentChart.update();
  }

  const responsesCol = collection(db, 'presentations', presentationId, 'responses');
  currentResponsesUnsub = onSnapshot(responsesCol, (snapshot) => {
    const counts = new Array(answerCount).fill(0);
    snapshot.docs.forEach(d => {
      const data = d.data();
      if (data?.slide === slideIndex && typeof data?.answer === 'number' && counts[data.answer] !== undefined) {
        counts[data.answer]++;
      }
    });
    currentChart.data.datasets[0].data = counts;
    currentChart.update();
  });
}
