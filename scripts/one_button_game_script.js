
//Getting all non changing elements from the view:

//Header Button
const headerButton = document.querySelector('.header');

//Time Display
const time_display = document.querySelector('.time_display');

//Rounds Section and rounds Input
const numberOfRoundsSection = document.querySelector('.number_of_rounds_section');

//Start-Restart Button
const startOrRestartGameButton = document.querySelector('.restart_button_container');

//Centre Countdown and finish display container
const countdown_container = document.querySelector('.countdown');

//Game Section
const gameContainer = document.getElementById('game_section_container');
const randomButtonContainer = document.querySelector('.random_button_container');

//--------------------------------------------------------------------------------------

//Creating class attributes
let gameOnState = false;
let numberOfRounds;
let countdownCounter;
let countdownInterval;
let initialTime;
let timerInterval;

//-----------------------------------------------------------------------------------------

//Event Listeners
//--- Setting the header return home button

headerButton.addEventListener('click', () => {
    console.log('clicked game option corresponding to: index.html')
    goToWebPage('TheClickingGame/index.html');
})


startOrRestartGameButton.addEventListener('click', () => {
    console.log('Start Game')
    startOrRestartGameButton.innerHTML = '<img src="../assets/restartLabel.png" alt="The Restart Button Label">'
    setNewGame();
    startGame();
});

//-----------------------------------------------------------------------------------------

// FUNCTIONS

function goToWebPage(htmlLocation) {
    console.log('Taking user to location: ' + htmlLocation)
    window.location.href = '../' + htmlLocation;
}


function setNewGame() {
    updateNumberOfRoundsToANumber();
    //Cleanning in case of Restart
    if (gameOnState) {
        clearInterval(countdownInterval);
        clearInterval(timerInterval);
    }

    gameContainer.style.cursor = 'none';
    changeChosenId(); //This is a method in the other js file roaming_cursors_p5_sketch.js

    time_display.innerHTML = '00:00:00:000';
    countdown_container.innerHTML = '';
    randomButtonContainer.innerHTML = '';
}

function updateNumberOfRoundsToANumber() {
    if (gameOnState) {
        const numberRoundsSetHtml = `<p class="rounds_label"> ${numberOfRounds}</p>`
        numberOfRoundsSection.innerHTML = numberRoundsSetHtml;
    } else {
        const numberOfRoundsInput = document.getElementById('rounds_input');
        let selectedNumberOfRounds = parseInt(numberOfRoundsInput.value);
        //check if rounds input is a correct positive number
        if (isNaN(selectedNumberOfRounds) || selectedNumberOfRounds < 1 || selectedNumberOfRounds > 50) {
            selectedNumberOfRounds = 1;
        }
        const numberRoundsSetHtml = `<p class="rounds_label"> ${selectedNumberOfRounds}</p>`

        numberOfRoundsSection.innerHTML = numberRoundsSetHtml;

        numberOfRounds = selectedNumberOfRounds;
    }
}

//GAME IN ACTION

//Game Starting
function startGame() {

    //Initial Countdown
    gameOnState = true;
    countdownCounter = 4;
    countdownInterval = setInterval(updateCountdown, 1000);

}

function updateCountdown() {
    if (countdownCounter > 0) {
        countdown_container.innerHTML = `<img style="height:auto;width:100%" src="../assets/countdown/${countdownCounter}.png" alt="Gif Clicking Background">`
    } else {
        clearInterval(countdownInterval); //Stop the interval activity
        countdown_container.innerHTML = '';
        startButtonHunt();
    }
    countdownCounter--;
}

function startButtonHunt() {
    startTimer();
    createRandomButton();
}

//Timer
function startTimer() {
    initialTime = new Date().getTime();
    timerInterval = setInterval(setTimeInTimer, 10);
}

