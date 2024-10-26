import React from 'react';

function EditTodo({
  editingTitle,
  editingDeadline,
  setEditingTitle,
  setEditingDeadline,
  saveEdit,
  cancelEdit,
  todoId,
}) {
  return (
    <div>
      <input
        type="text"
        value={editingTitle}
        onChange={(e) => setEditingTitle(e.target.value)}
        placeholder="Edit Todo Title"
      />
      <input
        type="date"
        value={editingDeadline}
        onChange={(e) => setEditingDeadline(e.target.value)}
        placeholder="Edit Deadline"
      />
      <button onClick={() => saveEdit(todoId)}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
    </div>
  );
}

export default EditTodo;