const quote_element = document.getElementById('text');
const input_element = document.getElementById('input');
const timer_element = document.getElementById('timer');
const accuracy_element = document.getElementById('accuracy');
const wrong_element = document.getElementById('wrong');
const speed_element = document.getElementById('typing-speed');
const start_button = document.getElementById('start-button');
const reset_button = document.getElementById('reset-button');
const next_button = document.getElementById('next-button');
const game_area = document.getElementById('game-area');
const result = document.getElementById('result');

let start_time, end_time, timer_interval;

// generate a random quote
const quotes = [
    "to be or not to be that is the question",
    "the quick brown fox jumps over the lazy dog",
    "life is like riding a bicycle to keep your balance you must keep moving"
];

function get_random_quote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// event listener for start button 
start_button.addEventListener('click', () => {
    start_typing();
});

// event listener for keypress
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        start_typing();
        event.preventDefault(); // Prevent form submission if Enter is pressed
    }
});

// event listener for next button 
next_button.addEventListener('click', () => {
    start_typing();
});

// event listener for reset button 
reset_button.addEventListener('click', () => {
    start_typing();
});

// function to start the game 
function start_typing() {
    const quote = get_random_quote();
    quote_element.innerText = quote;
    game_area.style.display = 'block';
    result.style.display = 'flex';
    start_button.style.display = 'none';
    next_button.style.display = 'none';
    input_element.value = '';
    input_element.focus();
    start_time = new Date();
    timer_interval = setInterval(update_timer, 1000);
}

// event listener to start typing
input_element.addEventListener('input', () => {
    const input_text = input_element.value;
    const quote_text = quote_element.innerText;
    const quote_words = quote_text.split(' ');
    const input_words = input_text.split(' ');
    let correct_words = 0;

    // calculate correct words 
    for (let i = 0; i < input_words.length; i++) {
        if (input_words[i] === quote_words[i]) {
            correct_words++;
        }
    }

    // calculate typing speed 
    const elapsed_time = (end_time - start_time) / 1000; 
    const typing_speed = Math.round((correct_words / elapsed_time) * 60);

    // update stats 
    const accuracy = Math.round((correct_words / quote_words.length) * 100);
    const wrong_letters = count_wrong_letter(input_text, quote_text);
    
    accuracy_element.innerText = accuracy;
    wrong_element.innerText = wrong_letters;
    speed_element.innerText = typing_speed;

    // check if the input matches the text 
    if (input_text === quote_text) {
        clearInterval(timer_interval);
        next_button.style.display = 'block';
    }
});

// function to update the timer 
function update_timer() {
    const current_time = new Date();
    const elapsed_time = (current_time - start_time) / 1000;
    const minutes = Math.floor(elapsed_time / 60);
    const seconds = Math.floor(elapsed_time % 60);
    timer_element.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    end_time = current_time;
}

// function to count wrong letters 
function count_wrong_letter(input, quote) {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== quote[i]) {
            count++;
        }
    }
    return count;
}
