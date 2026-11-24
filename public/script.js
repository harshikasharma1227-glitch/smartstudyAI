
// Welcome Button
function showWelcome() {
    alert("Welcome to SmartStudy AI! 🎓 Your learning journey starts here.");

    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });
}

// Navigation Login Button
document.querySelector(".login-btn").addEventListener("click", function() {
    alert("Welcome to SmartStudy AI! Login functionality is coming soon.");
});

// Feature Card Interaction
const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach(function(card) {
    card.addEventListener("click", function(event) {

        const featureName = card.querySelector("h3").textContent;

        // Do not show old popup for AI Doubt Solver
       
if (
    featureName === "AI Doubt Solver" ||
    featureName === "Study Planner" ||
    featureName === "Flashcard Maker" ||
    featureName === "Quiz Generator" ||
    featureName === "Notes Summarizer"
) {
    return;
}
        alert(featureName + " will be available soon!");
    });
});
// Test Backend Connection
async function testBackend() {
    try {
        const response = await fetch("/test");
        const data = await response.json();

        console.log(data.message);

    } catch (error) {
        console.log("Backend connection failed!");
    }
}
async function solveDoubt() {
    const question = document.getElementById("doubtQuestion").value;
    const answerBox = document.getElementById("doubtAnswer");

    if (question.trim() === "") {
        answerBox.innerText = "Please enter a question first!";
        return;
    }

    answerBox.innerText = "Sending your question...";

    try {
        const response = await fetch("/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        answerBox.innerText = data.answer;

    } catch (error) {
        answerBox.innerText = "Something went wrong. Please try again!";
    }
}
// Study Planner
function addTask() {
    const taskInput = document.getElementById("studyTask");
    const dateInput = document.getElementById("studyDate");
    const taskList = document.getElementById("taskList");

    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
        alert("Please enter a task and select a date!");
        return;
    }

    const taskItem = document.createElement("div");

    taskItem.innerHTML = `
        <p>
            ${task} - ${date}
            <button onclick="this.parentElement.remove()">
                Delete
            </button>
        </p>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = "";
    dateInput.value = "";
}
// Flashcard Maker
function createFlashcard() {
    const question = document.getElementById("flashQuestion").value.trim();
    const answer = document.getElementById("flashAnswer").value.trim();
    const flashcardList = document.getElementById("flashcardList");

    if (question === "" || answer === "") {
        alert("Please enter both question and answer!");
        return;
    }

    const card = document.createElement("div");

    card.innerHTML = `
        <h4>${question}</h4>
        <p>${answer}</p>
        <button onclick="this.parentElement.remove()">Delete</button>
    `;

    flashcardList.appendChild(card);

    document.getElementById("flashQuestion").value = "";
    document.getElementById("flashAnswer").value = "";
}
// Quiz Generator
let currentQuestions = [];

function generateQuiz() {
    const notes = document.getElementById("quizTopic").value.trim();
    const quizContainer = document.getElementById("quizContainer");

    if (notes.length < 30) {
        alert("Please enter at least 30 characters of notes!");
        return;
    }

    const sentences = notes.match(/[^.!?]+[.!?]*/g) || [];

    currentQuestions = [];

    sentences.forEach(sentence => {
        const words = sentence.trim().split(/\s+/);

        if (words.length < 5) return;

        const answer = words.reduce((longest, word) =>
            word.length > longest.length ? word : longest
        );

        const question = sentence.replace(answer, "______");

        currentQuestions.push({
            question: question,
            answer: answer,
            options: [
                answer,
                words[1],
                words[2],
                words[3]
            ].filter((value, index, array) =>
                array.indexOf(value) === index
            )
        });
    });

    if (currentQuestions.length === 0) {
        alert("Please enter more detailed notes!");
        return;
    }

    let html = "<h4>Your Practice Quiz</h4>";

    currentQuestions.forEach((q, index) => {
        html += `<p>${index + 1}. ${q.question}</p>`;

        q.options.forEach(option => {
            html += `
                <label>
                    <input type="radio"
                    name="question${index}"
                    value="${option}">
                    ${option}
                </label><br>
            `;
        });
    });

    html += `<button onclick="checkQuiz()">Submit Quiz</button>`;

    quizContainer.innerHTML = html;
}

function checkQuiz() {
    let score = 0;

    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(
            `input[name="question${index}"]:checked`
        );

        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("quizContainer").innerHTML +=
        `<h3>Your Score: ${score}/${currentQuestions.length}</h3>`;
}

// Notes Summarizer
function summarizeNotes() {
    const notes = document.getElementById("notesInput").value.trim();
    const output = document.getElementById("summaryOutput");

    if (notes === "") {
        alert("Please enter your notes first!");
        return;
    }

    const sentences = notes.match(/[^.!?]+[.!?]*/g) || [notes];

    const summary = sentences
        .filter((sentence, index) => index % 2 === 0)
        .join(" ");

    output.innerHTML = `
        <h4>Your Summary:</h4>
        <p>${summary}</p>
    `;
}