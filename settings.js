document.addEventListener('DOMContentLoaded', () => {
    const savedDifficulty = localStorage.getItem('difficulty') || 'easy';
    const savedMusicToggle = localStorage.getItem('music-toggle') === 'true';

    document.getElementById('difficulty').value = savedDifficulty;
    document.getElementById('music-toggle').checked = savedMusicToggle;
});

function saveSettings() {
    const difficulty = document.getElementById('difficulty').value;
    const musicToggle = document.getElementById('music-toggle').checked;

    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('music-toggle', musicToggle);

    alert('Settings saved!');
}

function goBack() {
    window.location.href = 'index.html';
}

// click sound effect

const audio_button_set = new Audio("ASSETS/click-sound.mp3"); 

const buttons_all_set = Array.from(document.getElementsByClassName("button-50"));

buttons_all_set.forEach(button => {
  button.addEventListener("click", () => {
    audio_button_set.play();
  });
});