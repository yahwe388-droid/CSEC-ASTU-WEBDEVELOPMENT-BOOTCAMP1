const todoInput = document.querySelector('.todo-input');
const addTodoBtn = document.getElementById('addTodoBtn');
const todosList = document.getElementById('todosList');
const totalTodosEl = document.getElementById('totalTodos');
const completedTodosEl = document.getElementById('completedTodos');
const pendingTodosEl = document.getElementById('pendingTodos');
const clearAllBtn = document.getElementById('clearAllBtn');
const emptyState = document.getElementById('emptyState');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let totalTodos = 0;
let completedTodos = 0;
let pendingTodos = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadTodosFromStorage();
    updateStats();
    updateEmptyState();
    updateAddButtonState();
    
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    todoInput.addEventListener('input', updateAddButtonState);
    clearAllBtn.addEventListener('click', clearAllTodos);
});

function loadTodosFromStorage() {
    todos.forEach(todo => {
        createTodoElement(todo);
    });
}

function updateAddButtonState() {
    if (todoInput.value.trim() === '') {
        addTodoBtn.disabled = true;
        addTodoBtn.style.opacity = '0.7';
    } else {
        addTodoBtn.disabled = false;
        addTodoBtn.style.opacity = '1';
    }
}

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a todo item!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    
    saveTodosToStorage();
    
    createTodoElement(todo);
    
    updateStats();
    
    todoInput.value = '';
    updateAddButtonState();
    updateEmptyState();
    
    todoInput.focus();
}

function createTodoElement(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.dataset.id = todo.id;
    
    if (todo.completed) {
        todoItem.classList.add('completed');
    }
    
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todo.text;
    
    const todoActions = document.createElement('div');
    todoActions.className = 'todo-actions';
    
    const completeBtn = document.createElement('button');
    completeBtn.className = 'action-btn complete-btn';
    completeBtn.innerHTML = todo.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
    completeBtn.title = todo.completed ? 'Mark as pending' : 'Mark as complete';
    completeBtn.addEventListener('click', () => toggleCompleteTodo(todo.id));
    
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn edit-btn';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.title = 'Edit todo';
    editBtn.addEventListener('click', () => editTodo(todo.id));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = 'Delete todo';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    todoActions.appendChild(completeBtn);
    todoActions.appendChild(editBtn);
    todoActions.appendChild(deleteBtn);
    
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoActions);
    
    todosList.appendChild(todoItem);
}

function toggleCompleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        
        saveTodosToStorage();
        
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        todoItem.classList.toggle('completed');
        
        const completeBtn = todoItem.querySelector('.complete-btn');
        completeBtn.innerHTML = todos[todoIndex].completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
        completeBtn.title = todos[todoIndex].completed ? 'Mark as pending' : 'Mark as complete';
        
        updateStats();
    }
}

function editTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) return;
    
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const todoText = todoItem.querySelector('.todo-text');
    const todoActions = todoItem.querySelector('.todo-actions');
    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = todos[todoIndex].text;
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    
    todoText.replaceWith(editInput);
    todoActions.style.display = 'none';
    
    todoItem.appendChild(saveBtn);
    
    editInput.focus();
    editInput.select();
    
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
    
    saveBtn.addEventListener('click', saveEdit);
    
    function saveEdit() {
        const newText = editInput.value.trim();
        
        if (newText === '') {
            alert('Todo text cannot be empty!');
            editInput.focus();
            return;
        }
        
        todos[todoIndex].text = newText;
        
        saveTodosToStorage();
        
        const newTodoText = document.createElement('span');
        newTodoText.className = 'todo-text';
        newTodoText.textContent = newText;
        
        editInput.replaceWith(newTodoText);
        saveBtn.remove();
        todoActions.style.display = 'flex';
    }
    
    document.addEventListener('click', function cancelEdit(e) {
        if (!todoItem.contains(e.target) && e.target !== editInput && e.target !== saveBtn) {
            const newTodoText = document.createElement('span');
            newTodoText.className = 'todo-text';
            newTodoText.textContent = todos[todoIndex].text;
            
            editInput.replaceWith(newTodoText);
            saveBtn.remove();
            todoActions.style.display = 'flex';
            
            document.removeEventListener('click', cancelEdit);
        }
    });
}

function deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        
        saveTodosToStorage();
        
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        todoItem.remove();
        
        updateStats();
        updateEmptyState();
    }
}

function clearAllTodos() {
    if (todos.length === 0) {
        alert('No todos to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to delete all todos?')) {
        todos = [];
        
        saveTodosToStorage();
        
        todosList.innerHTML = '';
        
        updateStats();
        updateEmptyState();
    }
}

function updateStats() {
    totalTodos = todos.length;
    completedTodos = todos.filter(todo => todo.completed).length;
    pendingTodos = totalTodos - completedTodos;
    
    totalTodosEl.textContent = totalTodos;
    completedTodosEl.textContent = completedTodos;
    pendingTodosEl.textContent = pendingTodos;
}

function updateEmptyState() {
    if (todos.length === 0) {
        emptyState.style.display = 'block';
        todosList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        todosList.style.display = 'block';
    }
}

function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

if (!localStorage.getItem('todos') || JSON.parse(localStorage.getItem('todos')).length === 0) {
    const sampleTodos = [
        { 
            id: 1, 
            text: 'Learn DOM Manipulation', 
            completed: true, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 2, 
            text: 'Build Todo List App', 
            completed: false, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 3, 
            text: 'Practice JavaScript Events', 
            completed: false, 
            createdAt: new Date().toISOString() 
        },
        { 
            id: 4, 
            text: 'Style with CSS', 
            completed: true, 
            createdAt: new Date().toISOString() 
        }
    ];
    
    localStorage.setItem('todos', JSON.stringify(sampleTodos));
    todos = sampleTodos;
    loadTodosFromStorage();
    updateStats();
    updateEmptyState();
}