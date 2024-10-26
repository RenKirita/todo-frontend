import React from 'react';
import TodoItem from './TodoItem';

function TodoList({
  todos,
  filterCategory,
  toggleTodoCompletion,
  handleDeleteTodo,
  startEditing,
  editingTodo,
  editingTitle,
  editingDeadline,
  setEditingTitle,
  setEditingDeadline,
  saveEdit,
  cancelEdit,
}) {
  const filteredTodos = filterCategory
    ? todos.filter((todo) => todo.category === filterCategory)
    : todos;

  return (
    <div>
      <ul>
        {filteredTodos.map((todo) =>
          todo.id === editingTodo ? (
            // 編集モードのUI
            <li key={todo.id}>
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                placeholder="Edit title"
              />
              <input
                type="date"
                value={editingDeadline}
                onChange={(e) => setEditingDeadline(e.target.value)}
                placeholder="Edit deadline"
              />
              <button onClick={() => saveEdit(todo.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </li>
          ) : (
            // 通常のTodoアイテム表示
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodoCompletion={toggleTodoCompletion}
              handleDeleteTodo={handleDeleteTodo}
              startEditing={startEditing}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default TodoList;