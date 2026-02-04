const topicSelect = document.getElementById("topicSelect");
const statusEl = document.getElementById("status");
const quizCard = document.getElementById("quizCard");
const questionText = document.getElementById("questionText");
const optionsForm = document.getElementById("optionsForm");
const submitBtn = document.getElementById("submitBtn");
const feedbackEl = document.getElementById("feedback");
const explanationEl = document.getElementById("explanation");

let allQuestions = [];
let filteredQuestions = [];
let currentQuestion = null;

async function loadQuestions() {
  try {
    statusEl.textContent = "Loading questions...";
    const res = await fetch("./data/questions.json");
    if (!res.ok) throw new Error("Failed to load questions.json");
    allQuestions = await res.json();
    statusEl.textContent = `Loaded ${allQuestions.length} questions.`;
  } catch (err) {
    statusEl.textContent = "Error loading questions.";
    console.error(err);
  }
}

loadQuestions();
