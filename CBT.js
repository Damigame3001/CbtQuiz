let time = 3600
let countDown = time; // Updated to one hour

// Convert total seconds to hours, minutes, and seconds format for initial display
let initialDisplay = formatTime(countDown);
countdown.innerHTML = initialDisplay;

// Update countdown timer every second
setInterval(() => {
    if (countDown > 0) {
        countDown--;
        countdown.innerHTML = formatTime(countDown);
    } else {
        countdown.innerHTML = 'time up';
    }
}, 1000);

function formatTime(seconds) {
    // Function to format time in HH:MM:SS format
    let hours = Math.floor(seconds / time);
    let minutes = Math.floor((seconds % time) / 60);
    let remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

let score = [];
// Questions are easily modifiable
let questions = [
    {
        question: 'why do i love javascript?',
        options: ['money', 'passion', 'fun'],
        answer: 'money'
    },
    {
        question: 'what is my name?',
        options: ['Dami', 'micheal', 'nath'],
        answer: 'Dami'
    },
    {
        question: 'who is better?',
        options: ['davido', 'wizkid', 'burnaboy'],
        answer: 'davido'
    },
    {
        question: 'which anime is better?',
        options: ['naruto', 'bleach', 'attack on titan'],
        answer: 'attack on titan'
    },
    {
        question: 'what gender am I?',
        options: ['girl', 'boy', 'non-binary'],
        answer: 'boy'
    },
    {
        question: 'what is 1 + 1?',
        options: [5, 2, 3],
        answer: '2'
    }
];

let count = 0;
display(`<button onclick="moveForward()"> Next</button>`);

function moveForward() {
    if (count == (questions.length - 2)) {
        count++;
        display(`<button onclick="submit()"> submit </button>`);
    } else {
        count++;
        display('<button onclick="moveForward()"> Next</button>');
    }
}

function moveBackward() {
    if (count == 0) {
        display(`<button onclick="moveForward()"> Next</button>`);
    } else {
        count--;
        display(`<button onclick="moveForward()"> Next</button>`);
    }
}

function display(button = '') {
    cbt.innerHTML = `
            <p>${count + 1}    </p>
            <h1> ${questions[count].question} </h1>
            <input onclick="check(event, ${count})" value="${questions[count].options[0]}" id="option1" name="option" type="radio"> 
            <label for="option1" > ${questions[count].options[0]} </label> <br>

            <input onclick="check(event , ${count})" value="${questions[count].options[1]}" id="option2" name="option" type="radio">
            <label for="option2" > ${questions[count].options[1]}  </label>  <br>

            <input onclick="check(event, ${count})" value="${questions[count].options[2]}" id="option3" name="option" type="radio">
            <label for="option3" > ${questions[count].options[2]}  </label> <br>
            
            <button onclick="moveBackward()"> Prev </button> 
            ${button}    <br>
        `;
}

function check(event, index) {
    console.log(event.target.value);
    if (event.target.value === questions[index].answer) {
        score.splice(index, 1, 1);
    } else {
        score.splice(index, 1, 0);
    }

    console.log(score);
}

function submit() {
    let confirm = window.confirm("are you sure?");
    if (confirm) {
        showScore();
    } else {
        display(`<button onclick="submit()"> submit </button>`);
    }
}

function showScore() {
    cbt.innerHTML = `<p> your score is ${score.reduce((a, b) => a + b, 0)} / ${questions.length} </p>`;
}