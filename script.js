let gameFrame = document.getElementById("game-frame-image");
let buttons = document.getElementById("buttons");

let currentRoom;

const bedroom = {
    nextRoom: loadBathroom,
    buttons: ["bed", "notebooks", "closet"],
    buttonsText: ["Check under the bed", "Check the old notebooks", "Check the closet"],
    buttonsReturn: ["You found nothing", "101000111001110101100010001001110010001000111101", "WHY IS SOMEONE DEAD HERE"], //testing propose
    images: [], // need to get the images
    mainImage: "./images/MainPage.png" // need to get image
}

$('#start').click(() => {
    loadBedroom();
})

function addComputer() {
    buttons.innerHTML = buttons.innerHTML + `<button id="computer">Computer</button>`

    $('#computer').click(() => {
        computer();
    })
}

function loadBedroom() {
    console.log("Entering bedroom");
    buttons.innerHTML = "";
    currentRoom = bedroom;

    gameFrame.src = currentRoom.mainImage;

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        buttons.innerHTML = buttons.innerHTML + `<button id="${currentRoom.buttons[i]}">${currentRoom.buttonsText[i]}</button>`
    }

    addComputer();

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        $(`#${currentRoom.buttons[i]}`).click(() => {
            console.log(currentRoom.buttonsReturn[i]);
        })
    }

}

function loadBathroom() {
    console.log("entering bathroom");
}

function computer() {
    console.log("put the password");
}