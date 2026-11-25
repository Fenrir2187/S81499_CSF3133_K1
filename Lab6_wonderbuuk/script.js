const questions = [
    {
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: ["<script>", "<js>", "<link>", "<javascript>"],
        answer: "<script>"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "font-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Which HTML5 element is used to play video files?",
        options: ["<media>", "<movie>", "<video>", "<mp4>"],
        answer: "<video>"
    },
    {
        question: "Inside which HTML element do we put internal CSS styles?",
        options: ["<css>", "<style>", "<design>", "<head-style>"],
        answer: "<style>"
    },
    {
        question: "Which JavaScript method selects an HTML element by its ID?",
        options: ["querySelectorAll()", "getElementById()", "getElementsByClass()", "findId()"],
        answer: "getElementById()"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let timeLeft = 15;

function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}


function displayQuestion() {
    selectedOption = null;
    const currentQ = shuffledQuestions[currentQuestionIndex];


    document.getElementById("question-number").textContent = 
        `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    document.getElementById("question-text").textContent = currentQ.question;

    const feedbackSection = document.getElementById("feedback-section");
    feedbackSection.className = "feedback hidden";
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("next-btn").classList.add("hidden");


    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => selectOption(button, option);
        optionsContainer.appendChild(button);
    });
}


function selectOption(buttonElement, optionText) {
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    buttonElement.classList.add("selected");
    selectedOption = optionText;
    document.getElementById("submit-btn").disabled = false;
}

function checkAnswer() {
    if (!selectedOption) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const feedbackSection = document.getElementById("feedback-section");
    const feedbackText = document.getElementById("feedback-text");
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption) {
            btn.classList.add("wrong");
        }
    });

    feedbackSection.classList.remove("hidden");
    if (selectedOption === currentQ.answer) {
        score++;
        feedbackText.textContent = "Correct! Well done.";
        feedbackSection.classList.add("correct-msg");
    } else {
        feedbackText.textContent = `Incorrect! The correct answer is: ${currentQ.answer}`;
        feedbackSection.classList.add("wrong-msg");
    }

    document.getElementById("score-display").textContent = 
        `Score: ${score} / ${shuffledQuestions.length}`;

    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

function handleTimeOut() {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const feedbackSection = document.getElementById("feedback-section");
    const feedbackText = document.getElementById("feedback-text");
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSection.classList.remove("hidden");
    feedbackSection.classList.add("wrong-msg");
    feedbackText.textContent = `Time's up! The correct answer is: ${currentQ.answer}`;

    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    clearInterval(timerInterval);
    document.getElementById("question-text").textContent = "Quiz Completed!";
    document.getElementById("options-container").innerHTML = 
        `<p>Thank you for taking the quiz! Check your final score below.</p>`;
    document.getElementById("feedback-section").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("timer").textContent = "Finished";

    document.getElementById("score-display").textContent = 
        `Final Score: ${score} out of ${shuffledQuestions.length}`;
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("score-display").textContent = `Score: 0 / ${questions.length}`;

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

window.onload = startQuiz;