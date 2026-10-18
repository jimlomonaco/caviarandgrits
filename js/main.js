
(function() {

	"use strict";

	const $body = document.querySelector('body');

	// canUse
	window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");
		const e = window._canUse.style, up = p.charAt(0).toUpperCase() + p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

	// Play initial animations on page load.
	window.addEventListener('load', function() {
		window.setTimeout(function() {
			$body.classList.remove('is-preload');
		}, 100);
	});

	// Slideshow Background.
	(function() {

		// Settings.
		const settings = {

			// Images (in the format of 'url': 'alignment').
			images: {
				'images/bgd01.jpg': 'center',
				'images/bgd02.jpg': 'center',
				'images/bgd03.jpg': 'center',
				'images/bgd04.jpg': 'center',
				'images/bgd05.jpg': 'center',
				'images/bgd06.jpg': 'center',
				'images/bgd07.jpg': 'center',
				'images/bgd08.jpg': 'center'
			},

			// Delay.
			delay: 6000

		};

		// Vars.
		let pos = 0, lastPos = 0,
			$wrapper, $bgs = [], $bg,
			k;

		// Create BG wrapper, BGs.
		$wrapper = document.createElement('div');
		$wrapper.id = 'bg';
		$body.appendChild($wrapper);

		for (k in settings.images) {

			// Create BG.
			$bg = document.createElement('div');
			$bg.style.backgroundImage = 'url("' + k + '")';
			$bg.style.backgroundPosition = settings.images[k];
			$wrapper.appendChild($bg);

			// Add it to array.
			$bgs.push($bg);

		}

		// Main loop.
		$bgs[pos].classList.add('visible');
		$bgs[pos].classList.add('top');

		// Bail if we only have a single BG or the client doesn't support transitions.
		if ($bgs.length === 1
			||	!canUse('transition'))
			return;

		window.setInterval(function() {

			lastPos = pos;
			pos++;

			// Wrap to beginning if necessary.
			if (pos >= $bgs.length)
				pos = 0;

			// Swap top images.
			$bgs[lastPos].classList.remove('top');
			$bgs[pos].classList.add('visible');
			$bgs[pos].classList.add('top');

			// Hide last image after a short delay.
			window.setTimeout(function() {
				$bgs[lastPos].classList.remove('visible');
			}, settings.delay / 2);

		}, settings.delay);

	})();

	// Signup Form.
	(function() {

		// Vars.
		let $form = document.querySelectorAll('#signup-form')[0],
			$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
			$message;

		// Bail if addEventListener isn't supported.
		if (!('addEventListener' in $form))
			return;

		// Message.
		$message = document.createElement('span');
		$message.classList.add('message');
		$form.appendChild($message);

		$message._show = function(type, text) {

			$message.innerHTML = text;
			$message.classList.add(type);
			$message.classList.add('visible');

			window.setTimeout(function() {
				$message._hide();
			}, 3000);

		};

		$message._hide = function() {
			$message.classList.remove('visible');
		};

		// Events.
		// Note: If you're *not* using AJAX, get rid of this event listener.
		$form.addEventListener('submit', function(event) {

			event.stopPropagation();
			event.preventDefault();

			// Hide message.
			$message._hide();

			// Disable submit.
			$submit.disabled = true;

			// Process form.
			// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
			// but there's enough here to piece together a working AJAX submission call that does.
			window.setTimeout(function() {

				// Reset form.
				$form.reset();

				// Enable submit.
				$submit.disabled = false;

				// Show message.
				$message._show('success', 'Thank you!');
				//$message._show('failure', 'Something went wrong. Please try again.');

			}, 750);

		});

	})();

})();