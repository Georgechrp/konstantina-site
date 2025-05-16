let isSpeaking = false;
let utterance;

function toggleRead() {
  const btn = document.getElementById('tts-btn');

  if (!isSpeaking) {
    const text = document.querySelector('.about-text').innerText;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
    isSpeaking = true;
    btn.innerText = '⏹ Stop Reading';

    utterance.onend = () => {
      isSpeaking = false;
      btn.innerText = '🔊 Listen to this';
    };
  } else {
    speechSynthesis.cancel();
    isSpeaking = false;
    btn.innerText = '🔊 Listen to this';
  }
}
