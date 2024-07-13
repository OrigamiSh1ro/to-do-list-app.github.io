document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const progressBar = document.getElementById('progress-bar');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
                    <button onclick="removeItem(${index})">✗</button>
                </div>
            `;
            todoList.appendChild(li);
        });
        updateProgressBar();
    };

    const addTodo = (text) => {
        todos.push({ text, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    };

    const removeItem = (index) => {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    };

    const toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    };

    const updateProgressBar = () => {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const percentage = total === 0 ? 0 : (completed / total) * 100;
        
        progressBar.style.width = `${percentage}%`;

        if (percentage === 100) {
            progressBar.style.background = 'green';
        } else if (percentage >= 50) {
            progressBar.style.background = 'yellow';
        } else {
            progressBar.style.background = 'red';
        }
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = '';
        }
    });

    renderTodos();

    // Expose functions to global scope
    window.removeItem = removeItem;
    window.toggleComplete = toggleComplete;
});
