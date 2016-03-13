$(document).ready(function() {
	var speech = new CyberSpeech();
	$('#speech-content-mic').click(function(){
		if(!speech.enable)
		{
			speech.startRecognition();
		}
		else
		{
			speech.stopRecognition();
			window.buttonClicked = false;
		}
	});
	
	var initSpeech = new SpeechInit();
	setTimeout(function(){initSpeech.initSpeech();},1000);
});
