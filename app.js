const container = document.querySelector(".container");
const title = document.querySelector(".title");
const cover = document.querySelector(".cover");
const start = document.querySelector('.start')
const end = document.querySelector('.end')
const proccessContainer = document.querySelector(".proccess-container");
const proccess = document.querySelector(".proccess");
const audio = document.querySelector(".audio");
const prewBtn = document.querySelector(".prew");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const voiceRange = document.querySelector('.voice-range')

voiceRange.addEventListener('input', ()=> {
    audio.volume =  voiceRange.value / 100
})


const songs = [
  "Alan Walker - Faded",
  "Ampyx - Rise",
  "Bass music",
  "Enrique Iglases - Ring my bells",
  "Eric Saade feat. Gustav Noren, Filatov & Karas - Wide Awake (Red Mix)",
  "Isak Danielson - Ending",
  "Jo Cohen & Sex Whales - We Are [NCS Release]",
  "Ludovico Einaudi - Experience",
  "Minelli - Rampampam",
  "MiyaGi & Эндшпиль - I Got Love",
  "Nathan Goshan - Think about",
  "Nekozilla [NCS Release] - Different Heaven",
  "Roykskop - Here come the shown",
  "Syn Cole - Feel Good [NCS Release]",
  "Tobu & Itro - Sunburst [NCS Release]",
  "Zubi & Anatu - Sugar (Cricket & Avaxus Remix)",
];

let currentSong = 0;

// FUNCTIONS
playSong(songs[currentSong]);

function playSong(song) {
  title.textContent = song;
  audio.src = `audio/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playMusic() {
  const isPlay = container.classList.contains("play");

  if (!isPlay) {
    play();
  } else {
    pause();
  }

  function play() {
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    container.classList.add("play");
    audio.play();
  }

  function pause() {
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    container.classList.remove("play");
    audio.pause();
  }
}

function prewMusic() {
    currentSong--;
  
    if(currentSong < 0) {
      currentSong = songs.length - 1
  }
  
    playSong(songs[currentSong]);
    audio.play();
  }

function nextMusic() {
  currentSong++;

  if(currentSong > songs.length - 1) {
    currentSong = 0
}

  playSong(songs[currentSong]);
  audio.play();
}

function proccessFunc(e) {
    const duration = e.srcElement.duration
    const currentTime = audio.currentTime
    const widthProcces = (currentTime / e.target.duration) * 100
    proccess.style.width = `${widthProcces}%`

    const endMinutes = Math.floor(duration / 60)
    const endSecondes = Math.floor(duration % 60)
    end.textContent = `${endMinutes}: ${(endSecondes < 10 ? '0' + endSecondes : endSecondes)}`

    // Start
    const startMinutes = Math.floor(currentTime / 60)
    const startSecondes = Math.floor(currentTime % 60)
    start.textContent = `${startMinutes < 10 ? '0' + startMinutes : startMinutes}: ${(startSecondes < 10 ? '0' + startSecondes : startSecondes)}`
}

function changeTimeStep(e) {
    audio.currentTime = (e.offsetX / this.offsetWidth) * audio.duration
}

// EVENTS
prewBtn.addEventListener("click", prewMusic);
playBtn.addEventListener("click", playMusic);
nextBtn.addEventListener("click", nextMusic);
audio.addEventListener("timeupdate", proccessFunc);
audio.addEventListener("ended", nextMusic);
proccessContainer.addEventListener("click", changeTimeStep);

