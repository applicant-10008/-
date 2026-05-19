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

const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-H4GRHD7XM7';
document.head.appendChild(gtagScript);

window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

gtag('js', new Date());
gtag('config', 'G-H4GRHD7XM7');
