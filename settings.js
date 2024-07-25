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
