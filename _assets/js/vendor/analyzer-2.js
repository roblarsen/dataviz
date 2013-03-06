$(function(){

//http://www.binaura.net/stc/fp/?x=entry:entry120901-200844

var ctx = new Canvas("spectrum"),
    context,
    source,
    analyser,
    buffer,
    volumeNode;
    function init(file){
        if (typeof AudioContext == "function") {
            context = new AudioContext();
        } 
        else if (typeof webkitAudioContext == "function") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported.');
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
        source.loop = false;
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
          fill; 
      for (var i=5; i<len; i = i + 10) {
        var dataLen = data[i];
            for (var j = 5; j < dataLen; j = j+10){
              fill = "rgb("+j+","+(255-j)+",255)";
              ctx.fillCircle({
                x : i,
                y : 300 - j,
                radius : 4,
                fillStyle : fill
              });
            }
                
  	  }
}
//http://www.truesoundtransfers.de/Titellisten/TT3063.htm
init('../_assets/audio/IMSLP83569-PMLP82078-03_Bach-Mvt_3.mp3'); 
/*Vincent DiMartino (Trumpet)
Performers:
Saunders, Violin
Arnold, Flute
Rennick, Oboe
Lexington Bach Choir Orchestra
Publisher Info.:
Vince DiMartino
Copyright:
Creative Commons Attribution 3.0 
http://imslp.org/wiki/Brandenburg_Concerto_No.2_in_F_major,_BWV_1047_(Bach,_Johann_Sebastian)
*/


})
   

    


