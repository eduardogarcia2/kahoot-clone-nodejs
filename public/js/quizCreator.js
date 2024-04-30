var socket = io();
var questionNum = 1; //Starts at two because question 1 is already present

function updateDatabase() {
    var questions = [];
    var name = document.getElementById('name').value;

    // Procesar la primera pregunta de tipo multipleChoice
    var question1 = document.getElementById('q1').value;
    var answers1 = [
        document.getElementById('1a1').value,
        document.getElementById('1a2').value,
        document.getElementById('1a3').value,
        document.getElementById('1a4').value
    ];
    var correct1 = document.getElementById('correct1').value;
    questions.push({ "question": question1, "answers": answers1, "correct": correct1, "type": "multipleChoice" });

    // Procesar las preguntas agregadas dinámicamente
    for (var i = 2; i <= questionNum; i++) {
        var question = document.getElementById('q' + i).value;
        var questionType = document.getElementById('q' + i).getAttribute('data-type');

        if (questionType === 'multipleChoice') {
            var answer1 = document.getElementById(i + 'a1').value;
            var answer2 = document.getElementById(i + 'a2').value;
            var answer3 = document.getElementById(i + 'a3').value;
            var answer4 = document.getElementById(i + 'a4').value;
            var correct = document.getElementById('correct' + i).value;
            var answers = [answer1, answer2, answer3, answer4];
            questions.push({ "question": question, "answers": answers, "correct": correct, "type": questionType });
        } else if (questionType === 'trueOrFalse') {
            var correct = document.getElementById('correct' + i).value;
            questions.push({ "question": question, "correct": correct, "type": questionType });
        }
    }

    var quiz = { id: 0, "name": name, "questions": questions };
    socket.emit('newQuiz', quiz);
}

function addMultipleChoiceQuestion() {
    questionNum += 1;

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement("div");

    newQuestionDiv.classList.add('question-field-class');

    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');

    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');

    var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('input');

    var answer3Label = document.createElement('label');
    var answer3Field = document.createElement('input');

    var answer4Label = document.createElement('label');
    var answer4Field = document.createElement('input');

    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');

    questionLabel.innerHTML = "Pregunta " + String(questionNum) + ": ";
    questionField.setAttribute('data-type', 'multipleChoice');
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');

    answer1Label.innerHTML = "Respuesta 1: ";
    answer2Label.innerHTML = "Respuesta 2: ";
    answer3Label.innerHTML = "Respuesta 3: ";
    answer4Label.innerHTML = "Respusta 4: ";
    correctLabel.innerHTML = "Respuesta correcta (1-4): ";

    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('class', 'answers');
    answer1Field.setAttribute('type', 'text');
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('class', 'answers');
    answer2Field.setAttribute('type', 'text');
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('class', 'answers');
    answer3Field.setAttribute('type', 'text');
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('class', 'answers');
    answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('class', 'correct');
    correctField.setAttribute('type', 'number');

    newQuestionDiv.setAttribute('id', 'question-field-' + questionNum);//Sets class of div

    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    newQuestionDiv.appendChild(answer2Label);
    newQuestionDiv.appendChild(answer2Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer3Label);
    newQuestionDiv.appendChild(answer3Field);
    newQuestionDiv.appendChild(answer4Label);
    newQuestionDiv.appendChild(answer4Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);

    console.log(questionNum);

    if (questionNum > 1) {
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Eliminar";
        deleteButton.setAttribute('class', 'delete-question');
        deleteButton.setAttribute('onclick', 'deleteQuestion(' + questionNum + ')');

        // Añadir el botón de eliminar al final de la pregunta
        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(deleteButton);
    }

    questionsDiv.appendChild(document.createElement('br'));//Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
}

function addTrueOrFalseQuestion() {
    questionNum += 1;

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement("div");
    newQuestionDiv.classList.add('question-field-class');

    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');

    var correctLabel = document.createElement('label');
    var correctField = document.createElement('select');

    questionLabel.innerHTML = "Pregunta " + String(questionNum) + ": ";
    questionField.setAttribute('data-type', 'trueOrFalse');
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');

    correctLabel.innerHTML = "Respuesta correcta: ";

    // Opciones para el campo de selección de la respuesta correcta
    var option1 = document.createElement('option');
    option1.value = '1';
    option1.text = 'Verdadero';
    var option2 = document.createElement('option');
    option2.value = '2';
    option2.text = 'Falso';

    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('class', 'correct');
    correctField.appendChild(option1);
    correctField.appendChild(option2);

    newQuestionDiv.setAttribute('id', 'question-field-' + questionNum);

    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);

    if (questionNum > 1) {
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Eliminar";
        deleteButton.setAttribute('class', 'delete-question');
        deleteButton.setAttribute('onclick', 'deleteQuestion(' + questionNum + ')');

        newQuestionDiv.appendChild(document.createElement('br'));
        newQuestionDiv.appendChild(deleteButton);
    }

    questionsDiv.appendChild(document.createElement('br'));
    questionsDiv.appendChild(newQuestionDiv);
}

function deleteQuestion(questionNumber) {
    var questionDiv = document.getElementById('question-field-' + questionNumber);

    if (questionDiv) {
        questionDiv.parentNode.removeChild(questionDiv);
        questionNum--;
        updateQuestionNumbers();
    }
}


function updateQuestionNumbers() {
    var questionsDiv = document.getElementById('allQuestions');
    var questions = questionsDiv.getElementsByClassName('question');

    for (var i = 0; i < questions.length; i++) {
        var questionNumber = i + 1;
        questions[i].id = 'q' + questionNumber;
        questions[i].nextElementSibling.id = questionNumber + 'a1';
        questions[i].nextElementSibling.nextElementSibling.id = questionNumber + 'a2';
        questions[i].nextElementSibling.nextElementSibling.nextElementSibling.id = questionNumber + 'a3';
        questions[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.id = questionNumber + 'a4';
        questions[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.id = 'correct' + questionNumber;
    }

    questionNum = questions.length;
}

function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

//Called when user wants to exit quiz creator
function cancelQuiz() {
    // if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
    //     window.location.href = "../";
    // }
    window.location.href = "../";
}

socket.on('startGameFromCreator', function (data) {
    window.location.href = "../../host/?id=" + data;
});