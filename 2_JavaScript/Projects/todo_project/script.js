let todos = JSON.parse(localStorage.getItem('todos')) || [] ;
let todoDisplayEl = document.getElementById('todolist-display');

document.getElementById('name-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

 document.getElementById('date-input').addEventListener('keydown', (event) =>{
    if (event.key === 'Enter') {
        addTodo();
    }
});

rendering();


function addTodo(){
    const nameInputEl = document.getElementById('name-input');
    const dateInputEl = document.getElementById('date-input');
    console.log(nameInputEl.value)
    const name = nameInputEl.value;
    const date = dateInputEl.value;

    if(!name || !date){
        return ;
    }

    todos.push({
        name: name, 
        date: date,
    });

    updateToLocalStorage();

    nameInputEl.value = '';
    dateInputEl.value = '';

    console.log(todos)
    
    rendering();
}


function rendering(){
    
    let displayHTML = "";
    for (let i = 0; i < todos.length; i++) {

        const html = `
            <div>${todos[i].name}</div>
            <div>${todos[i].date}</div>
            <div><button class="delete-button" onclick="
                deleteTodo(${i});
            "
            >Delete</button></div>
        `;

        displayHTML += html;
        
    }

    todoDisplayEl.innerHTML = displayHTML;
}

function deleteTodo(i){
    todos.splice(i, 1);
    updateToLocalStorage();
    rendering();
}



function updateToLocalStorage(){
    const jsonString = JSON.stringify(todos);
    localStorage.setItem('todos', jsonString);
}