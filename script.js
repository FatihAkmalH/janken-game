let skorBot = 0,
skorPlayer = 0,
timeOut = "";

let bot = document.getElementById("bot");
let pilihBot = document.getElementById("pilih-bot");

let splashScreen = document.getElementsByClassName("splash")[0],
startGame = document.getElementsByClassName("start")[0],
displaySkorBot = document.getElementsByClassName("skor-bot")[0],
displaySkorPlayer = document.getElementsByClassName("skor-player")[0];

let reset = document.getElementById("reset"),
batu = document.getElementById("batu"),
gunting = document.getElementById("gunting"),
kertas = document.getElementById("kertas");


// Untuk memulai game
startGame.addEventListener("click", () => {
    splashScreen.style.top = "120vh";
    splashScreen.style.transition = "0.75s";
});

batu.addEventListener("click", () => {
    janken(0);
});
gunting.addEventListener("click", () => {
    janken(1);
});
kertas.addEventListener("click", () => {
    janken(2);
});

// fungsi reset
reset.addEventListener("click", () => {
    if (confirm("Anda yakin ingin memulai ulang permainan?")) {
        skorBot = 0;
        skorPlayer = 0;
        displaySkorBot.innerHTML = skorBot;
        displaySkorPlayer.innerHTML = skorPlayer;
        localStorage.clear();
    }
});

function janken(tangan) {
    let jariBot = Math.floor(Math.random() * 3);

    switch (jariBot) {
        case 0:
            pilihBot.style.backgroundImage = "url(player-batu.png)";
            break;
        case 1:
            pilihBot.style.backgroundImage = "url(player-gunting.png)";
            break;
        default:
            pilihBot.style.backgroundImage = "url(player-kertas.png)";
            break;
    }

    bot.classList.remove("goyang");

    switch (tangan) {
        case 0:
            if (jariBot == 0) {
                result("draw");
            } else if (jariBot == 1) {
                result("player");
            } else {
                result("bot");
            }
            break;
        case 1:
            if (jariBot == 0) {
                result("bot");
            } else if (jariBot == 1) {
                result("draw");
            } else {
                result("player");
            }
            break;
        default:
            if (jariBot == 0) {
                result("player");
            } else if (jariBot == 1) {
                result("bot");
            } else {
                result("draw");
            }
            break;
    }
}

function result(who) {
    clearTimeout(timeOut);

    switch (who) {
        case "bot":
            skorBot++;
            localStorage.setItem("skorBot", skorBot);
            displaySkorBot.innerHTML = skorBot;
            console.log("Computer menang");
            break;
        case "player":
            skorPlayer++;
            localStorage.setItem("skorPlayer", skorPlayer);
            displaySkorPlayer.innerHTML = skorPlayer;
            console.log("Anda menang");
            break;
        default:
            console.log("seri");
            break;
    }

    timeOut = setTimeout(() => {
        pilihBot.style.removeProperty("background-image");
        bot.classList.add("goyang");
    }, 2000);
}

// local Storage
if (localStorage.getItem("skorBot")) {
    skorBot = localStorage.getItem("skorBot");
    displaySkorBot.innerHTML = skorBot;
}

if (localStorage.getItem("skorPlayer")) {
    skorPlayer = localStorage.getItem("skorPlayer");
    displaySkorPlayer.innerHTML = skorPlayer;
}