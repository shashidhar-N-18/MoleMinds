const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const livesEl = document.querySelector('.lives span');
const questionEl = document.querySelector('.question-container .question');
const categoryEl = document.querySelector('.category-container');
const gameOverEl = document.querySelector('.game-over');
const finalScoreEl = document.querySelector('.final-score');
let score = 0;
let lives = 3;
let gameOver = false;
let questions = [];
let currentQuestion = {};
const sound = new Audio("smash.mp3");
let optionsInterval;

function startGame(category) {
    categoryEl.style.display = 'none';
    document.querySelector('.question-container').style.display = 'block';
    if (gameOver) {
        // Game over state
        lives = 3; // Reset lives only if restarting the game
        score = 0; // Reset score
    }
    scoreEl.textContent = score;
    livesEl.textContent = lives;

    fetchQuestions(category).then(data => {
        questions = data;
        if (questions.length === 0) {
            endCategory();
        } else {
            showQuestion();
            run();
        }
    });
}

function fetchQuestions(category) {
    // Sample questions
    const sampleQuestions = {
        history: [
            { question: "Who was the first President of the USA?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], answer: 0 },
            { question: "Who was the first baka of the USA?", options: ["emiway", "mc stan", "krsna", "raftaar"], answer: 0 },
            
                { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], answer: 0 },
                { question: "What year did World War II end?", options: ["1945", "1939", "1941", "1950"], answer: 0 },
                { question: "Who was the famous queen of ancient Egypt?", options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Tutankhamun"], answer: 0 },
                { question: "What was the name of the ship that carried the Pilgrims to America in 1620?", options: ["Mayflower", "Santa Maria", "Endeavour", "Nina"], answer: 0 },
                { question: "Which empire was known as the 'Land of the Rising Sun'?", options: ["Roman Empire", "Ottoman Empire", "Japanese Empire", "British Empire"], answer: 2 },
                { question: "Who was the first man to set foot on the moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], answer: 0 },
                { question: "What ancient civilization built the pyramids of Giza?", options: ["Mayan", "Inca", "Egyptian", "Mesopotamian"], answer: 2 },
                { question: "Which war was fought between the North and South regions of the United States?", options: ["World War I", "Civil War", "Spanish-American War", "Revolutionary War"], answer: 1 },
                { question: "Who was the leader of the Soviet Union during World War II?", options: ["Joseph Stalin", "Vladimir Lenin", "Mikhail Gorbachev", "Leon Trotsky"], answer: 0 },
                { question: "What was the name of the first successful English colony in America?", options: ["Jamestown", "Plymouth", "Roanoke", "New Amsterdam"], answer: 0 }
            
            
        ],
        geography: [
            { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
            
                { question: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"], answer: 0 },
                { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "South Korea", "Thailand"], answer: 1 },
                { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
                { question: "Which continent is the Sahara Desert located on?", options: ["Africa", "Asia", "North America", "Australia"], answer: 0 },
                { question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: 2 },
                { question: "Which ocean is the Great Barrier Reef located in?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 1 },
                { question: "Which country has the most number of islands?", options: ["Sweden", "Norway", "Finland", "Canada"], answer: 3 },
                { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], answer: 1 },
                { question: "Which mountain range is the Andes located in?", options: ["Rockies", "Himalayas", "Alps", "Andes"], answer: 3 },
                { question: "What is the largest desert in the world?", options: ["Sahara", "Arabian", "Gobi", "Antarctic"], answer: 3 }
            
            
        ],
        math: [
            { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
            
                { question: "What is 15% of 200?", options: ["30", "25", "35", "20"], answer: 0 },
                { question: "What is the square root of 144?", options: ["12", "14", "10", "16"], answer: 0 },
                { question: "What is 7 multiplied by 8?", options: ["56", "64", "49", "72"], answer: 0 },
                { question: "What is the result of 100 divided by 4?", options: ["25", "20", "30", "35"], answer: 1 },
                { question: "What is the value of π (pi) rounded to two decimal places?", options: ["3.14", "3.12", "3.16", "3.10"], answer: 0 },
                { question: "What is the next number in the sequence 2, 4, 8, 16, ...?", options: ["24", "32", "40", "48"], answer: 1 },
                { question: "What is the area of a circle with a radius of 7 units? (Use π = 3.14)", options: ["153.86", "154", "149.96", "160"], answer: 0 },
                { question: "What is 5 factorial (5!)?", options: ["120", "60", "100", "24"], answer: 0 },
                { question: "What is the perimeter of a square with side length 9 units?", options: ["36", "72", "18", "27"], answer: 0 },
                { question: "What is the value of 2^5?", options: ["32", "64", "16", "25"], answer: 0 }
            
            
        ],
        science: [
            { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 1 },
            
                { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: 0 },
                { question: "What planet is known as the Blue Planet?", options: ["Earth", "Mars", "Venus", "Neptune"], answer: 0 },
                { question: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"], answer: 0 },
                { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "200,000 km/s"], answer: 0 },
                { question: "What is the largest organ in the human body?", options: ["Skin", "Liver", "Heart", "Lung"], answer: 0 },
                { question: "What gas do plants absorb from the atmosphere during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
                { question: "What is the most common element in the Earth's crust?", options: ["Iron", "Oxygen", "Silicon", "Aluminum"], answer: 1 },
                { question: "What is the name of the force that keeps us grounded on Earth?", options: ["Magnetism", "Friction", "Gravity", "Inertia"], answer: 2 },
                { question: "What is the name of the process by which a caterpillar becomes a butterfly?", options: ["Metamorphosis", "Migration", "Photosynthesis", "Respiration"], answer: 0 },
                { question: "What is the primary function of red blood cells?", options: ["To fight infection", "To carry oxygen", "To digest food", "To clot blood"], answer: 1 }
            
            
        ]
    };

    return new Promise((resolve) => {
        resolve(sampleQuestions[category] || []);
    });
}

function showQuestion() {
    if (questions.length === 0) {
        endCategory();
        return;
    }

    const question = questions.shift();
    currentQuestion = question;

    questionEl.textContent = question.question;
    startOptionsInterval();
}

function startOptionsInterval() {
    if (optionsInterval) clearInterval(optionsInterval);

    optionsInterval = setInterval(() => {
        displayOptions();
    }, 1200); // Adjust interval as needed
}

function displayOptions() {
    holes.forEach(hole => {
        const existingOption = hole.querySelector('.option');
        if (existingOption) existingOption.remove();
    });

    const indices = [];
    while (indices.length < 4) {
        const randIndex = Math.floor(Math.random() * holes.length);
        if (!indices.includes(randIndex)) indices.push(randIndex);
    }

    indices.forEach((index, i) => {
        const hole = holes[index];
        const optionEl = document.createElement('div');
        optionEl.textContent = currentQuestion.options[i] || "";
        optionEl.classList.add('option');
        optionEl.style.textAlign = 'center';
        optionEl.style.lineHeight = '180px'; // Center text vertically

        optionEl.addEventListener('click', () => {
            if (i === currentQuestion.answer) {
                score += 10;
                scoreEl.textContent = score;
                optionEl.textContent = "Correct!";
                optionEl.style.backgroundColor = 'green'; // Visual feedback
                clearInterval(optionsInterval);
                displayWhackedMole(hole); // Pass the hole where the answer was selected
                setTimeout(() => {
                    holes.forEach(h => h.querySelector('.option')?.remove());
                    showQuestion();
                }, 1500);
            } else {
                optionEl.textContent = "Wrong!";
                optionEl.style.backgroundColor = 'red'; // Visual feedback
                lives -= 1; // Deduct a life for wrong answer
                livesEl.textContent = lives;

                if (lives <= 0) {
                    endGame();
                } else {
                    setTimeout(() => {
                        holes.forEach(h => h.querySelector('.option')?.remove());
                        showQuestion();
                    }, 2000);
                }
            }
        });
        hole.appendChild(optionEl);
    });
}

function displayWhackedMole(hole) {
    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'mole-whacked.png'; // Assuming you use this image as feedback
    hole.appendChild(img);

    setTimeout(() => {
        hole.removeChild(img);
    }, 1000); // Duration to display the whacked mole
}

function endGame() {
    gameOver = true;
    document.querySelector('.question-container').style.display = 'none';
    gameOverEl.style.display = 'block';
    finalScoreEl.textContent = score;
}

function endCategory() {
    document.querySelector('.question-container').style.display = 'none';
    categoryEl.style.display = 'block';
    gameOverEl.style.display = 'none';
}

function restartGame() {
    window.location.href = 'index.html'; // Redirect to home page or reload
}

function run() {
    if (gameOver) return;

    // No need to run a mole since it's not needed

    // Removed mole appearance logic
}

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});
