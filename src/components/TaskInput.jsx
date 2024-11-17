import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;
