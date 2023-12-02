let img;
let resizedImage;
let cursorCopies = [];
let numberOfArrows;
let chosenId;
let identicalDesvRange;


function preload() {
    // Load the image during the preload phase
    imgSmallWhite = loadImage('/assets/cursors/smallWhiteCursor.png');

}

function setup() {
    // Setup canvas and other configurations
    const cnv = createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);

    cnv.parent('canvas-container');

    numberOfArrows = 500;
    identicalDesvRange = 150;
    chosenId = -1;
    minTimeStopped = 5;
    maxTimeStopped = 50;
    probabilityOfStopping = 0.002;

    for (let i = 0; i < numberOfArrows; i++) {
        idNumber = i;
        let x = random(width); // Random x position
        let y = random(height); // Random y position
        let speedx = random(0.001, 0.04);
        let speedy = random(0.001, 0.04);
        let rangex = random(0, width);
        let rangey = random(0, height);
        let imgResize = random(0.5, 1.2);

        let currentCursorCopy = new cursorImage(idNumber, imgSmallWhite, x, y, speedx, speedy, rangex, rangey, imgResize);

        cursorCopies.push(currentCursorCopy);
    }


}

function draw() {
    // Draw the image on the canvas
    background(255);
    for (let i = 0; i < numberOfArrows; i++) {
        cursorCopies[i].move();
        cursorCopies[i].display();
    }

}

//Improved cursor image with perlin noise
class cursorImage {

    constructor(idNumber, originalImage, startx, starty, speedx, speedy, rangex, rangey, imgResize) {

        this.idNumber = idNumber;
        this.xOff = startx;
        this.yOff = starty;
        this.rangex = rangex;
        this.rangey = rangey;

        this.xPosition = map(noise(this.xOff), 0, 1, -rangex, width + rangex);
        this.yPosition = map(noise(this.yOff), 0, 1, -rangey, height + rangey);

        //Image resizing and storage
        this.imageToCopy = originalImage.get();
        this.imageToCopy.resize(originalImage.width * imgResize, originalImage.height * imgResize)

        this.stoppedCounter = random(5, 20);

        this.speedx = speedx;
        this.speedy = speedy;

        //Follow cursor
        this.identicalDesvX = random(-identicalDesvRange, identicalDesvRange);
        this.identicalDesvY = random(-identicalDesvRange, identicalDesvRange);

        this.modx = random([-1, 1]);
        this.mody = random([-1, 1]);

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
            this.xPosition = map(noise(this.xOff), 0, 1, -this.rangex, width + this.rangex);
            this.yPosition = map(noise(this.yOff), 0, 1, -this.rangey, height + this.rangey);

            this.xOff += this.speedx;
            this.yOff += this.speedy;
        }

    }


    display() {
        let followCursorThisTime = noise(this.followCursor);
        if (this.idNumber == chosenId) {
            image(this.imageToCopy, mouseX, mouseY);
        } else if (followCursorThisTime > 0.82) {
            image(this.imageToCopy, mouseX + this.identicalDesvX, mouseY + this.identicalDesvY);
        } else if (followCursorThisTime > 0.75) {
            image(this.imageToCopy, (mouseX + this.xPosition) / 2, (mouseY + this.yPosition) / 2);
        } else if (followCursorThisTime > 0.65) {
            image(this.imageToCopy, (mouseX + (this.modx * this.xPosition / 2)), (mouseY + (this.mody * this.yPosition / 2)));
        } else if (followCursorThisTime > 0.55) {
            image(this.imageToCopy, (mouseX + (this.modx * this.xPosition / 3)), (mouseY + (this.mody * this.yPosition / 3)));
        } else {
            image(this.imageToCopy, this.xPosition, this.yPosition);
        }
        this.followCursor += 0.001;

    }
}

function changeChosenId() {
    chosenId = floor(random(1, numberOfArrows));
}

function eliminateChosenId() {
    chosenId = -1;
}

//Handle window resizing
// Attach the handleResize function to the resize event
window.addEventListener('resize', handleResize);

// Initial call to get the initial viewport size
function handleResize() {
    setup();
    draw();
}
