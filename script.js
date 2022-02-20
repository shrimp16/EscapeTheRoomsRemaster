let gameFrame = document.getElementById("img");
let buttons = document.getElementById("buttons");
let overlay = document.getElementById("overlay");
let roomTitle = document.getElementById("room-title");
let roomDescription = document.getElementById("description");

let currentRoom;

let html;

let expectedPW = [];

const bathroom = {
    nextRoom: null,
    buttons: ["toilet", "mirror", "shower"],
    buttonsText: ["Check the toilet", "Look on the mirror", "Check under the shower"],
    buttonsReturn: ["You found nothing", "01000001 01110010 01100101 00100000 01111001 01101111 01110101 00100000 01100001 00100000 01100011 01100001 01110100 00111111", "All the clothes here seem to have something in common"], //testing propose
    images: [], // need to get the images
    passwords: ["null", "equals", "interface"],
    checked: [false, false, false],
    mainImage: "/images/MainPage.png" // need to get image
}

const bedroom = {
    nextRoom: bathroom,
    buttons: ["bed", "notebooks", "closet"],
    buttonsText: ["Check under the bed", "Check the old notebooks", "Check the closet"],
    buttonsReturn: ["You found nothing", 
    "01010011 01101111 01101101 01100101 01101111 01101110 01100101 00100000 01101011 01101001 01101100 01101100 01100101 01100100 00100000 01110100 01101000 01100101 00100000 01100011 01100001 01110100",
    "Why do I only have jackets?"], //testing propose
    secondText: ["There's nothing there", "Is it going to catch you too?", "This is full of jackets"],
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


            roomTitle.innerHTML = `${currentRoom.buttons[i]}`;

            createBanner(currentRoom.buttonsReturn[i]);
            overlay.style.display = "flex";

            expectedPW.push(currentRoom.passwords[i]);
            currentRoom.checked[i] = true;

            buttons.innerHTML = `<div class="special-buttons"><button id="goBack">Go Back</button></div>`;

            $('#goBack').click(() => {
                loadRoom();
            })

        })
    }

}

function createBanner(description) {

    let words = description.split("");
    let char = 0;
    roomDescription.innerHTML = "";
    console.log(words);
    for (let i = 0; i < description.length; i++) {
        roomDescription.innerHTML += `<span>${description[i]}</span>`;
    }

    let timer = setInterval(onTick, 75);

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