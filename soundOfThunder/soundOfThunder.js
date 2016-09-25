let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1){
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 0.91;
  sourceNode.loopEnd = 4.30;
  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;

  sourceNode.connect(pannerNode);
  sourceNode.connect(audioContext.destination);

  sourceNode.start(0.91, 4.30)
}

fetch('thunder.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    startLoop(audioBuffer, -0.83);
    startLoop(audioBuffer, 0.46, 1.004);
  })
  .catch(e => console.error(e));
