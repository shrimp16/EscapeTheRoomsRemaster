let gameFrame = document.getElementById("img");
let buttons = document.getElementById("buttons");
let overlay = document.getElementById("overlay");

let currentRoom;

let html;

let expectedPW = [];

const bathroom = {
    nextRoom: null,
    buttons: ["toilet", "mirror", "shower"],
    buttonsText: ["Check the toilet", "Look on the mirror", "Check under the shower"],
    buttonsReturn: ["You found nothing", "101000111001110101100010001001110010001000111101", "All the clothes here seem to have something in common"], //testing propose
    images: [], // need to get the images
    passwords: ["null", "equals", "interface"],
    checked: [false, false, false],
    mainImage: "/images/MainPage.png" // need to get image
}

const bedroom = {
    nextRoom: bathroom,
    buttons: ["bed", "notebooks", "closet"],
    buttonsText: ["Check under the bed", "Check the old notebooks", "Check the closet"],
    buttonsReturn: ["You found nothing", "101000111001110101100010001001110010001000111101", "All the clothes here seem to have something in common"], //testing propose
    images: [], // need to get the images
    passwords: ["null", "equals", "interface"],
    checked: [false, false, false],
    mainImage: "/images/MainPage.png" // need to get image
}

$('#start').click(() => {
    currentRoom = bedroom;
    loadRoom();
})

function loadRoom() {

    html = `<div class="control-buttons">`
    overlay.style.display = "none";

    console.log(gameFrame);
    gameFrame.src = currentRoom.mainImage;

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        html = html + `<button id="${currentRoom.buttons[i]}">${currentRoom.buttonsText[i]}</button>`
    }

    addComputer();

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        $(`#${currentRoom.buttons[i]}`).click(() => {

                overlay.style.display = "flex";
                overlay.innerHTML = `<h1>${currentRoom.buttons[i]}</h1>
                <p class="desc">
                    ${currentRoom.buttonsReturn[i]}
                </p>`;

                expectedPW.push(currentRoom.passwords[i]);
                currentRoom.checked[i] = true;

                createBackButton();

        })
    }

}

function createBackButton() {
    buttons.innerHTML = `<div class="special-buttons"><button id="goBack">Go Back</button></div>`;

    $('#goBack').click(() => {
        loadRoom();
    })
}

function addComputer() {
    html = html + `<button id="computer">Computer</button></div>`;

    buttons.innerHTML = html;

    $('#computer').click(() => {
        computer();
    })
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
        loadRoom();
    })

    $('#submit').click(() => {
        let pw1 = document.querySelector("#pw1").value;
        let pw2 = document.querySelector("#pw2").value;
        let pw3 = document.querySelector("#pw3").value;

        if (pw1 === expectedPW[0] && pw2 === expectedPW[1] && pw3 === expectedPW[2]) {
            alert("Good job, you made it to the next room");
            currentRoom = currentRoom.nextRoom;
        } else {
            alert("WRONG");
        }

        expectedPW = [];
        loadRoom();

    })
}