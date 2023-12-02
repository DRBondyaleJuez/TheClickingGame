//Setting the game html locations
const gamesHTMLLocations = [
    'one_button_game.html',
    'pair_button_game.html',
    'multiple_button_game.html',
    'multiple_pair_button_game.html'
]


//Event Listeners
//--- Setting the header return home button
const headerButton = document.querySelector('.header');
headerButton.addEventListener('click', () => {
    console.log('clicked game option corresponding to: index.html')
    goToWebPage('index.html');
})

//--- Setting the game options buttons
const gameModeOptions = document.querySelectorAll('.game_option_card');

gameModeOptions.forEach(function (gameModeOption, index) {

    gameModeOption.addEventListener('click', () => {
        console.log('clicked game option corresponding to: ' + gamesHTMLLocations[index])
        if (index > 0) { return } //This is just to filter inactive buttons at the moment
        goToWebPage(gamesHTMLLocations[index]);
    })

});

function goToWebPage(htmlLocation) {
    console.log('Taking user to location: ' + htmlLocation)
    window.location.href = 'TheClickingGame/' + htmlLocation;
}