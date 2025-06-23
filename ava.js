// Script JS basique pour activer écoute vocale
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = function(event) {
  const phrase = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  if (phrase.includes("ava")) {
    speak("Oui Dylan, je t'écoute.");
  } else if (phrase.includes("mode réunion")) {
    speak("Mode réunion activé.");
  } else if (phrase.includes("silence")) {
    speak("D'accord, je me tais.");
  }
};

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  synth.speak(utterance);
}

recognition.start();