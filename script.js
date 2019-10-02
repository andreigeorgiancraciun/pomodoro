const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const time = document.querySelector("#time");
const min = document.querySelector('#min');
const sec = document.querySelector("#sec");
const minusWork = document.querySelector("#minusWork");
const plusWork = document.querySelector('#plusWork');
const minusBreak = document.querySelector('#minusBreak');
const plusBreak = document.querySelector('#plusBreak');
const worker = document.querySelector("#worker");
const breaker = document.querySelector("#breaker");

const setWork = document.querySelector('#setWork');
const setBreak = document.querySelector("#setBreak");

let isClockRunning = false;

let currentTimeLeftInSession = 1500;
let currentTimeLeftInBreak = 300;
let setWorkMinutes = 25; 
let setBreakMinutes = 5; 

let type = "Work";

// add leading zeroes if it's less than 10
function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time
   }

function force_reset() {
    min.innerText = "25";
    sec.innerText = "00";
    setWork.innerText = "25";
    setBreak.innerText = "05";
    setWorkMinutes = 25;
    setBreakMinutes = 5;
  }

worker.addEventListener('click', () => {
    worker.classList.add('disabled');
    breaker.classList.remove('disabled');

    minusBreak.classList.add('disabled');
    plusBreak.classList.add('disabled');
    minusWork.classList.remove('disabled');
    plusWork.classList.remove('disabled');

    worker.classList.add('red');
    breaker.classList.remove('red');

    force_reset();

    type = "Work";
    currentTimeLeftInBreak = 300;
    currentTimeLeftInSession = 1500;
  })

breaker.addEventListener('click', () => {
    breaker.classList.add('disabled');
    worker.classList.remove('disabled');

    minusWork.classList.add('disabled');
    plusWork.classList.add('disabled');
    minusBreak.classList.remove('disabled');
    plusBreak.classList.remove('disabled');

    breaker.classList.add('red');
    worker.classList.remove('red');

    force_reset();

    type = "Break";
    currentTimeLeftInSession = 1500;
    currentTimeLeftInBreak = 300;
  })


minusWork.addEventListener('click', () => {
    if(setWorkMinutes > 1){
    currentTimeLeftInSession = currentTimeLeftInSession - 60;
    setWorkMinutes--;
    setWork.innerText = addLeadingZeroes(setWorkMinutes);
    min.innerText = addLeadingZeroes(setWorkMinutes);
    }
    
  })

plusWork.addEventListener('click', () => {
    currentTimeLeftInSession = currentTimeLeftInSession + 60;
    setWorkMinutes++;
    setWork.innerText = addLeadingZeroes(setWorkMinutes);
    min.innerText = addLeadingZeroes(setWorkMinutes);
  })  

minusBreak.addEventListener('click', () => {
    if(setBreakMinutes > 1){
    currentTimeLeftInBreak = currentTimeLeftInBreak - 60;
    setBreakMinutes--;
    setBreak.innerText = addLeadingZeroes(setBreakMinutes);
    min.innerText = addLeadingZeroes(setBreakMinutes);
    }
    
  })  

plusBreak.addEventListener('click', () => {
    currentTimeLeftInBreak = currentTimeLeftInBreak + 60;
    setBreakMinutes++;
    setBreak.innerText = addLeadingZeroes(setBreakMinutes);
    min.innerText = addLeadingZeroes(setBreakMinutes);
  })  

const stopClock = () => {
    // 1) reset the timer we set
    clearInterval(clockTimer);
    // 2) update our variable to know that the timer is stopped
    isClockRunning = false;
    // reset the time left in the session to its original state
    currentTimeLeftInSession = 1500;
    currentTimeLeftInBreak = 1500;
    // update the timer displayed
    displayCurrentTimeLeftInSession();
    force_reset();
    
  }

const displayCurrentTimeLeftInSession = () => {
  let secondsLeft = 0;
   
  if (type === "Work") {
    secondsLeft = currentTimeLeftInSession;
    } else if(type === "Break") {
    secondsLeft = currentTimeLeftInBreak;
  }  
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);
    
    if (hours > 0) { 
    result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    time.innerText = result.toString();}
    else {
        min.innerText = addLeadingZeroes(minutes).toString();
        sec.innerText = addLeadingZeroes(seconds).toString();
    }
  }


const toggleClock = (reset) => {
    if (reset) {
      // STOP THE TIMER
      stopClock();
    } else {
      if (isClockRunning === true) {
        // PAUSE THE TIMER
        isClockRunning = false; 
        clearInterval(clockTimer);
       
      } else {
        // START THE TIMER
        isClockRunning = true;
        clockTimer = setInterval(() => {
            // decrease time left / increase time spent
            if (type === "Work") {
              currentTimeLeftInSession--;
              } else if(type === "Break") {
              currentTimeLeftInBreak--;
            }  
            
            displayCurrentTimeLeftInSession();
        }, 1000)
      }
    }
  }


// START
startButton.addEventListener('click', () => {
    startButton.classList.add('disabled');
    pauseButton.classList.remove('disabled');
    toggleClock();

  })
  
  // PAUSE
pauseButton.addEventListener('click', () => {
    pauseButton.classList.add('disabled');
    startButton.classList.remove('disabled');
    toggleClock();
  })
  
  // STOP
resetButton.addEventListener('click', () => {
    startButton.classList.remove('disabled');
    pauseButton.classList.remove('disabled');
    toggleClock(true);
  })
