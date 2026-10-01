export class Question {

    constructor(parameter) {
        this.id = crypto.randomUUID();
        this.question = parameter.question;
        this.choices = parameter.choices;
        this.answer = parameter.answer;
    }

}


export let questionList = [
    new Question({
        question: "What is JavaScript?",
        choices: [
            { id: "a", text: "A programming language" },
            { id: "b", text: "A database" },
            { id: "c", text: "An operating system" },
            { id: "d", text: "An test system" }
        ],
        answer: "a"
    },),

    new Question({
        question: "What does HTML stand for?",
        choices: [
            { id: "a", text: "Hyper Text Markup Language" },
            { id: "b", text: "High Tech Modern Language" },
            { id: "c", text: "Home Tool Markup Language" }
        ],
        answer: "a"
    })

]


export function getQuestion(id){
    return questionList.find((q) => q.id === id);
}



export function addQuestion(question) {
    questionList.push(question);
}


export function editQuestion({ editQuesId, answer, choices, question }) {
     console.log('running "editQuestion"')
    questionList = questionList.map((q) => {
        if (q.id === editQuesId) {
            return {
                id: q.id,
                answer: answer,
                choices: choices,
                question: question,
            }
        }
        return q;
    });

}

export function deleteQuestion(question) {
    questionList = questionList.filter((q) => q.id !== question.id);
}