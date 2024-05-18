const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        if(isDuplicate(todoText)){
            alert('This task already exists!');
            return;
        }
        const li = document.createElement('li');

        const div=document.createElement('div');
        div.style.display='flex';
        div.style.alignItems='center';

        const checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.style.marginRight='10px';

        const span = document.createElement('span');
        span.textContent = todoText;
        span.style.flexGrow = '1';

        const deleteBtn=document.createElement('button');
        deleteBtn.textContent='Delete';
        deleteBtn.style.marginLeft='10px';
        deleteBtn.addEventListener('click',function(){
            todoList.removeChild(li);
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(deleteBtn);

        li.appendChild(div);
        todoList.appendChild(li);
        todoInput.value = '';

        
    }
}

function isDuplicate(todoText){
    const items=todoList.getElementsByTagName('li');
    for(let i=0;i<items.length;i++){
        const itemText=items[i].querySelector('span').textContent;
        if(itemText===todoText){
            return true;
        }
    }
    return false;
}
