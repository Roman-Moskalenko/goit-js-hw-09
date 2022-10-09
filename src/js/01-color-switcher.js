const startBtn = document.querySelector ('[data-start]')
const stopBtn = document.querySelector ('[data-stop]')
const body = document.querySelector ('body')


  startBtn.addEventListener('click',  onStartBtn)
  stopBtn.addEventListener('click', onStopBtn)
  stopBtn.disabled = true;
  let timerId = null;
function onStartBtn(){
    timerId = setInterval(onBodyBackgroundColor, 1000);
    startBtn.disabled = true
    stopBtn.disabled = false
}
function onStopBtn(){
    clearTimeout(timerId)
    startBtn.disabled = false
    stopBtn.disabled = true
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
function onBodyBackgroundColor(){
    body.style.backgroundColor = getRandomHexColor();
}
