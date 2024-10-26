// src/components/TodoItem.js
import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, toggleTodoCompletion, handleDeleteTodo, startEditing }) {
  const isOverdue = new Date(todo.deadline) < new Date();

  return (
    <li className="TodoItem">
      {/* チェックボックスにのみ cursor: pointer を適用 */}
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoCompletion(todo.id, todo.completed)}
      />
      <span className={`todoText ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
        {todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}
        {todo.deadline && ` (Deadline: ${todo.deadline})`}
        {todo.category && ` [Category: ${todo.category}]`}
      </span>
      <button onClick={() => handleDeleteTodo(todo.id)}>
        Delete
      </button>
      <button onClick={() => startEditing(todo)}>
        Edit
      </button>
    </li>
  );
}

export default TodoItem;