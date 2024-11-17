import React from 'react';

const TaskSearch = ({ handleSearch }) => {
  return (
    <input 
      type="text" 
      placeholder="Search tasks..." 
      onChange={(e) => handleSearch(e.target.value)} 
    />
  );
};

export default TaskSearch;
