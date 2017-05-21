// Save needed elements to variables
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.player__controls .progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.player__controls .toggle');
const ranges = player.querySelectorAll('.player__controls input[type="range"]');
const skipButtons = player.querySelectorAll('[data-skip]');




// Functions
function togglePlay (e){

  e.preventDefault();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleIcon (e) {
  e.preventDefault();
  let icon;
  if (!this.paused) {
     icon = "❚ ❚"
  } else {
     icon = "►"
  }
  toggleButton.textContent = icon;
}

function skipTime (e) {
  e.preventDefault();
   video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate (e) {
  e.preventDefault();
  video[this.name] = this.value;
}

function handleProgress (e) {
  const percent = (video.currentTime/video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
  const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


//Attach elements to listeners
video.addEventListener('click', togglePlay);
video.addEventListener('pause', toggleIcon);
video.addEventListener('play', toggleIcon);
toggleButton.addEventListener('click', togglePlay);
skipButtons.forEach (skip => {
  skip.addEventListener('click', skipTime);
});
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
});
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


// ► ❚ ❚
