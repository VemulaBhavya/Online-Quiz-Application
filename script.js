/* script.js - Quiz logic
 - startQuizFromStorage(): entry when quiz.html loads
 - it reads localStorage: quiz_user and quiz_category
 - selects the question bank based on category & level, randomizes, shows question, timer, collects answers
 - on finish stores quiz_final in localStorage and goes to result.html
*/

// ---------- QUESTION BANK ----------
const BANK = {
  // General Knowledge: 3 levels (school1, school5, college)
  general: {
    school1: [
      { q: "Capital of India?", o: ["Delhi", "Mumbai", "Kolkata", "Chennai"], a: 0 },
      { q: "Which animal says 'Moo'?", o: ["Dog", "Cat", "Cow", "Sheep"], a: 2 },
      { q: "Color of sky on clear day?", o: ["Green", "Blue", "Red", "Yellow"], a: 1 },
      { q: "How many legs does a spider have?", o: ["6", "8", "4", "10"], a: 1 },
      { q: "2 + 3 = ?", o: ["4", "5", "6", "3"], a: 1 },
      { q: "Which fruit is yellow and curved?", o: ["Apple", "Banana", "Orange", "Grapes"], a: 1 },
      { q: "Which is a farm animal?", o: ["Cow", "Shark", "Eagle", "Dolphin"], a: 0 },
      { q: "Which month comes after May?", o: ["June", "April", "July", "August"], a: 0 },
      { q: "Which one is a vehicle?", o: ["Car", "Tree", "House", "Book"], a: 0 },
      { q: "Sun rises in the ___?", o: ["West", "East", "North", "South"], a: 1 }
    ],
    school5: [
      { q: "Who wrote 'Wings of Fire'?", o: ["A. P. J. Abdul Kalam", "C. Rajagopalachari", "Arundhati Roy", "Rabindranath Tagore"], a: 0 },
      { q: "Which ocean is the largest?", o: ["Atlantic", "Indian", "Pacific", "Arctic"], a: 2 },
      { q: "Which planet is called the Blue Planet?", o: ["Mars", "Earth", "Jupiter", "Venus"], a: 1 },
      { q: "Who was the first Prime Minister of India?", o: ["Nehru", "Gandhi", "Patel", "Azad"], a: 0 },
      { q: "The currency of Japan is?", o: ["Yen", "Rupee", "Dollar", "Euro"], a: 0 },
      { q: "Which gas is essential for respiration?", o: ["Nitrogen", "Oxygen", "Hydrogen", "Helium"], a: 1 },
      { q: "Which continent is India in?", o: ["Europe", "Asia", "Africa", "Australia"], a: 1 },
      { q: "What is H2O?", o: ["Salt", "Water", "Sugar", "Acid"], a: 1 },
      { q: "The Great Wall is in which country?", o: ["India", "China", "Egypt", "Peru"], a: 1 },
      { q: "Which is the longest river in India?", o: ["Ganga", "Yamuna", "Godavari", "Krishna"], a: 0 }
    ],
    college: [
      { q: "Which year did India become a republic?", o: ["1947", "1950", "1952", "1948"], a: 1 },
      { q: "Who is the author of 'The Discovery of India'?", o: ["Nehru", "Gandhi", "Aurobindo", "Tagore"], a: 0 },
      { q: "Which treaty ended World War I?", o: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Rome", "Treaty of Ghent"], a: 1 },
      { q: "What is GDP?", o: ["Gross Domestic Product", "Gross Domestic People", "General Domestic Product", "Gross Daily Product"], a: 0 },
      { q: "Which is a primary source in research?", o: ["Interview", "Textbook", "Review article", "Encyclopedia"], a: 0 },
      { q: "Who proposed the laws of motion?", o: ["Einstein", "Newton", "Galileo", "Kepler"], a: 1 },
      { q: "Which organelle is responsible for protein synthesis?", o: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], a: 2 },
      { q: "pH less than 7 indicates?", o: ["Neutral", "Acidic", "Basic", "Alkaline"], a: 1 },
      { q: "Which is an emerging renewable energy source?", o: ["Coal", "Solar", "Petrol", "Diesel"], a: 1 },
      { q: "What does HTTP stand for?", o: ["HyperText Transfer Protocol", "Hyperlink Transfer Protocol", "HyperText Transmission Protocol", "Hidden Text Transfer Protocol"], a: 0 }
    ]
  },

  science: {
    school1: [
      { q: "Which one grows on trees and we eat?", o: ["Stone", "Apple", "Rock", "Paper"], a: 1 },
      { q: "Which animal can fly?", o: ["Fish", "Dog", "Bird", "Elephant"], a: 2 },
      { q: "Water is ___ when frozen", o: ["Liquid", "Gas", "Solid", "Plasma"], a: 2 },
      { q: "Sun gives us ___", o: ["Light", "Darkness", "Noise", "Shadow"], a: 0 },
      { q: "Plants need ___ to grow", o: ["Air", "Food", "Sunlight", "TV"], a: 2 },
      { q: "Which color mixes to make purple?", o: ["Red+Blue", "Red+Green", "Blue+Green", "Yellow+Blue"], a: 0 },
      { q: "Which is a flying insect?", o: ["Ant", "Butterfly", "Rat", "Cow"], a: 1 },
      { q: "Ice cream is ___", o: ["Hot", "Warm", "Cold", "Dry"], a: 2 },
      { q: "Which body part sees?", o: ["Ear", "Nose", "Eyes", "Hand"], a: 2 },
      { q: "Which animal lives in water?", o: ["Lion", "Fish", "Cow", "Goat"], a: 1 }
    ],
    school5: [
      { q: "What is the basic unit of life?", o: ["Atom", "Cell", "Molecule", "Organ"], a: 1 },
      { q: "Which gas is used in balloons to float?", o: ["Oxygen", "Hydrogen", "Helium", "Nitrogen"], a: 2 },
      { q: "Which planet is known for its rings?", o: ["Earth", "Mars", "Saturn", "Venus"], a: 2 },
      { q: "We breathe in ___ and breathe out ___", o: ["O2, CO2", "CO2, O2", "N2, O2", "H2, O2"], a: 0 },
      { q: "Photosynthesis happens in which part of plant?", o: ["Root", "Leaf", "Stem", "Flower"], a: 1 },
      { q: "Which state of matter has fixed shape?", o: ["Gas", "Liquid", "Solid", "Plasma"], a: 2 },
      { q: "Which vitamin is abundant in citrus fruits?", o: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], a: 2 },
      { q: "Sound travels fastest in which medium?", o: ["Air", "Vacuum", "Water", "Solid (like metal)"], a: 3 },
      { q: "Which instrument used to measure temperature?", o: ["Barometer", "Thermometer", "Ammeter", "Hygrometer"], a: 1 },
      { q: "What causes day and night?", o: ["Earth revolution", "Earth rotation", "Sun rotation", "Moon rotation"], a: 1 }
    ],
    college: [
      { q: "Newton's second law states that F = ?", o: ["ma", "mv", "m/a", "m+v"], a: 0 },
      { q: "pH of pure water at 25°C is approximately?", o: ["7", "5", "9", "3"], a: 0 },
      { q: "Which particle has negative charge?", o: ["Proton", "Neutron", "Electron", "Alpha"], a: 2 },
      { q: "Which law explains action-reaction?", o: ["First law", "Second law", "Third law", "Law of gravitation"], a: 2 },
      { q: "Speed of light in vacuum (approx)?", o: ["3x10^8 m/s", "3x10^6 m/s", "3x10^4 m/s", "3x10^3 m/s"], a: 0 },
      { q: "DNA stands for?", o: ["Deoxyribonucleic acid", "Ribonucleic acid", "Deoxyribo acid", "None"], a: 0 },
      { q: "Which is a greenhouse gas?", o: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], a: 2 },
      { q: "Unit of electrical resistance?", o: ["Volt", "Ampere", "Ohm", "Watt"], a: 2 },
      { q: "Which part of cell contains genetic material?", o: ["Mitochondria", "Nucleus", "Ribosome", "Vacuole"], a: 1 },
      { q: "Catalyst increases the rate by ___", o: ["consuming more reactants", "lowering activation energy", "increasing activation energy", "changing final products"], a: 1 }
    ]
  },

  sports: {
    school1: [
      { q: "Which sport uses a ball and a bat?", o: ["Swimming", "Cricket", "Chess", "Gymnastics"], a: 1 },
      { q: "How many players in a football (soccer) team on field?", o: ["5", "7", "11", "9"], a: 2 },
      { q: "Which sport uses a net and shuttlecock?", o: ["Tennis", "Badminton", "Boxing", "Archery"], a: 1 },
      { q: "Medal color for first place?", o: ["Bronze", "Silver", "Gold", "Wood"], a: 2 },
      { q: "Which sport played on ice with a puck?", o: ["Hockey(ice)", "Football", "Basketball", "Table Tennis"], a: 0 },
      { q: "Which sport is played on a court with hoops?", o: ["Cricket", "Basketball", "Golf", "Swimming"], a: 1 },
      { q: "Running race is part of?", o: ["Athletics", "Golf", "Bowling", "Yoga"], a: 0 },
      { q: "Sport using racquet and small yellow ball?", o: ["Cricket", "Tennis", "Football", "Kabaddi"], a: 1 },
      { q: "Who hits the ball in cricket?", o: ["Bowler", "Batsman", "Umpire", "Spectator"], a: 1 },
      { q: "Swimming happens in ___", o: ["Court", "Pool", "Field", "Ring"], a: 1 }
    ],
    school5: [
      { q: "How many players in cricket eleven?", o: ["10", "11", "12", "9"], a: 1 },
      { q: "Olympic Games are held every ___ years", o: ["2", "3", "4", "5"], a: 2 },
      { q: "Which country hosts Wimbledon tennis?", o: ["France", "Australia", "UK", "USA"], a: 2 },
      { q: "Which sport uses a shuttlecock?", o: ["Squash", "Badminton", "Tennis", "Cricket"], a: 1 },
      { q: "Who is known as the 'Little Master' in cricket?", o: ["Sachin Tendulkar", "Virat Kohli", "MS Dhoni", "Rohit Sharma"], a: 0 },
      { q: "What is a hat-trick in cricket?", o: ["Three wickets in three balls", "Three sixes", "Three runs", "Three catches"], a: 0 },
      { q: "Basketball team has how many players on court?", o: ["4", "5", "6", "7"], a: 1 },
      { q: "Which sport is called 'Gentleman's game'?", o: ["Cricket", "Football", "Wrestling", "Boxing"], a: 0 },
      { q: "ICC stands for?", o: ["International Cricket Council", "Indian Cricket Council", "International Chess Council", "International Cycling Council"], a: 0 },
      { q: "How long is a standard football match (minutes)?", o: ["60", "80", "90", "120"], a: 2 }
    ],
    college: [
      { q: "Which country won FIFA World Cup 2018?", o: ["Brazil", "France", "Germany", "Argentina"], a: 1 },
      { q: "Who has the most men's Grand Slams (as of 2023)?", o: ["Federer", "Nadal", "Djokovic", "Sampras"], a: 2 },
      { q: "The Ashes is a series between which countries?", o: ["India & Pakistan", "Australia & England", "USA & Canada", "South Africa & Australia"], a: 1 },
      { q: "Which athlete is known for breaking 4-minute mile?", o: ["Roger Bannister", "Usain Bolt", "Mo Farah", "Eliud Kipchoge"], a: 0 },
      { q: "Tour de France is a competition in which sport?", o: ["Motor racing", "Cycling", "Running", "Swimming"], a: 1 },
      { q: "Which is the governing body of soccer?", o: ["ICC", "FIFA", "NBA", "BCCI"], a: 1 },
      { q: "Marathon distance approx.?", o: ["21 km", "42 km", "10 km", "5 km"], a: 1 },
      { q: "What is 'offside' associated with?", o: ["Cricket", "Football (Soccer)", "Basketball", "Tennis"], a: 1 },
      { q: "How many sets in men's Grand Slam tennis final (best of)?", o: ["3", "5", "1", "7"], a: 1 },
      { q: "Which event is track and field?", o: ["High jump", "Swimming", "Gymnastics", "Skiing"], a: 0 }
    ]
  },

  history: { // extra category used earlier skeleton — provide small banks per levels
    school1: [
      { q: "Who was a famous freedom leader in India?", o: ["Mahatma Gandhi", "Spiderman", "Sherlock", "Harry Potter"], a: 0 },
      { q: "We celebrate Independence Day of India on?", o: ["15 Aug", "26 Jan", "2 Oct", "1 May"], a: 0 },
      { q: "Taj Mahal is a ____", o: ["Palace", "Monument", "River", "Mountain"], a: 1 },
      { q: "Which is an old civilization in India?", o: ["Indus Valley", "Roman", "Greek", "Aztec"], a: 0 },
      { q: "Who is known as 'Father of Nation'?", o: ["Gandhi", "Nehru", "Patel", "Bose"], a: 0 },
      { q: "Which is a historical fortress?", o: ["Fort", "Hospital", "Mall", "School"], a: 0 },
      { q: "Qutub Minar is located in which city?", o: ["Agra", "Delhi", "Mumbai", "Chennai"], a: 1 },
      { q: "Who was the first Prime Minister of India?", o: ["Nehru", "Gandhi", "Patel", "Modi"], a: 0 },
      { q: "British left India in which year?", o: ["1947", "1950", "1930", "1919"], a: 0 },
      { q: "Battle of Plassey happened in which century?", o: ["16th", "17th", "18th", "19th"], a: 2 }
    ],
    school5: [
      { q: "Who wrote 'Discovery of India'?", o: ["Nehru", "Gandhi", "Tagore", "Aurobindo"], a: 0 },
      { q: "Which empire built the Qutub Minar?", o: ["Mughal", "Delhi Sultanate", "British", "Chola"], a: 1 },
      { q: "Indus Valley Civilization was mainly in which modern country?", o: ["India & Pakistan", "China", "Egypt", "Greece"], a: 0 },
      { q: "Which leader led the Salt March?", o: ["Subhash Bose", "Gandhi", "Nehru", "Bhagat Singh"], a: 1 },
      { q: "The 'Quit India' movement started in which year?", o: ["1942", "1947", "1930", "1919"], a: 0 },
      { q: "Who was the founder of Maurya Empire?", o: ["Ashoka", "Chandragupta Maurya", "Harsha", "Akbar"], a: 1 },
      { q: "Who was the Mughal emperor during India's golden age (Akbar)?", o: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"], a: 0 },
      { q: "The French colonized which Indian region?", o: ["Pondicherry", "Punjab", "Kerala", "Kashmir"], a: 0 },
      { q: "The battle of Plassey happened in ?", o: ["1757", "1857", "1947", "1620"], a: 0 },
      { q: "Which movement was non-cooperation?", o: ["Civil disobedience", "Salt movement", "Non-cooperation movement", "Quit India"], a: 2 }
    ],
    college: [
      { q: "Who wrote 'The Wonder That Was India'?", o: ["A L Basham", "Nehru", "Bipan Chandra", "Romila Thapar"], a: 0 },
      { q: "Which treaty marked end of Mughal's power?", o: ["Treaty of Allahabad", "Treaty of Versailles", "Treaty of Paris", "Treaty of Lahore"], a: 0 },
      { q: "Which year marks the beginning of Indian National Congress?", o: ["1885", "1905", "1920", "1930"], a: 0 },
      { q: "Who founded the Arya Samaj?", o: ["Dayananda Saraswati", "Ramakrishna", "Ramakrishna Paramahansa", "Vivekananda"], a: 0 },
      { q: "What is 'Satyagraha' associated with?", o: ["Gandhian philosophy", "British policy", "Economics", "Sports"], a: 0 },
      { q: "Which emperor constructed many stupas after converting to Buddhism?", o: ["Chandragupta", "Ashoka", "Harsha", "Kushan"], a: 1 },
      { q: "Which group revolted in 1857 famously?", o: ["Sepoys", "Police", "Merchants", "Farmers"], a: 0 },
      { q: "Which ancient script used in Indus Valley?", o: ["Brahmi", "Kharosthi", "Indus script (undeciphered)", "Devanagari"], a: 2 },
      { q: "The Gupta period is known as the ___ period", o: ["Dark Age", "Golden Age", "Colonial Age", "Modern Age"], a: 1 },
      { q: "What was the main feature of Mughal administration?", o: ["Decentralized feudalism", "Centralized administration and mansabdari", "No taxation", "No army"], a: 1 }
    ]
  }
};

