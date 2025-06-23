const synth = window.speechSynthesis;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  synth.speak(utterance);
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'fr-FR';
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Tu as dit :", transcript);

    if (transcript.includes("ava")) {
      speak("Oui, je t'écoute Dylan.");
    } else {
      speak("Je n'ai pas entendu le mot-clé.");
    }
  };

  recognition.onerror = function(event) {
    console.error("Erreur de reconnaissance vocale :", event.error);
  };

  recognition.onend = function() {
    setTimeout(() => {
      startListening(); // relance l'écoute après chaque fin
    }, 500);
  };

  recognition.start();
}

// Démarre l'écoute automatiquement au chargement
window.onload = () => {
  startListening();
};
