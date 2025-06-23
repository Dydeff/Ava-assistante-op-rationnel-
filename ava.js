window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';
recognition.continuous = false;
recognition.interimResults = false;

document.getElementById("btn").addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  alert("Tu as dit : " + transcript);

  if (transcript.includes("ava")) {
    alert("Commande Ava détectée !");
  }
};

recognition.onerror = function(event) {
  alert("Erreur : " + event.error);
};
