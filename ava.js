const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'fr-FR';
recognition.interimResults = false;

let isListening = true;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

function handleCommand(command) {
  command = command.toLowerCase();
  if (!command.includes("ava")) return;

  const said = command.replace("ava", "").trim();

  if (said.includes("heure")) {
    const now = new Date();
    speak(`Il est ${now.getHours()} heures et ${now.getMinutes()} minutes`);
  } else if (said.includes("jour")) {
    const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    speak(`Nous sommes le ${today}`);
  } else if (said.includes("blague")) {
    speak("Pourquoi les poissons détestent l’ordinateur ? Parce qu’ils ont peur du net.");
  } else if (said.includes("répète")) {
    const toRepeat = said.replace("répète", "").trim();
    speak(toRepeat);
  } else if (said.includes("nom")) {
    speak("Tu t'appelles Dylan !");
  } else {
    speak("Je n'ai pas compris la commande.");
  }
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  console.log("Transcrit :", transcript);
  handleCommand(transcript);
};

recognition.onerror = (event) => {
  console.error("Erreur :", event.error);
  if (event.error === 'not-allowed') {
    document.getElementById("status").textContent = "❌ Micro non autorisé.";
  }
};

recognition.onend = () => {
  if (isListening) {
    console.log("Redémarrage de l'écoute...");
    recognition.start(); // Redémarre automatiquement
  }
};

// Démarrage initial
recognition.start();