// ---------- UTILS ----------
function pick10Random(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 10);
}

// ---------- STATE ----------
let QUIZ = []; // selected 10 questions
let currentIndex = 0;
let score = 0;
let answersRecord = []; // store {q, y, c, correct}
let timerInterval = null;
let timeLeft = 30;

// ---------- PUBLIC: called on quiz.html load ----------
function startQuizFromStorage() {
  const user = JSON.parse(localStorage.getItem('quiz_user') || 'null');
  const category = localStorage.getItem('quiz_category') || 'general';
  if (!user) return location.href = 'index.html';
  // show user info
  const ui = document.getElementById('userInfo');
  if (ui) ui.innerHTML = `<strong>${user.name}</strong> • Age: ${user.age} • Level: ${user.level} • Category: ${category}`;

  // select bank based on category & user.level
  const level = user.level || 'school1';
  // ensure BANK has the category & level
  const catBank = BANK[category] || BANK.general;
  const levelBank = catBank[level] || (catBank.school5 || catBank.college || Object.values(catBank)[0]);
  // pick 10 random
  QUIZ = pick10Random(levelBank);
  currentIndex = 0; score = 0; answersRecord = [];
  if (document.getElementById('question')) renderQuestion();
}

// ---------- RENDER ----------
function renderQuestion() {
  if (!document.getElementById('question')) return;
  clearInterval(timerInterval);
  timeLeft = 30;
  const qobj = QUIZ[currentIndex];
  document.getElementById('progress').innerText = `Question ${currentIndex + 1} of ${QUIZ.length}`;
  document.getElementById('question').innerText = qobj.q;
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  qobj.o.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.className = 'option-btn';
    btn.onclick = () => selectOption(i);
    opts.appendChild(btn);
  });
  document.getElementById('timer').innerText = `⏰ ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    const tEl = document.getElementById('timer');
    if (tEl) tEl.innerText = `⏰ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // treat as no answer and go next
      recordAnswer(null);
      goNext();
    }
  }, 1000);
}

