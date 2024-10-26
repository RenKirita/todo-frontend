import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ handleAddTodo }) {
  const [newTodo, setNewTodo] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddTodo({ title: newTodo, deadline: newDeadline, category: newCategory });
    setNewTodo('');
    setNewDeadline('');
    setNewCategory('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <input
        type="date"
        value={newDeadline}
        onChange={(e) => setNewDeadline(e.target.value)}
        placeholder="Deadline"
      />
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Category"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;