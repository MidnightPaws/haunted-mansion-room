const context = new (window.AudioContext || window.webkitAudioContext)();
var mistakeCounter = 0;
function playSound(frequency) {
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.37);
}

const keys = document.querySelectorAll('.white-key, .black-key');

const expectedNotes = ['D', 'E', 'F', 'G', 'C2', 'A', 'B', 'G', 'C2'];
let currentIndex = 0;  

function checkNotePlayed(playedNote) {
    if (playedNote === expectedNotes[currentIndex]) {
        currentIndex++;
        if (currentIndex === expectedNotes.length) {
            alert('You win!');

            currentIndex = 0; 

        }
    } else {
        alert('Wrong note! Start again.');
        currentIndex = 0; 
        mistakeCounter++;
        fetch('/user_did_mistake')
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(data => {
          console.log(data); // Log the response from the server
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
}

keys.forEach(key => {
    key.addEventListener('click', function() {
        const note = this.getAttribute('data-note');
        let frequency;

        switch(note) {
            case 'C': frequency = 261.63; break;
            case 'C#': frequency = 277.18; break;
            case 'D': frequency = 293.66; break;
            case 'D#': frequency = 311.13; break;
            case 'E': frequency = 329.63; break;
            case 'F': frequency = 349.23; break;
            case 'F#': frequency = 369.99; break;
            case 'G': frequency = 392.00; break;
            case 'G#': frequency = 415.30; break;
            case 'A': frequency = 440.00; break;
            case 'A#': frequency = 466.16; break;
            case 'B': frequency = 493.88; break;
            case 'C2': frequency = 523.25; break;
        }

        playSound(frequency);
        checkNotePlayed(note);
    });
});
