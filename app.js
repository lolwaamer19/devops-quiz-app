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

function uniqueTopics(questions) {
  return [...new Set(questions.map(q => q.topic))].sort();
}

function resetFeedback() {
  feedbackEl.textContent = "";
  explanationEl.textContent = "";
}

function renderTopics(topics) {
  topicSelect.innerHTML = `<option value="">-- Select a topic --</option>`;
  for (const t of topics) {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    topicSelect.appendChild(opt);
  }
}

function renderQuestion(q) {
  currentQuestion = q;
  quizCard.hidden = false;
  resetFeedback();
  submitBtn.disabled = true;

  questionText.textContent = q.question;
  optionsForm.innerHTML = "";

  q.options.forEach((text, idx) => {
    const label = document.createElement("label");
    label.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = String(idx);

    radio.addEventListener("change", () => {
      submitBtn.disabled = false;
    });

    const span = document.createElement("span");
    span.textContent = text;

    label.appendChild(radio);
    label.appendChild(span);
    optionsForm.appendChild(label);
  });
}

function pickFirstQuestion() {
  if (filteredQuestions.length === 0) {
    quizCard.hidden = true;
    statusEl.textContent = "No questions found for this topic.";
    return;
  }
  statusEl.textContent = `Showing ${filteredQuestions.length} questions.`;
  renderQuestion(filteredQuestions[0]);
}

topicSelect.addEventListener("change", () => {
  const topic = topicSelect.value;
  if (!topic) {
    quizCard.hidden = true;
    statusEl.textContent = "Please select a topic.";
    return;
  }
  filteredQuestions = allQuestions.filter(q => q.topic === topic);
  pickFirstQuestion();
});

async function loadQuestions() {
  try {
    statusEl.textContent = "Loading questions...";
    const res = await fetch("./data/questions.json");
    if (!res.ok) throw new Error("Failed to load questions.json");
    allQuestions = await res.json();

    const topics = uniqueTopics(allQuestions);
    renderTopics(topics);

    statusEl.textContent = "Select a topic to start.";
  } catch (err) {
    statusEl.textContent = "Error loading questions.";
    console.error(err);
  }
}

loadQuestions();

