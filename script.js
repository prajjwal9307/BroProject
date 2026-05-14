// ── Instructions Array ──────────────────────────────────────────────────────
const instructions = [
  "Welcome! This guide will walk you through each step clearly and carefully. Let's begin.",
  "Before you start, make sure your workspace is clean, well-lit, and free of distractions.",
  "Gather all the materials and tools you will need before starting the process.",
  "Read through all the instructions completely at least once before taking any action.",
  "Always wear appropriate safety gear, such as gloves or goggles, when required.",
  "Begin with the first step and complete it fully before moving on to the next one.",
  "Work slowly and carefully. Rushing increases the chance of making mistakes.",
  "If you encounter an error, stop immediately and review the previous steps.",
  "Double-check your progress against the guide after completing each major step.",
  "Keep your work area organized. Place tools back in their proper location after use.",
  "If you need to take a break, make sure your work is in a safe, stable state first.",
  "Refer to diagrams or visual aids whenever available to verify your progress.",
  "Ask for help if you are unsure about any step. It is better to ask than to guess.",
  "Once all steps are complete, review the final result against the expected outcome.",
  "Congratulations! You have successfully completed all 15 instructions. Well done!"
];

// ── State ───────────────────────────────────────────────────────────────────
let current = 0;

// ── DOM References ──────────────────────────────────────────────────────────
const card            = document.getElementById('card');
const instructionText = document.getElementById('instructionText');
const counter         = document.getElementById('counter');
const stepNum         = document.getElementById('stepNum');
const prevBtn         = document.getElementById('prevBtn');
const nextBtn         = document.getElementById('nextBtn');
const progressFill    = document.getElementById('progressFill');
const waveBar         = document.getElementById('waveBar');

// ── Render ──────────────────────────────────────────────────────────────────
function render(animate = true) {
  if (animate) {
    card.classList.add('fade-out');
    setTimeout(() => {
      updateDOM();
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
      setTimeout(() => card.classList.remove('fade-in'), 400);
    }, 300);
  } else {
    updateDOM();
  }
}

function updateDOM() {
  const total = instructions.length;
  instructionText.textContent = instructions[current];
  counter.textContent = `Instruction ${current + 1} / ${total}`;
  stepNum.textContent  = String(current + 1).padStart(2, '0');
  progressFill.style.width = `${((current + 1) / total) * 100}%`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;
}

// ── Navigation ──────────────────────────────────────────────────────────────
function next() {
  if (current < instructions.length - 1) {
    current++;
    render();
    setTimeout(() => speak(), 350);
  }
}

function prev() {
  if (current > 0) {
    current--;
    render();
    setTimeout(() => speak(), 350);
  }
}

// ── Text-to-Speech ──────────────────────────────────────────────────────────
function speak() {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();           // stop any ongoing speech

  const utterance = new SpeechSynthesisUtterance(instructions[current]);
  utterance.rate   = 0.92;                   // slightly slower = clearer
  utterance.pitch  = 1.0;
  utterance.volume = 1.0;

  // Prefer a natural English voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang.startsWith('en') && !v.name.toLowerCase().includes('google')
  ) || voices.find(v => v.lang.startsWith('en')) || null;
  if (preferred) utterance.voice = preferred;

  utterance.onstart = () => waveBar.classList.add('active');
  utterance.onend   = () => waveBar.classList.remove('active');
  utterance.onerror = () => waveBar.classList.remove('active');

  window.speechSynthesis.speak(utterance);
}

// ── Voices may load asynchronously ─────────────────────────────────────────
function init() {
  render(false);
  speak();
}

// Some browsers fire voiceschanged before DOMContentLoaded, some after
if (window.speechSynthesis) {
  if (window.speechSynthesis.getVoices().length > 0) {
    init();
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', init, { once: true });
    // Fallback if voiceschanged never fires
    setTimeout(() => {
      if (instructionText.textContent === '') init();
    }, 1000);
  }
} else {
  render(false);   // no TTS support — still render text
}

// ── Keyboard Shortcuts ──────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); speak(); }
});
