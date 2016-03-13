function SpeechUtterance()
{
	var cyberSpeech = new CyberSpeech();

	//var micRecognition = new MicRecognition();
	this.speak = function(text)
	{
		var voices = window.speechSynthesis.getVoices();
		var msg = new SpeechSynthesisUtterance(text);
		msg.lang = 'en-US';
		msg.voice = voices[10];
		msg.voiceURI = 'native';
		//Google US English
		//Google UK English Male
		//Google UK English Female
		msg.voice = voices.filter(function(voice) { return voice.name == 'Alex'; })[0];
		window.speechSynthesis.speak(msg);

		msg.onend = function(e) {
			//if(window.buttonClicked)
			//{
				cyberSpeech.startRecognition();
			//}
			
			//micRecognition.startButton(event);
		};

		msg.onstart = function(e) {
			cyberSpeech.stopRecognition();
			//micRecognition.stopRecognition();
		};
		
		msg.onerror = function(e) {
			console.log(e);
		};
	};
};

