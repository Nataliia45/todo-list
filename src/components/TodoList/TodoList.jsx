
import React, { useState } from 'react';
import AddTodoItemForm from '../AddTodoItemForm/AddTodoItemForm';
import './TodoList.scss';

const TodoList = ({ todos, onAddTodo, onEditTodo, onDeleteTodo }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditingTitle(todo.title);
  };

  const handleSave = () => {
    if (editingTitle.trim()) {
      onEditTodo(editingTodo, editingTitle);
      setEditingTodo(null);
      setEditingTitle('');
    }
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setEditingTitle('');
  };

  return (
    <div className="TodoList">
      <h3>Todo List</h3>
      <AddTodoItemForm onAddTodo={onAddTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{todo.title}</span>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
