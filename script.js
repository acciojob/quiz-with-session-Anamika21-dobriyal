//your JS code here.
// Get DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display saved score if present
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your previous score was ${savedScore} out of 5.`;
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous questions

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Create radio buttons for each choice
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Retain the previously selected option from sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
        choiceElement.setAttribute("checked", "true");  // Explicitly set the checked attribute
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));  // Add a line break for better spacing
    });

    questionsElement.appendChild(questionElement);
  });
}

// Save progress in sessionStorage
function saveProgress() {
  const inputs = document.querySelectorAll("input[type='radio']:checked");
  inputs.forEach((input) => {
    const questionIndex = input.getAttribute("name").split("-")[1];
    userAnswers[questionIndex] = input.value;

    // Explicitly set the checked attribute
    input.setAttribute("checked", "true");
  });
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  // Display the score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Store the score in localStorage
  localStorage.setItem("score", score);
}

// Event listener for submit button
submitButton.addEventListener("click", () => {
  saveProgress();
  calculateScore();
});








// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
