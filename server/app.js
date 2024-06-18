const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let todos = [];
let users = [{ username: 'testuser', password: '12345678' }]; 



// Додавання нової задачі
app.post('/todos', (req, res) => {
    const { title } = req.body;
    const newTodo = { id: Date.now(), title };
    todos.push(newTodo);
    res.status(201).send(newTodo);
});

// Отримання всіх задач
app.get('/todos', (req, res) => {
    res.send(todos);
});

// Редагування задачі
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.title = title;
        res.send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Вхід користувача
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Пошук користувача за логіном і паролем
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.send({ user: { username: user.username } });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Видалення задачі
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.send({ id });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
