// Questions Array storing questions, options, and correct answer
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

// Quiz state variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let timeLeft = 15;

// Randomly shuffles the questions array
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// Starts a 15-second countdown timer for the current question
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

// Displays the current question and its answer option buttons
function displayQuestion() {
    selectedOption = null;
    const currentQ = shuffledQuestions[currentQuestionIndex];

    // Update question counter and question text
    document.getElementById("question-number").textContent = 
        `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    document.getElementById("question-text").textContent = currentQ.question;

    // Reset feedback and buttons
    const feedbackSection = document.getElementById("feedback-section");
    feedbackSection.className = "feedback hidden";
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("next-btn").classList.add("hidden");

    // Clear old options and create new buttons
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

// Handles when a user clicks an option button
function selectOption(buttonElement, optionText) {
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    buttonElement.classList.add("selected");
    selectedOption = optionText;
    document.getElementById("submit-btn").disabled = false;
}

// Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (!selectedOption) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const feedbackSection = document.getElementById("feedback-section");
    const feedbackText = document.getElementById("feedback-text");
    const allButtons = document.querySelectorAll(".option-btn");

    // Disable all option buttons after submitting
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption) {
            btn.classList.add("wrong");
        }
    });

    // Show feedback and update score
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

    // Swap Submit button with Next button
    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// Automatically marks question wrong if timer hits 0
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

// Moves to the next question or finishes the quiz
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        showFinalScore();
    }
}

// Displays final result in the footer when all questions are completed
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

// Starts or restarts the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("score-display").textContent = `Score: 0 / ${questions.length}`;

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Run startQuiz automatically when the page loads
window.onload = startQuiz;