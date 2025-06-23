const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'fr-FR';
recognition.interimResults = false;

let isListening = true;
let isRestarting = false;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  synth.speak(utterance);
}

function handleCommand(command) {
  command = command.toLowerCase();

  if (!command.includes("ava")) return;

  const cleanCommand = command.replace("ava", "").trim();

  if (cleanCommand.includes("heure")) {
    const now = new Date();
    speak(`Il est ${now.getHours()} heures et ${now.getMinutes()} minutes.`);
  } else if (cleanCommand.includes("jour")) {
    const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    speak(`Nous sommes le ${today}`);
  } else if (cleanCommand.includes("blague")) {
    speak("Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau !");
  } else if (cleanCommand.includes("répète")) {
    const toRepeat = cleanCommand.replace("répète", "").trim();
    if (toRepeat.length > 0) {
      speak(toRepeat);
    } else {
      speak("Répéter quoi ?");
    }
  } else if (cleanCommand.includes("nom")) {
    speak("Tu t'appelles Dylan !");
  } else if (cleanCommand.includes("stop")) {
    isListening = false;
    speak("D'accord, j'arrête de t'écouter.");
    recognition.stop();
  } else {
    speak("Je n'ai pas compris ta commande.");
  }
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim();
  console.log("📢 Commande reconnue :", transcript);
  handleCommand(transcript);
};

recognition.onerror = (event) => {
  console.error("❌ Erreur :", event.error);
  document.getElementById("status").textContent = "Erreur micro : " + event.error;
};

recognition.onend = () => {
  if (isListening && !isRestarting) {
    isRestarting = true;
    setTimeout(() => {
      isRestarting = false;
      recognition.start();
    }, 500); // Anti-boucle
  }
};

// Lancement automatique
recognition.start();

