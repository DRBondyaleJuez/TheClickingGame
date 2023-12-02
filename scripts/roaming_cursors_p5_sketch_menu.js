
let movingCursor = document.querySelector(".cursor_image_container");
let cursorMovingSection;
let x;
let y;
let cursorCopies = [];
let numberOfArrows;
let maxWidth;
let maxHeight;

function setup() {
    // Setup canvas and other configurations

    maxHeight = document.documentElement.clientHeight;
    maxWidth = document.documentElement.clientWidth;

    numberOfArrows = 30;

    minTimeStopped = 0;
    maxTimeStopped = 0;
    probabilityOfStopping = 0;

    cursorMovingSection = document.querySelector('.cursor_moving_around_section');

    for (let i = 0; i < numberOfArrows; i++) {
        idNumber = i;
        let x = random(maxWidth); // Random x position
        let y = random(maxHeight); // Random y position
        let speedx = random(0.001, 0.01);
        let speedy = random(0.001, 0.01);
        let rangex = random(0, maxWidth);
        let rangey = random(0, maxHeight);
        let cursorSize = random(15, 25);

        let currentHTMLForCursor = `<div class="cursor_image_container" id=${'cursor_image_container' + i}>
        <img style = "max-width:${cursorSize}px" src="../assets/cursors/smallWhiteCursor.png" alt="Cursor image">
    </div>`
        cursorMovingSection.innerHTML += currentHTMLForCursor;

        let currentCursorCopy = new cursorImage('cursor_image_container' + i, x, y, speedx, speedy, rangex, rangey);

        cursorCopies.push(currentCursorCopy);
        console.log(document.getElementById(`${'cursor_image_container' + i}`));
    }

    console.log(document.querySelector('.cursor_moving_around_section'));
}

function draw() {

    for (let i = 0; i < numberOfArrows; i++) {
        cursorCopies[i].move();
        cursorCopies[i].display();
    }
}

class cursorImage {

    constructor(htmlContainerById, startx, starty, speedx, speedy, rangex, rangey,) {

        this.htmlContainerById = htmlContainerById;
        this.xOff = startx;
        this.yOff = starty;
        this.rangex = rangex;
        this.rangey = rangey;

        this.xPosition = map(noise(this.xOff), 0, 1, -rangex, maxWidth + rangex);
        this.yPosition = map(noise(this.yOff), 0, 1, -rangey, maxHeight + rangey);

        this.stoppedCounter = random(20, 100);

        this.speedx = speedx;
        this.speedy = speedy;

        //follow cursor state
        this.followCursor = random(0, 10);
    }

    stopForAWhile() {
        this.stoppedCounter = random(minTimeStopped, maxTimeStopped);
    }

    move() {
        if (random(0, 1) < probabilityOfStopping) {
            this.stopForAWhile();
        }
        if (this.stoppedCounter > 0) {
            this.stoppedCounter--;
        } else {
            this.xPosition = map(noise(this.xOff), 0, 1, -this.rangex, maxWidth + this.rangex);
            this.yPosition = map(noise(this.yOff), 0, 1, -this.rangey, maxHeight + this.rangey);

            if (this.xPosition < 10) {
                this.xPosition = maxWidth - 10;
            }
            if (this.yPosition < 10) {
                this.yPosition = maxHeight - 10;
            }
            if (this.xPosition > maxWidth - 10) {
                this.xPosition = 10;
            }
            if (this.yPosition > maxHeight - 10) {
                this.yPosition = 10;
            }

            this.xOff += this.speedx;
            this.yOff += this.speedy;
        }

    }

    display() {
        let newLeft = this.xPosition + "px";
        let newTop = this.yPosition + "px";

        document.getElementById(this.htmlContainerById).style.left = newLeft;
        document.getElementById(this.htmlContainerById).style.top = newTop;

        console.log(newTop);

    }
}

//Handle window resizing
// Attach the handleResize function to the resize event
window.addEventListener('resize', handleResize);

// Initial call to get the initial viewport size
function handleResize() {
    cursorMovingSection.innerHTML = ""; // to prevent continuous growing of the innerhtml of the section
    setup();
    draw();
}