
import React, { useState } from 'react';
import './AddTodoItemForm.scss';

const AddTodoItemForm = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="AddTodoItemForm">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddTodoItemForm;
