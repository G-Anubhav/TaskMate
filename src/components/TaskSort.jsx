import React from 'react';

const TaskSort = ({ handleSort }) => {
  return (
    <select onChange={(e) => handleSort(e.target.value)}>
      <option value="default">Sort by</option>
      <option value="priority">Priority</option>
      <option value="completed">Completed</option>
    </select>
  );
};

export default TaskSort;
