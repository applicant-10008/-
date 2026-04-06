const headerAudio = document.getElementById('header-audio');
const audioToggle = document.getElementById('audio-toggle');
const audioIcon = audioToggle.querySelector('img');

audioToggle.addEventListener('click', () => {
	if (headerAudio.paused) {
	headerAudio.play();
	audioIcon.src = '/-/images/pause.svg';
	audioToggle.setAttribute('aria-label', 'Pause audio');
	} else {
	headerAudio.pause();
	audioIcon.src = '/-/images/play.svg';
	audioToggle.setAttribute('aria-label', 'Play audio');
	}
	});

headerAudio.addEventListener('ended', () => {
audioIcon.src = '/-/images/play.svg';
audioToggle.setAttribute('aria-label', 'Play audio');
	});

	// Prevent right-click on the hidden audio element
	headerAudio.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	return false;
	});
