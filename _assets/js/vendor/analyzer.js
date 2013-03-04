$(function(){
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback, element){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
//http://www.binaura.net/stc/fp/?x=entry:entry120901-200844

var ctx = new Canvas("spectrum"),
    context,
    source,
    analyser;
    function init(file){
        if (typeof AudioContext == "function") {
            context = new AudioContext();
        } 
        else if (typeof webkitAudioContext == "function") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
        analyser = context.createAnalyser();
        var request = new XMLHttpRequest();
        request.open("GET", file, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
            var data = request.response;
            graph(data);
        };
        request.send();
    }
    function play(outputsound) {
        // play the source now
        outputsound.noteOn(context.currentTime);
        startSpectrumAnalysis()
    }
    function stop(index) {
        source.noteOff(context.currentTime);
    }
    function graph(data) { 
        source = context.createBufferSource();
        buffer = context.createBuffer(data, true);
        source.buffer = buffer;
        source.loop = true;
        volumeNode = context.createGainNode();
        volumeNode.gain.value = 1;
        source.connect(volumeNode);
        volumeNode.connect(context.destination);
        volumeNode.connect(analyser);
        play(source);        
    }
	  function startSpectrumAnalysis(){
      var freqData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqData);
      draw(freqData);
      requestAnimationFrame(startSpectrumAnalysis);           
  	}
    function draw(data) {

      ctx.reset();
      var len = data.length,
          width = 900/len,
          gradient;
      for (var i=0; i<len; i++) {
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(".5", "#003366");
        gradient.addColorStop("1.0", "#ccff00");
        ctx.fillStyle(gradient).fillRect(i,300,width,-data[i]);    
  	  }
}
//http://www.truesoundtransfers.de/Titellisten/TT3063.htm
init('../_assets/audio/TT-3063-13.mp3'); 



})
   

    


