// Quiz questions array
const questions = [
    {
        id: 1,
        question: "Where did we meet for the first time?",
        options: ["Milk Shake Factory", "Narasimha Swamy Temple", "Thick Shake Factory"],
        correctAnswer: "Thick Shake Factory",
        special: false
    },
    {
        id: 2,
        question: "Where was our first hug?",
        options: ["Lakaram", "Dmart Lift", "Imagination"],
        correctAnswer: "Dmart Lift",
        special: false
    },
    {
        id: 3,
        question: "I love hearing you call me as?",
        options: ["Trivedhuuuu", "Baava", "Orey"],
        correctAnswer: "Baava",
        special: false
    },
    {
        id: 4,
        question: "What do you like in me most?",
        options: ["Everything", "Nothing"],
        correctAnswer: "Everything",
        special: true,
        specialLogic: "Q4" // Special logic for Question 4
    },
    {
        id: 5,
        question: "Will you be my Valentine?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        special: true,
        specialLogic: "Q5" // Special logic for Question 5
    },
    {
        id: 6,
        question: "Will you marry me?",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        special: true,
        specialLogic: "Q6" // Special logic for Question 6
    }
];

// State management
let currentQuestionIndex = 0;
let answered = false;
let selectedAnswer = null;

const startScreen = document.getElementById('startScreen');
const quizCard = document.getElementById('quizCard');
const finalScreen = document.getElementById('finalScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');
const restartBtn = document.getElementById('restartBtn');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const answerInput = document.getElementById('answerInput');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const formMessage = document.getElementById('formMessage');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', retryQuestion);
restartBtn.addEventListener('click', restartQuiz);
submitAnswerBtn.addEventListener('click', submitAnswer);

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    quizCard.classList.remove('hidden');
    loadQuestion();
}

// Load and display current question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update question display
    questionNumber.textContent = `Question ${currentQuestion.id} of ${questions.length}`;
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    answered = false;
    
    // Reset button states
    nextBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');
    feedbackMessage.classList.add('hidden');
    
    // Create option buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(answer) {
    if (answered) return; // Prevent multiple answers
    
    selectedAnswer = answer;
    answered = true;
    
    // Mark selected option
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === answer) {
            btn.classList.add('active');
        }
    });
    
    // Check answer logic based on question type
    const currentQuestion = questions[currentQuestionIndex];
    
    if (currentQuestion.special && currentQuestion.specialLogic === "Q4") {
        handleQ4Logic(answer);
    } else if (currentQuestion.special && currentQuestion.specialLogic === "Q5") {
        handleQ5Logic(answer);
    } else if (currentQuestion.special && currentQuestion.specialLogic === "Q6") {
        handleQ6Logic(answer);
    } else {
        handleRegularQuestion(answer);
    }
}

// Regular question logic (Q1, Q2, Q3)
function handleRegularQuestion(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer === currentQuestion.correctAnswer) {
        // Correct answer
        feedbackMessage.textContent = "That's my girl ❤️";
        feedbackMessage.className = 'feedback success';
        feedbackMessage.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    } else {
        // Wrong answer - turn background red
        document.body.classList.add('error-state');
        feedbackMessage.textContent = "Wrong Answer 😤 Try again!";
        feedbackMessage.className = 'feedback error';
        feedbackMessage.classList.remove('hidden');
        retryBtn.classList.remove('hidden');
    }
}

// Question 4 Logic: "What do you like in me most?"
function handleQ4Logic(answer) {
    if (answer === "Nothing") {
        // User selected "Nothing" - turn background red and show hurt message
        document.body.classList.add('error-state');
        feedbackMessage.textContent = "That hurt 😢";
        feedbackMessage.className = 'feedback error';
        feedbackMessage.classList.remove('hidden');
        // Allow user to retry and select "Everything"
        retryBtn.classList.remove('hidden');
    } else if (answer === "Everything") {
        // User selected "Everything" - correct, move to next
        document.body.classList.remove('error-state');
        feedbackMessage.textContent = "That's my girl ❤️";
        feedbackMessage.className = 'feedback success';
        feedbackMessage.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

// Question 5 Logic: "Will you be my Valentine?"
function handleQ5Logic(answer) {
    if (answer === "No") {
        // User selected "No" - show alert and prevent proceeding
        alert("There is no NO option 😌❤️");
        // Reset the question so user must choose Yes
        resetCurrentQuestion();
    } else if (answer === "Yes") {
        // User selected "Yes" - continue
        feedbackMessage.textContent = "That's my girl ❤️";
        feedbackMessage.className = 'feedback success';
        feedbackMessage.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

// Question 6 Logic: "Will you marry me?"
function handleQ6Logic(answer) {
    if (answer === "No") {
        // User selected "No" - show alert and prevent proceeding
        alert("Nope, you are marrying me 💍");
        // Reset the question so user must choose Yes
        resetCurrentQuestion();
    } else if (answer === "Yes") {
        // User selected "Yes" - show final celebration
        feedbackMessage.textContent = "That's my girl ❤️";
        feedbackMessage.className = 'feedback success';
        feedbackMessage.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

// Retry current question
function retryQuestion() {
    document.body.classList.remove('error-state');
    loadQuestion();
}

// Reset current question without changing index
function resetCurrentQuestion() {
    answered = false;
    selectedAnswer = null;
    
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('active');
    });
}

// Move to next question
function nextQuestion() {
    document.body.classList.remove('error-state');
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScreen();
    }
}

// Show final celebration screen
function showFinalScreen() {
    quizCard.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    answerInput.focus(); // Focus on input field
}

// Submit answer form
function submitAnswer() {
    const answer = answerInput.value.trim();
    
    // Validate input
    if (answer === '') {
        formMessage.textContent = "Please type something! 💭";
        formMessage.className = 'form-message error';
        formMessage.classList.remove('hidden');
        return;
    }
    
    // Send answer to backend
    fetch('/submit_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: answer })
    })
    .then(response => response.json())
    .then(data => {
        // Show success message
        formMessage.textContent = "Thank you! Your answer has been saved 💕";
        formMessage.className = 'form-message success';
        formMessage.classList.remove('hidden');
        
        // Disable input and button
        answerInput.disabled = true;
        submitAnswerBtn.disabled = true;
        
        // Show restart button after 1 second
        setTimeout(() => {
            document.getElementById('restartBtn').style.display = 'block';
        }, 1000);
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = "Error submitting answer. Try again!";
        formMessage.className = 'form-message error';
        formMessage.classList.remove('hidden');
    });
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    answered = false;
    selectedAnswer = null;
    document.body.classList.remove('error-state');
    
    // Reset form
    answerInput.value = '';
    answerInput.disabled = false;
    submitAnswerBtn.disabled = false;
    formMessage.classList.add('hidden');
    
    finalScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}
