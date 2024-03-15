window.controller = null;
window.timeoutBuffer = [];

let questionText = document.getElementById("question-text");
let questionCategory = document.getElementById("question-category");
// let buttons = [
//     document.getElementById("answer-1"),
//     document.getElementById("answer-2"),
//     document.getElementById("answer-3"),
//     document.getElementById("answer-4")
// ]
let buttons = []

const delay = (ms) => {
    return new Promise((res, rej) => {
        const timeoutId = setTimeout(res, ms);
        window.timeoutBuffer.push(() => clearTimeout(timeoutId));
        window.controller.signal.addEventListener('abort', rej);
    })
};

async function clearTimeouts() {
    window.controller.abort();
    for (let i = 0; i < window.timeoutBuffer.length; i++) {
        window.timeoutBuffer[i]();
    }
    window.timeoutBuffer = [];
}

const categories = [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
]

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function displayNewQuestion() {
    buttons = []
    document.getElementById("button-container").innerHTML = ""

    const questionCount = window.questions.length;
    let questionNumber = 0;

    let randomQuestion = window.questions.pop();
    window.correctAnswer = randomQuestion["correct_answer"];
    let questionAnswers = randomQuestion["incorrect_answers"];
    questionAnswers.push(window.correctAnswer);
    questionAnswers = shuffle(questionAnswers)

    // Below code is the basic alert/prompt interface
    questionText.innerHTML = randomQuestion["question"]
    questionCategory.innerHTML = randomQuestion["category"]
    
    // Create and add handlers to buttons
    for(let i = 0; i < questionAnswers.length; i++) {
        let tempButton = document.createElement("button");
        tempButton.id = "button-" + i;
        tempButton.innerHTML = questionAnswers[i];
        
        tempButton.addEventListener("click", (e) => {
            console.log(e.target.innerText);

            if (e.target.innerText === window.correctAnswer) {
                alert("Correct!")
            } else {
                alert(`Incorrect! Correct answer was ${window.correctAnswer}`)
            }

            displayNewQuestion();
        })

        buttons.push(tempButton);
        document.getElementById("button-container").appendChild(tempButton);
    }
}

async function main() {
    window.controller = new AbortController();

    let request = await fetch("https://opentdb.com/api.php?amount=10&type=multiple&category=")
    let body = await request.json();

    let questions = shuffle(body["results"]);
    window.questions = questions;
    
    displayNewQuestion();
    /*
    {
        "response_code": 0,
        "results": [
            {
                "type": "multiple",
                "difficulty": "hard",
                "category": "Science: Computers",
                "question": "What type of sound chip does the Super Nintendo Entertainment System (SNES) have?",
                "correct_answer": "ADPCM Sampler",
                "incorrect_answers": [
                    "FM Synthesizer",
                    "Programmable Sound Generator (PSG)",
                    "PCM Sampler"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "medium",
                "category": "Celebrities",
                "question": "Which of these celebrities was not a member of the Jackson 5?",
                "correct_answer": "Bo Jackson",
                "incorrect_answers": [
                    "Tito Jackson",
                    "Jermaine Jackson",
                    "Marlon Jackson"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "easy",
                "category": "Entertainment: Video Games",
                "question": "In Danganronpa: Trigger Happy Havoc, what is the protagonist&#039;s name?",
                "correct_answer": "Makoto Naegi",
                "incorrect_answers": [
                    "Hajime Hinata",
                    "Nagito Komaeda",
                    "Komaru Naegi"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "medium",
                "category": "Entertainment: Video Games",
                "question": "In &quot;Overwatch,&quot; what is the hero McCree&#039;s full name?",
                "correct_answer": "Jesse McCree",
                "incorrect_answers": [
                    "Jack &quot;McCree&quot; Morrison",
                    "Gabriel Reyes",
                    "Jamison &quot;Deadeye&quot; Fawkes"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "medium",
                "category": "Entertainment: Television",
                "question": "In the show &quot;The Office&quot; who does Michael Scott eventually end up with?",
                "correct_answer": "Holly Flax",
                "incorrect_answers": [
                    "Angela Martin",
                    "Jan Levinson",
                    "Pam Beesly"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "medium",
                "category": "General Knowledge",
                "question": "What is the Swedish word for &quot;window&quot;?",
                "correct_answer": "F&ouml;nster",
                "incorrect_answers": [
                    "H&aring;l",
                    "Sk&auml;rm",
                    "Ruta"
                ]
            },
            {
                "type": "boolean",
                "difficulty": "easy",
                "category": "Entertainment: Television",
                "question": "In Battlestar Galactica (2004), Cylons were created by man as cybernetic workers and soldiers.",
                "correct_answer": "True",
                "incorrect_answers": [
                    "False"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "easy",
                "category": "General Knowledge",
                "question": "Which candy is NOT made by Mars?",
                "correct_answer": "Almond Joy",
                "incorrect_answers": [
                    "M&amp;M&#039;s",
                    "Twix",
                    "Snickers"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "easy",
                "category": "Science: Computers",
                "question": "In &quot;Hexadecimal&quot;, what color would be displayed from the color code? &quot;#00FF00&quot;?",
                "correct_answer": "Green",
                "incorrect_answers": [
                    "Red",
                    "Blue",
                    "Yellow"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "medium",
                "category": "Entertainment: Music",
                "question": "The 1952 musical composition 4&#039;33&quot;, composed by prolific American composer John Cage, is mainly comprised of what sound?",
                "correct_answer": "Silence",
                "incorrect_answers": [
                    "Farts",
                    "People talking",
                    "Cricket chirps"
                ]
            }
        ]
    }
    */
}

document.addEventListener('DOMContentLoaded', main);