function setTimeInTimer() {
    const now = new Date().getTime();
    const currentTime = now - initialTime;

    const hours = Math.floor((currentTime / (1000 * 60 * 60)));
    const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    const miliseconds = Math.floor(currentTime % 1000);

    //ADDING SOME DIFFICULTY EVERY 15 seconds
    if (seconds == 15) {
        changeChosenId(); //This is a method in the other js file roaming_cursors_p5_sketch.js
    }


    //Build time display
    const correctedHours = add0IfNeeded(String(hours));
    const correctedMinutes = add0IfNeeded(String(minutes));
    const correctedSeconds = add0IfNeeded(String(seconds));
    const correctedMiliseconds = add0IfNeededMiliseconds(String(miliseconds));

    time_display_content = correctedHours + ":" +
        correctedMinutes + ":" +
        correctedSeconds + ":" +
        correctedMiliseconds;

    time_display.innerHTML = time_display_content;

    if (minutes > 1 || currentTime > 120000) {
        clearInterval(timerInterval);
    }

    if (currentTime < 0) {
        console.log('Current time is <0 :' + currentTime)
        clearInterval(timerInterval);
    }

    if (currentTime == NaN) {
        console.log('Current time is NaN :' + currentTime)
        clearInterval(timerInterval);
    }

}

function add0IfNeeded(number) {
    if (number.length == 1) {
        return "0" + number;
    }
    return number;
}

function add0IfNeededMiliseconds(number) {
    if (number.length == 1) {
        return "00" + number;
    }
    if (number.length == 2) {
        return "0" + number;
    }
    return number;
}

function createRandomButton() {

    const maxWidth = gameContainer.offsetWidth;
    const maxHeight = gameContainer.offsetHeight;

    //const randomTopPostion = Math.random() * maxHeight;
    const randomTopPostion = Math.random() * 100;

    //const randomLeftPostion = Math.random() * maxWidth;
    const randomLeftPostion = Math.random() * 100;

    console.log('Button created with the following position: width:' + randomLeftPostion + '|| height:' + randomTopPostion)

    /*
    const randomButtonHtml = `<button class="random_button" style=
    position: absolute;
    top:${randomTopPostion}px;
    left:${randomLeftPostion}px;
    border-radius: 5cap;
    >
    CLICK ME
    </button>`;
    */

    const randomButtonHtml = `<button class="random_button" style= "
    top:${randomTopPostion}%;
    left:${randomLeftPostion}%;"
    >
    CLICK ME
    </button>`;


    /*
    const randomButtonHtml = `<button class="random_button" style=
    margin-top:${randomTopPostion}%;
    margin-left:${randomLeftPostion}%;
    border-radius: 5cap;
    >
    CLICK ME
    </button>`;
    */

    randomButtonContainer.innerHTML = randomButtonHtml;
    setRandomButtonEventListener();

}

function setRandomButtonEventListener() {
    const randomGameButton = document.querySelector('.random_button');
    randomGameButton.addEventListener('click', () => {
        numberOfRounds--;
        updateNumberOfRoundsToANumber();
        if (numberOfRounds == 0) {
            finishGame();
            gameOnState = false;
        } else {
            setTimeout(createRandomButton, 10);
            changeChosenId(); //This is a method in the other js file roaming_cursors_p5_sketch.js
        }
    });
}

function finishGame() {
    clearInterval(timerInterval);

    randomButtonContainer.innerHTML = '';

    startOrRestartGameButton.innerHTML = '<img src="../assets/startLabel.png" alt="The Start Button Label">';

    const numberRoundsSetHtml = `<input class="rounds_input" id="rounds_input" type="number" value="1">`
    numberOfRoundsSection.innerHTML = numberRoundsSetHtml

    countdown_container.innerHTML = `<img style="height:auto;width:100%" src="../assets/finishedTick.png" alt="Finish Game badge">`;

    eliminateChosenId(); //This is a method in the other js file roaming_cursors_p5_sketch.js
    gameContainer.style.cursor = 'default';

    console.log('Game Finished. Time:' + time_display.value);
    gameOnState = false;
}



