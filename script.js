let gameFrame = document.getElementById("img");
let buttons = document.getElementById("buttons");
let overlay = document.getElementById("overlay");
let roomTitle = document.getElementById("room-title");
let roomDescription = document.getElementById("description");

let currentRoom;

let html;

const startTitle = "Welcome to the game";
const start = "You've been locked inside a virtual reality game, now you have to find a way to get out!               Good luck!";

let expectedPW = [];

const bathroom = {
    /*nextRoom: null,
    buttons: ["toilet", "mirror", "shower"],
    buttonsText: ["Check the toilet", "Look on the mirror", "Check under the shower"],
    buttonsReturn: ["You found nothing", "", "All the clothes here seem to have something in common"], //testing propose
    images: [], // need to get the images
    passwords: ["null", "equals", "interface"],
    checked: [false, false, false],
    mainImage: "/images/MainPage.png" // need to get image*/
}

const bedroom = {
    nextRoom: bathroom,
    buttons: ["Bed", "Notebooks", "Closet"],
    buttonsText: ["Check under the bed", "Check the old notebooks", "Check the closet"],
    firstText: ["I don't think there's anything here", "39321, 5031, 1203, 721435, 94769, 3009, 3, 365, 103, 323643, 787", "This is full of clothes"],
    secondText: ["There's nothing here", "12393, 1305, 3021, 534127, 96749, 9003, 3, 563, 301, 346323, 787", "Oh! My super hero costume"],
    images: [], // need to get the images
    passwords: ["null", "odd", "cosplay"],
    checked: [false, false, false],
    mainImage: "/images/MainPage.png" // need to get image
}

$('#start').click(() => {
    overlay.style.display = "flex";
    roomTitle.innerHTML = startTitle;
    createBanner(start);
    currentRoom = bedroom;
    setTimeout(loadRoom, 10000);
})

function loadRoom() {

    html = `<div class="control-buttons">`
    overlay.style.display = "none";

    gameFrame.src = currentRoom.mainImage;

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        html = html + `<button id="${currentRoom.buttons[i]}">${currentRoom.buttonsText[i]}</button>`
    }

    addComputer();

    for (let i = 0; i < currentRoom.buttons.length; i++) {
        $(`#${currentRoom.buttons[i]}`).click(() => {

            overlay.style.display = "flex";

            roomTitle.innerHTML = currentRoom.buttons[i];

            if(!currentRoom.checked[i]){
                expectedPW.push(currentRoom.passwords[i]);
                createBanner(currentRoom.firstText[i]);
                currentRoom.checked[i] = true;
            }else{
                createBanner(currentRoom.secondText[i]);
            }

            buttons.innerHTML = `<div class="special-buttons"><button id="goBack">Go Back</button></div>`;

            $('#goBack').click(() => {
                loadRoom();
            })

        })
    }

}

function createBanner(description) {

    let char = 0;
    let timer = setInterval(onTick, 75);
    let words = description.split("");
    roomDescription.innerHTML = "";

    for (let i = 0; i < description.length; i++) {
        roomDescription.innerHTML += `<span>${description[i]}</span>`;
    }

    function onTick() {
        const span = roomDescription.querySelectorAll('span')[char];
        console.log(span);
        span.classList.add('fade');
        char++;

        if (char === words.length) {
            clearInterval(timer);
        }
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
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