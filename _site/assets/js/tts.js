let utterance;
let isSpeaking = false;
let isPaused = false;

function toggleRead() {
  const btn = document.getElementById('tts-btn');
  const target = document.querySelector('.tts-target');

  if (!target) {
    alert("No readable content found.");
    return;
  }

  if (!isSpeaking) {
    const text = target.innerText;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
    isSpeaking = true;
    isPaused = false;
    btn.innerText = '⏸ Pause Reading';

    utterance.onend = () => {
      isSpeaking = false;
      isPaused = false;
      btn.innerText = '🔊 Listen to this';
    };
  } else if (!isPaused) {
    speechSynthesis.pause();
    isPaused = true;
    btn.innerText = '▶️ Resume Reading';
  } else {
    speechSynthesis.resume();
    isPaused = false;
    btn.innerText = '⏸ Pause Reading';
  }
}
