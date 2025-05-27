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
    speechSynthesis.cancel();

    const text = target.innerText;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
    isSpeaking = true;
    isPaused = false;
    btn.innerText = '⏸';

    utterance.onend = () => {
      isSpeaking = false;
      isPaused = false;
      btn.innerText = '🔊 ';
    };
  } else if (!isPaused) {
    speechSynthesis.pause();
    isPaused = true;
    btn.innerText = '▶️ ';
  } else {
    speechSynthesis.resume();
    isPaused = false;
    btn.innerText = '⏸ ';
  }
}

window.addEventListener('beforeunload', () => {
  speechSynthesis.cancel();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    speechSynthesis.cancel();
    isSpeaking = false;
    isPaused = false;
    const btn = document.getElementById('tts-btn');
    if (btn) btn.innerText = '🔊 Listen to this';
  }
});