// ---------- INTERACTIONS ----------
function selectOption(idx) {
  recordAnswer(idx);
  goNext();
}

function recordAnswer(idx) {
  const q = QUIZ[currentIndex];
  const userAnswer = (idx === null ? 'No Answer' : q.o[idx]);
  const correctAnswer = q.o[q.a];
  const correct = (idx === q.a);
  if (idx === q.a) score++;
  answersRecord[currentIndex] = { q: q.q, y: userAnswer, c: correctAnswer, correct };
}

function goNext() {
  clearInterval(timerInterval);
  currentIndex++;
  if (currentIndex < QUIZ.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function nextQuestion() { // wired to Next button if needed
  clearInterval(timerInterval);
  // if user hasn't answered this question, record as no answer
  if (!answersRecord[currentIndex]) recordAnswer(null);
  currentIndex++;
  if (currentIndex < QUIZ.length) renderQuestion();
  else finishQuiz();
}

function prevQuestion() {
  clearInterval(timerInterval);
  if (currentIndex > 0) currentIndex--;
  renderQuestion();
}

// ---------- END ----------
function finishQuiz() {
  clearInterval(timerInterval);
  // save results to localStorage for result page
  const final = { score, total: QUIZ.length, answers: answersRecord };
  localStorage.setItem('quiz_final', JSON.stringify(final));
  // also optionally append to history
  const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
  const user = JSON.parse(localStorage.getItem('quiz_user') || '{}');
  history.push({ user, category: localStorage.getItem('quiz_category'), score, total: QUIZ.length, date: new Date().toISOString() });
  localStorage.setItem('quiz_history', JSON.stringify(history));
  // navigate to result
  location.href = 'result.html';
}

// expose buttons to global (so HTML Next/Prev wired)
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.startQuizFromStorage = startQuizFromStorage;
