function CyberSpeech()
{
	try {
		var recognition = new webkitSpeechRecognition();
		var speechUtterance = new SpeechUtterance();
	} catch(e) {
		var recognition = Object;
	}
	
	this.enable = false;
	recognition.continuous = false;
	recognition.interimResults = true;
	var textArea = $('#log');
	var timeout = true;

	this.startRecognition = function() {
		window.buttonClicked = true;
		timeout = true;
		if(window.speechSynthesis.speaking)
		{
			window.speechSynthesis.cancel();
			stopRecognition();		
		}
		$("#speech-content-mic").removeClass();
        $("#speech-content-mic").addClass("speech-mic-works");
		recognition.lang = "en-US";
		recognition.start();
	};

	this.stopRecognition = function()  {
		window.buttonClicked = false;
		recognition.stop();
		$("#speech-content-mic").removeClass();
        $("#speech-content-mic").addClass("speech-mic");
	};

	recognition.onresult = function (event) {
		console.log('onresult trigger');
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
				var html = textArea.html();
				textArea.html(html + '<br>' + event.results[i][0].transcript);
				speechUtterance.speak(event.results[i][0].transcript);
				recognition.abort();
				timeout = false;
			} 
		}
	};
	
	recognition.onnomatch = function(event)
	{
		console.log('nomatch');
	}

	recognition.onend = function(event) 
	{
		console.log('speech onend');
		//there is a bug in web speech, if there is a background noise, it will not call onresult and onerror. 
		//I have to manually control timeout for this case.
		if(timeout)
		{
			recognition.stop();
			$("#speech-content-mic").removeClass();
			$("#speech-content-mic").addClass("speech-mic");
			window.buttonClicked = false;
			console.log('no speech recognized in onend');
		}
	};


	recognition.onerror = function(evnet)
	{
		console.log('recognition error ' + event.error);
		if (event.error == 'no-speech') 
		{
			recognition.stop();
			$("#speech-content-mic").removeClass();
			$("#speech-content-mic").addClass("speech-mic");
			window.buttonClicked = false;
			timeout=false;
			console.log('no speech recognized');
		}

		if(event.error == 'aborted')
		{
			
		}
	};
};

