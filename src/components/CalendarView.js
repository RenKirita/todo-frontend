// src/components/CalendarView.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

function CalendarView({ todos }) {
  // 日付に対応するTodoを表示するための関数
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      // 日付に一致するTodoを取得
      const todoForDate = todos.filter(todo => todo.deadline === date.toISOString().split('T')[0]);

      return (
        <div>
          {todoForDate.map(todo => (
            <p key={todo.id} style={{ fontSize: 'small', color: 'blue' }}>
              {todo.title}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Todoカレンダー</h2>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default CalendarView;