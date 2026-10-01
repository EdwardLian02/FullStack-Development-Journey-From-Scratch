import { addQuestion, questionList, Question, deleteQuestion, editQuestion } from "./question.js";
import { renderStudentPage } from "./student-page.js";

export function renderTeacherPage() {
    renderStudentPage();    
    console.log('running "renderTeacherPage"')

    const addQuestionBtnEl = document.getElementById('js-add-question-btn');
    const choicesRowSectionEl = document.getElementById('js-choices-row');
    const addChoiceButton = document.getElementById('js-add-choice-button');
    const questionTextareaEl = document.getElementById('js-q-textarea');
    const cancelEditQuestionBtnEl = document.getElementById('js-cancel-btn');
    
    //
    let editQuesID = "";
    let question = "";
    let choices = [
        { id: 'A', text: "" },
        { id: 'B', text: "" },
        { id: 'C', text: "" },
        { id: 'D', text: "" },
    ]
    let answer = "";

    //Render Create Question Form
    renderCreateQuestionForm();
    renderQuestionList();


    addChoiceButton.addEventListener("click", () => {
        addNewChoice();

    });

    function addNewChoice() {

        const nextId = String.fromCharCode(65 + choices.length);
        console.log(nextId)
        choices.push({
            id: nextId,
            text: "",
        })

        renderChoicesRow();
        hideOrDisplayAddChoiceButton()
    }


    function renderChoicesRow() {
        console.log('running "renderChoicesRow"')

        //RENDER choices
        let tempChoice = "";

        choices.forEach((choice) => {
            tempChoice += `
             <div class="choice-row">
                    <span class="radio ${choice.id === answer ? 'radio--checked' : ''}" role="radio" aria-checked="true" data-choice-id = "${choice.id}"><span class="radio__dot"></span></span>
                    <span class="choice-row__letter">${choice.id}</span>
                    <input class="input choice-input" placeholder="Choice ${choice.id}" value ="${choice.text ?? ''}" data-choice-id = "${choice.id}">
                    <!-- Show the remove button only when there are more than 2 choices. -->
                    <button class="choice-remove choice-remove-btn-${choice.id}" type="button" aria-label="Remove choice" ${choices.length <= 2 ? 'hidden' : ''} >&times;</button>
                    </div>
            `;
        });

        choicesRowSectionEl.innerHTML = tempChoice;

        //"REMOVE" choice
        choices.forEach((choice) => {
            document.querySelector(`.choice-remove-btn-${choice.id}`).addEventListener('click', () => {
                removeChoice(choice.id)
            });
        })


        //add text 
        document.querySelectorAll('.choice-input').forEach((input) => {

            input.addEventListener('input', () => {
                const choiceId = input.dataset.choiceId;
                const choice = choices.find((c) => c.id === choiceId);

                choice.text = input.value;
            })
        })


        document.querySelectorAll('.radio').forEach((radio) => {
            radio.addEventListener('click', () => {
                const choiceId = radio.dataset.choiceId;
                answer = choiceId;
                renderChoicesRow()

            })
        })

    }


    function removeChoice(choiceId) {
        choices = choices.filter((c) => c.id != choiceId);

        //Re-arrange ID
        choices.forEach((choice, index) => {
            choice['id'] = String.fromCharCode(65 + index)
        });
        renderChoicesRow();
        hideOrDisplayAddChoiceButton()
    }


      function hideOrDisplayAddChoiceButton() {
            addChoiceButton.hidden = choices.length >= 5 ? true : false;
        }

    function renderCreateQuestionForm() {
        renderStudentPage();   
        console.log('running "renderCreateQuestionForm"')
        if (editQuesID) {
            addQuestionBtnEl.textContent = "Save Change";
            cancelEditQuestionBtnEl.hidden = false;
        } else {
            addQuestionBtnEl.textContent = "Add Question";
            cancelEditQuestionBtnEl.hidden = true;
        }

        //handle Edit cancel
        cancelEditQuestionBtnEl.addEventListener('click', () => {
            clearForm();
            renderCreateQuestionForm();
        })




        questionTextareaEl.value = question;
        questionTextareaEl.addEventListener('input', (event) => {
            question = event.target.value;
            console.log(question)
        })



        renderChoicesRow();


        addQuestionBtnEl.addEventListener('click', () => {

            hideOrDisplayAddChoiceButton();
            //If not edit
            if (!editQuesID) {
                const allTextFill = choices.every((c) => c.text !== '');
                if (!allTextFill) return;
                if (!answer) return;
                addQuestion(new Question({
                    question: question,
                    choices: choices,
                    answer: answer,
                },))

                //If edit
            } else {
                editQuestion({
                    editQuesId: editQuesID,
                    answer: answer,
                    choices: choices,
                    question: question
                });
            }

            renderTeacherPage();
            // renderCreateQuestionForm();
            clearForm();
        });



      

        function clearForm() {
            editQuesID = "";
            question = "";
            choices = [
                { id: 'A', text: "" },
                { id: 'B', text: "" },
                { id: 'C', text: "" },
                { id: 'D', text: "" },
            ]
            answer = "";
            document.getElementById('js-q-textarea').value = "";
        }

    }








    //Display question secton
    function renderQuestionList() {
        renderStudentPage();

        const qCardEl = document.getElementById('js-q-card-section');

        let qCardListHTML = "";
        questionList.forEach((q) => {
            let choiceHTML = "";
            q.choices.forEach((choice) => {
                choiceHTML += `
                <li class="q-option ${q.answer === choice.id ? 'q-option--correct' : ''}">
                <span class="q-option__letter">${choice.id}</span><span class="q-option__text">${choice.text}</span>
                ${q.answer === choice.id ? ' <span class="q-option__mark">&#10003;Correct</span>' : ''}
                </li>
        `
            })

            qCardListHTML += `
    
         <article class="q-card">
            <div class="q-card__head">
              <span class="q-card__num">Q1</span>
              <p class="q-card__text">${q.question}</p>
              <div class="q-card__actions">
                <button class="btn btn--tertiary btn--sm js-question-edit-btn-${q.id}" type="button">Edit</button>
                <button class="btn btn--tertiary btn--sm js-question-delete-btn-${q.id}" type="button" style="color: var(--red-700);"
                data-question-id="${q.id}"
                >Delete</button>
              </div>
            </div>
            <ul class="q-options">
                ${choiceHTML}
            </ul>
          </article>
    `
        });

        qCardEl.innerHTML = qCardListHTML;


        //DELETE Question button
        questionList.forEach((q) => {
            document.querySelector(`.js-question-delete-btn-${q.id}`).addEventListener('click', () => {

                deleteQuestion(q);
                renderQuestionList();
            });
        })


        //Edit question button 
        questionList.forEach((q) => {
            document.querySelector(`.js-question-edit-btn-${q.id}`).addEventListener('click', () => {
                const questionObj = questionList.find((ques) => ques.id === q.id);
                editQuesID = questionObj.id;
                question = questionObj.question;
                choices = questionObj.choices;
                answer = questionObj.answer;
                renderCreateQuestionForm();
            });
        })


    }

}


