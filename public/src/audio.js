import 'whatwg-fetch';

let AudioContext = window.AudioContext || window.webkitAudioContext
let context = new AudioContext();

function load(url, cb) {
	return fetch(url)
		.then(res => res.arrayBuffer())
		.then(array => {
			return new Promise(context.decodeAudioData.bind(context, array));
		});
}

function play(buffer) {
	let source = context.createBufferSource();
	source.connect(context.destination);
	source.buffer = buffer;
	source.start(0);
}

function playOpen() {
	if (!playOpen.promise) {
		playOpen.promise = load('open.mp3');
	}
	return playOpen.promise.then(play);
}

module.exports = {playOpen};
