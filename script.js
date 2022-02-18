let gameFrame = document.getElementById("game-frame-image");
let buttons = document.getElementById("buttons");

let currentRoom;

let html;

let expectedPW = [];

const bedroom = {
    load: loadBedroom,
    nextRoom: loadBathroom,
    buttons: ["bed", "notebooks", "closet"],
    buttonsText: ["Check under the bed", "Check the old notebooks", "Check the closet"],
    buttonsReturn: ["You found nothing", "101000111001110101100010001001110010001000111101", "All the clothes here seem to have something in common"], //testing propose
    images: [], // need to get the images
    passwords: ["null", "equals", "interface"],
    checked: [false, false, false],
    mainImage: "./images/MainPage.png" // need to get image
}

$('#start').click(() => {
    loadBedroom();
})

function addComputer() {
    html = html + `<button id="computer">Computer</button></div>`;

    
    buttons.innerHTML = html;

    $('#computer').click(() => {
        computer();
    })
}

function loadBedroom() {

    currentRoom = bedroom;

    html = `<div class="control-buttons">`

    gameFrame.src = currentRoom.mainImage;

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        html = html + `<button id="${currentRoom.buttons[i]}">${currentRoom.buttonsText[i]}</button>`
    }

    addComputer();

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        $(`#${currentRoom.buttons[i]}`).click(() => {
            expectedPW.push(currentRoom.passwords[i]);
        })
    }

}

function loadBathroom() {
    console.log("entering bathroom");
}

function computer() {
    console.log(expectedPW);

    html = `<div class="inputs">
    <input id="pw1" type="text">
    <input id="pw2" type="text">
    <input id="pw3" type="text">
    </div>
    <div class="special-buttons">
    <button id="submit">Submit</button>
    <button id="goBack">Go Back</button>
    </div>`;

    buttons.innerHTML = html;

    $('#goBack').click(() => {
        currentRoom.load();
    })

    $('#submit').click(() => {
        console.log(document.querySelector("#pw1").value);
        console.log(document.querySelector("#pw2").value);
        console.log(document.querySelector("#pw3").value);
    })
}