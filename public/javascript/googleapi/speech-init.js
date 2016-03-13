function SpeechInit()
{
	try {
		var recognition = new webkitSpeechRecognition();
	} catch(e) {
		var recognition = Object;
	}
	recognition.continuous = false;
	recognition.interimResults = true;
	
	var cyberSpeech = new CyberSpeech();
	
	var start = ['okay cyber'];
	this.stop = ['stop cyebr'];
	
	this.initSpeech = function() {
		recognition.lang = "en-US";
		recognition.start();
	};

	recognition.onresult = function (event) {
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			if (event.results[i].isFinal) {
//				alert(event.results[i][0].transcript);
				console.log(event.results[i][0].transcript);
				if(event.results[i][0].transcript.toLowerCase() == start)
				{
					recognition.abort();
					cyberSpeech.startRecognition();
				}
			} 
		}
	};
	
	recognition.onend = function(event) {
		alert('end');
	};

}