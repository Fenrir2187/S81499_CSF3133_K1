// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
}

function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Update both images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";
    let resultElement = document.getElementById("result");

    // Determine the winner using if...else
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultElement.style.color = "green";
    } else {
        outcome = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultElement.style.color = "red";
    }

    results.push(outcome);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    let tableBody = document.getElementById("historyBody");
    tableBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + outcome + "</td>" +
        "</tr>";
}

function showSummary() {
    if (results.length === 0) {
        document.getElementById("summaryText").innerHTML = "No rounds played yet.";
        return;
    }

    let totalWins = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    let winPercentage = Math.round((totalWins / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercentage + "%.";
}

function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}