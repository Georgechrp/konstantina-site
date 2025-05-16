let utterance;
let isSpeaking = false;
let isPaused = false;

function toggleRead() {
  const btn = document.getElementById('tts-btn');

  // Αν δεν ξεκίνησε ποτέ
  if (!isSpeaking) {
    const text = document.querySelector('.about-text').innerText;
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
    // Αν μιλάει, κάνε pause
    speechSynthesis.pause();
    isPaused = true;
    btn.innerText = '▶️ Resume Reading';
  } else {
    // Αν είναι paused, κάνε resume
    speechSynthesis.resume();
    isPaused = false;
    btn.innerText = '⏸ Pause Reading';
  }
}

function stopReading() {
  speechSynthesis.cancel();
  isSpeaking = false;
  isPaused = false;
  const btn = document.getElementById('tts-btn');
  btn.innerText = '🔊 Listen to this';
}
