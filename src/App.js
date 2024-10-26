import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import CalendarView from './components/CalendarView';
import EditTodo from './components/EditTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDeadline, setEditingDeadline] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/todos');
        setTodos(response.data.sort((a, b) => (a.deadline > b.deadline ? 1 : -1)));
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async ({ title, deadline, category }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/todos', {
        todo: { title, completed: false, deadline, category }
      });
      setTodos([...todos, response.data].sort((a, b) => (a.deadline > b.deadline ? 1 : -1)));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodoCompletion = async (id, completed) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/todos/${id}`, {
        todo: { completed: !completed }
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditingTitle(todo.title);
    setEditingDeadline(todo.deadline);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/todos/${id}`, {
        todo: { title: editingTitle, deadline: editingDeadline }
      });
      const updatedTodos = todos.map((todo) => (todo.id === id ? response.data : todo));
      setTodos(updatedTodos.sort((a, b) => (a.deadline > b.deadline ? 1 : -1)));
      setEditingTodo(null);
      setEditingTitle('');
      setEditingDeadline('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditingTitle('');
    setEditingDeadline('');
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <label>
        Filter by Category:
        <input
          type="text"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          placeholder="Enter category to filter"
        />
      </label>
      {editingTodo && (
        <EditTodo
          editingTitle={editingTitle}
          editingDeadline={editingDeadline}
          setEditingTitle={setEditingTitle}
          setEditingDeadline={setEditingDeadline}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          todoId={editingTodo}
        />
      )}
      <TodoList
        todos={todos}
        filterCategory={filterCategory}
        toggleTodoCompletion={toggleTodoCompletion}
        handleDeleteTodo={handleDeleteTodo}
        startEditing={startEditing}
      />
      <TodoForm handleAddTodo={handleAddTodo} />
      <CalendarView todos={todos} />
    </div>
  );
}

export default App;