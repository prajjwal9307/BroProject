// ── Fixed Default Instructions ─────────────────────────

const defaultInstructions = [
  "Test Number 1",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",


  "Test Number 2",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",


  "Test Number 3",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",


  "Test Number 4",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",


  "Test Number 5",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 6",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 7",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 8",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 9",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",


  "Test Number 10",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 11",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",


  "Test Number 12",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 13",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 14",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

  "Test Number 15",
  "50% loading over Waiting period 2 minutes started",
  "75% loading over Waiting period 2 minutes started.",
  "90% loading over Waiting period 2 minutes started",
  "95% loading over Waiting period 2 minutes started",
  "100% loading over Waiting period 5 minutes started",

];

// ── Conversations Storage ──────────────────────────────

const conversations = {
  "Default Instructions": [...defaultInstructions]
};

// ── Current State ──────────────────────────────────────

let currentConversation = "Default Instructions";
let currentIndex = 0;

// ── DOM ────────────────────────────────────────────────

const instructionText =
  document.getElementById("instructionText");

const counter =
  document.getElementById("counter");

const progress =
  document.getElementById("progress");

const stepNumber =
  document.getElementById("stepNumber");

const wave =
  document.getElementById("wave");

// ── Toggle Panel ───────────────────────────────────────

function togglePanel(){

  document
    .getElementById("panel")
    .classList.toggle("show");
}

// ── Render Conversation Buttons ────────────────────────

function renderConversationList(){

  const container =
    document.getElementById("conversationList");

  container.innerHTML = "";

  for(let name in conversations){

    const div = document.createElement("div");

    div.className = "conversation-item";

    div.innerText = name;

    div.onclick = () => loadConversation(name);

    container.appendChild(div);
  }
}

// ── Load Conversation ──────────────────────────────────

function loadConversation(name){

  currentConversation = name;

  currentIndex = 0;

  renderInstruction();

  speakInstruction();
}

// ── Save New Conversation ──────────────────────────────

function saveConversation(){

  const title =
    document.getElementById("conversationTitle")
    .value.trim();

  const text =
    document.getElementById("instructionInput")
    .value.trim();

  if(!title || !text){

    alert("Enter title and instructions");

    return;
  }

  const lines = text
    .split("\n")
    .map(item => item.trim())
    .filter(item => item !== "");

  conversations[title] = lines;

  renderConversationList();

  document.getElementById("conversationTitle").value = "";

  document.getElementById("instructionInput").value = "";
}

// ── Render Instruction ─────────────────────────────────

function renderInstruction(){

  const list =
    conversations[currentConversation];

  instructionText.innerText =
    list[currentIndex];

  counter.innerText =
    `Instruction ${currentIndex + 1} / ${list.length}`;

  stepNumber.innerText =
    String(currentIndex + 1).padStart(2,"0");

  progress.style.width =
    ((currentIndex + 1) / list.length) * 100 + "%";
}

// ── Next ───────────────────────────────────────────────

function nextInstruction(){

  const list =
    conversations[currentConversation];

  if(currentIndex < list.length - 1){

    currentIndex++;

    renderInstruction();

    speakInstruction();
  }
}

// ── Previous ───────────────────────────────────────────

function prevInstruction(){

  if(currentIndex > 0){

    currentIndex--;

    renderInstruction();

    speakInstruction();
  }
}

// ── Speak ──────────────────────────────────────────────

function speakInstruction(){

  stopSpeech();

  const list =
    conversations[currentConversation];

  const utterance =
    new SpeechSynthesisUtterance(
      list[currentIndex]
    );

  utterance.rate = 0.95;

  utterance.onstart = () => {

    wave.classList.add("active");
  };

  utterance.onend = () => {

    wave.classList.remove("active");
  };

  speechSynthesis.speak(utterance);
}

// ── Stop ───────────────────────────────────────────────

function stopSpeech(){

  speechSynthesis.cancel();

  wave.classList.remove("active");
}

// ── TXT Upload ─────────────────────────────────────────

document
  .getElementById("fileInput")
  .addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

      document.getElementById(
        "instructionInput"
      ).value = event.target.result;
    };

    reader.readAsText(file);
});

// ── Keyboard Support ───────────────────────────────────

document.addEventListener("keydown",(e)=>{

  if(e.key === "ArrowRight"){

    nextInstruction();
  }

  if(e.key === "ArrowLeft"){

    prevInstruction();
  }

  if(e.key === " "){

    e.preventDefault();

    speakInstruction();
  }
});

// ── Initial Render ─────────────────────────────────────

renderConversationList();

renderInstruction();

speakInstruction();