let mic, recorder, soundFile;
let state = 0;
let img;
function preload() {
  img = loadImage('assets/elcato.png');
}


function setup() {
  
  let cnv = createCanvas(windowWidth, windowHeight);
  background(220);  
  image(img, windowWidth/2-img.width/2, windowHeight/2-img.height/2, );
  textSize(width / 10);
  textAlign(CENTER, TOP);
  text('Click anywhere to start recording', 0, 100, width);
  cnv.mousePressed(canvasPressed);
  
  

  // create an audio in
  mic = new p5.AudioIn();
  // prompts user to enable their browser mic
  mic.start();
  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(mic);
  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();
}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();
  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    recorder.record(soundFile);
    background(255,0,0);
    textSize(width / 10);
    textAlign(CENTER, TOP);
    text('RECORDING', 0, 100, width);
    image(img, windowWidth/2-img.width/2, windowHeight/2-img.height/2, );
    state++;
  }
  else if (state === 1) {
    background(0,255,0);
    textSize(width / 10);
    textAlign(CENTER, TOP);
    text('Click anywhere to play and download', 0, 100, width);
    image(img, windowWidth/2-img.width/2, windowHeight/2-img.height/2, );
    // stop recorder and
    // send result to soundFile
    recorder.stop();
    state++;
  }
  else if (state === 2) {
    background(220);
    textSize(width / 10);
    textAlign(CENTER, TOP);
    text('Click anywhere to start recording', 0, 100, width);
    image(img, windowWidth/2-img.width/2, windowHeight/2-img.height/2, );
    delay = new p5.Delay();
    delay.process(soundFile, 0.12, .7, 2300);
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    state = 0;
  }
}