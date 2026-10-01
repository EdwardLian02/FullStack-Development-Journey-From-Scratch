import { questionList, getQuestion } from "./question.js";




let studentAnswers = []
const quizCardDisplayEl = document.querySelector('.quiz-card-display-section');
const submitBarCountEl = document.querySelector('.js-submit-bar-count');
const answerSubmitBtnEl = document.querySelector('.js-answer-submit-btn');
const resultDisplayEl = document.querySelector('.js-result-display');
const headerCountEl = document.querySelector('.js-header-count');


let isSubmited = false;

answerSubmitBtnEl.addEventListener('click', () => {
    studentAnswers = studentAnswers.map((sa) => {
        const question = getQuestion(sa.questionId);
        return {
            questionId: sa.questionId,
            selectedChoiceId: sa.selectedChoiceId,
            correctChoice: question.answer,
        }

    });

    isSubmited = true;
    resultDisplayEl.hidden = false;
    resultDisplayEl.innerHTML = `
          <div class="stack" style="gap: 4px;">
            <span class="result__label">Your score</span>
            <span class="result__score" data-score>${calculateScore()}/${studentAnswers.length}</span>
            <span class="result__message" data-score-message>${getMessage()}</span>
          </div>
          <button class="btn btn--secondary js-reset-btn" type="button" data-retry >Try Again</button>
    `

    document.querySelector('.js-reset-btn').addEventListener('click', ()=> resetAnswer())
    renderStudentPage();
});

function calculateScore(){
    let score = 0;
    studentAnswers.forEach((sa) =>{
        if(sa.selectedChoiceId === sa.correctChoice){
            score++;
        }
    })

    return score;
}

function getMessage(){
    return calculateScore() === studentAnswers.length? 'Perfecto!!!': 'Nice work. Review the ones you missed below.';
}


function resetAnswer(){
    studentAnswers = [];
    isSubmited = false;
    resultDisplayEl.hidden = true;
    answerSubmitBtnEl.disabled = true;
    renderStudentPage();
}

renderStudentPage();
export function renderStudentPage() {

    if (studentAnswers.length === questionList.length) {
        answerSubmitBtnEl.disabled = false;
    } else {
        answerSubmitBtnEl.disabled = true;
    }

    //setting header count
    headerCountEl.innerHTML = `${questionList.length} questions`;


    submitBarCountEl.innerHTML = `${studentAnswers.length} of ${questionList.length} answer`;

    let quizDisplayHTML = "";
    questionList.forEach((q, index) => {

        let choiceDisplayHTML = "";

        q.choices.forEach((choice) => {

            //First -> see if submit
            //second -> check if the user ansewr is correct? 
            //third -> if wrong, show it is wrong 
            //fourth -> display correct one. 


            console.log(checkIfChoiceIsSelected(q.id, choice.id))
            const answerResultClass = getAnswerClass(q, choice.id)

            if (isSubmited) {
                choiceDisplayHTML += `
                 <div class="answer ${answerResultClass}">
                    <span class="radio js-radio ${checkIfChoiceIsSelected(q.id, choice.id) ? 'radio--checked' : ''}" role="radio" aria-checked="false" data-choice-id="${choice.id}" data-question-id="${q.id}"><span class="radio__dot"></span></span>
                    <span class="answer__text">${choice.text}</span>
                    <span class="answer__tag"></span>
                </div>
            `
            } else {
                choiceDisplayHTML += `
                 <div class="answer">
                    <span class="radio js-radio ${checkIfChoiceIsSelected(q.id, choice.id) ? 'radio--checked' : ''}" role="radio" aria-checked="false" data-choice-id="${choice.id}" data-question-id="${q.id}"><span class="radio__dot"></span></span>
                    <span class="answer__text">${choice.text}</span>
                    <span class="answer__tag"></span>
                </div>
            `
            }


        })


        quizDisplayHTML += `
             <article class="quiz-card">
                <div class="quiz-card__head">
                <span class="quiz-card__step">Question ${index + 1} of ${questionList.length}</span>
                <!-- Badge — reveal after grading; swap --success / --danger. -->
                <span class="badge badge--sm badge--success" data-badge hidden>Correct</span>
                </div>
                <p class="quiz-card__question">${q.question}</p>
                <div class="quiz-options">
               ${choiceDisplayHTML}
                </div>
          </article>
        `

    });

    quizCardDisplayEl.innerHTML = quizDisplayHTML;


    document.querySelectorAll('.js-radio').forEach((radio) => {
        radio.addEventListener('click', () => {
            const choiceId = radio.dataset.choiceId;
            const questionId = radio.dataset.questionId;

            const saObj = studentAnswers.find((sa) => sa.questionId === questionId);
            if (!saObj) {
                studentAnswers.push({
                    questionId: questionId,
                    selectedChoiceId: choiceId,
                    correctChoice: null,
                });
            } else {
                saObj.selectedChoiceId = choiceId;
            }

            renderStudentPage()
            console.log(studentAnswers)
        })
    })
}



function checkIfChoiceIsSelected(currentQuestionId, choiceId) {

    const studentAns = studentAnswers.find((sa) => sa.questionId === currentQuestionId);
    if (studentAns) {
        return studentAns.selectedChoiceId === choiceId
    }
    return false;
}


function checkIfChoiceIsCorrect(currentQuestion) {
    const studentAns = studentAnswers.find((sa) => sa.questionId === currentQuestion.id);

    return studentAns.selectedChoiceId === studentAns.correctChoice
}



function getAnswerClass(question, choiceId) {
    const selected = checkIfChoiceIsSelected(question.id, choiceId);

    if (!isSubmited) {
        return selected ? "radio--checked" : "";
    }

    const isCorrectAnswer = question.answer === choiceId;

    if (isCorrectAnswer) {
        return "answer--correct";
    }

    if (selected && !isCorrectAnswer) {
        return "answer--wrong";
    }

    return "";
}